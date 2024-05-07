import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllRegistrationfees } from '../../API';
import RegistrationFeeTable from './RegistrationFeeTable';
import { Key } from '@mui/icons-material';
import dayjs from 'dayjs';
import RegFeeAddingModel from './RegFeeAddingModel';

const RegistrationConfigPage = () => {
    const [openFeeAddingModel, setOpenFeeAddingModel] = useState(false);
    const [regFees,setRegFees]=useState([]);

    useEffect(()=>{
        fetchRegisrationFees();
    },[])


    const handleOpenRegFeeModel=()=>{
        setOpenFeeAddingModel(true);
    }


    const fetchRegisrationFees=async()=>{
        try {
            const allRegistrationFeeResult=await getAllRegistrationfees();
            const regFeesData=allRegistrationFeeResult?.data?.map((regfeeinfo)=>({
                ...regfeeinfo,
                Key:regfeeinfo?.registrationFeeID,
                updateDate:dayjs(regfeeinfo?.updateDate).format("YYYY-MM-DD")
            }))
            setRegFees(regFeesData);
        } catch (error) {
            console.log("registration fees getting error! ",error);
            message.error("Registration fees getting error!")
        }
    }



  return (
    <div className='w-full'>
        
        <div className='w-full mt-3'>
            <button onClick={handleOpenRegFeeModel} className='bg-blue-500 text-white font-medium p-2 rounded-md'>+ Add New Registration Fee</button>
        </div>
        <RegistrationFeeTable feeData={regFees}/>
        <RegFeeAddingModel fetchRegisrationFees={fetchRegisrationFees} openFeeAddingModel={openFeeAddingModel} setOpenFeeAddingModel={setOpenFeeAddingModel}/>

    </div>
  )
}

export default RegistrationConfigPage