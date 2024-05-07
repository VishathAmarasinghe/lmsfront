import React, { useEffect, useState } from 'react'
import SMSTemplateTable from './SMSTemplateTable'
import LoadingInnerPage from '../../InnerPages/LoadingInnerPage';
import { message } from 'antd';
import { getAllSMSTemplates } from '../../API';
import dayjs from 'dayjs';

const SMSTemplate = () => {
    const [smsTempData,setSMSTempData]=useState(null);
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        fetchSMStemplates();
    },[])

    const fetchSMStemplates=async()=>{
        try {
            setLoading(true);
            const smsTemplates =await getAllSMSTemplates();
            const SMStempArray=smsTemplates?.data?.map((sms)=>({
                ...sms,
                key:sms?.SMStempID,
                updateDate:dayjs(sms?.updateDate).format("YYYY-MM-DD")
            }))
            setSMSTempData(SMStempArray);
            setLoading(false);
        } catch (error) {
            message.error("sms Templats Loading Error!")
            console.log("error ",error);
        }
    }
  return (
   <div>
    {
        loading?<LoadingInnerPage/>:<SMSTemplateTable SMSTempData={smsTempData}/>
    }
   </div>
  )
}

export default SMSTemplate