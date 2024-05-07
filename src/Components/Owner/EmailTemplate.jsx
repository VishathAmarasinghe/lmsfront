import React, { useEffect, useState } from 'react'
import SMSTemplateTable from './SMSTemplateTable'
import LoadingInnerPage from '../../InnerPages/LoadingInnerPage';
import { message } from 'antd';
import { getAllEmailTemplates, getAllSMSTemplates } from '../../API';
import dayjs from 'dayjs';
import EmailTemplateTable from './EmailTemplateTable';

const EmailTemplate = () => {
    const [emailTempData,setEmailTempData]=useState(null);
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        fetchEmailTemplate();
    },[])

    const fetchEmailTemplate=async()=>{
        try {
            setLoading(true);
            const emailTemplates =await getAllEmailTemplates();
            const SMStempArray=emailTemplates?.data?.map((sms)=>({
                ...sms,
                key:sms?.SMStempID,
                updateDate:dayjs(sms?.updateDate).format("YYYY-MM-DD")
            }))
            setEmailTempData(SMStempArray);
            setLoading(false);
        } catch (error) {
            message.error("Email Templats Loading Error!")
            console.log("error ",error);
        }
    }
  return (
   <div>
    {
        loading?<LoadingInnerPage/>:<EmailTemplateTable emailTempData={emailTempData}/>
    }
   </div>
  )
}

export default EmailTemplate