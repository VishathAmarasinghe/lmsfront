import React, { useEffect, useState } from 'react'
import StudentScanOrSearchCard from '../Class/StudentScanOrSearchCard'
import useScanDetection from 'use-scan-detection-react18';
import { validateBarcode } from '../../Utils/Validations';
import { Button, Descriptions, Tag, message, notification } from 'antd';
import { getFullUserInformation, studentCardStatus } from '../../API';
import { scanImage } from '../../assets';
import { ArrowRightOutlined } from '@ant-design/icons';


const StudentCardManufacturingScanner = () => {
    const [barcode, setBarcode] = useState('');
    const [selectedStudentID,setSelectedStudentID]=useState(null);
    const [selectedStudentIDArray,setSelectedStudentIDArray]=useState([])
    const [currentCardStatus,setCurrentCardStatus]=useState(null);
    const [nextCardStaus,setNextCardStatus]=useState(null);
    const [selectedStudentDetails,setSelectedStudentDetails]=useState(null);
    const [loading,setLoading]=useState(false);

  useScanDetection({
    onComplete: setBarcode,
  });




  useEffect(() => {
    if (validateBarcode(barcode) && barcode!="" && barcode!=null) {
      fetchingScannedStudent();
    } else {
      if (barcode?.length !== 0 && barcode!=null) {
        notification.error({
          message: "Invalid Barcode",
          description: "Please check the card and rescan the card"
        });
      }
    }
  }, [barcode]);

  

  const fetchingScannedStudent = () => {
    const extractedUserIDValue = "US" + parseInt(barcode.substring(0, 5));
        setSelectedStudentID(extractedUserIDValue);
        setSelectedStudentIDArray([...selectedStudentIDArray,extractedUserIDValue]);
        getUserCurrentCardStatus(extractedUserIDValue);
   
    
    // setBarcode("");
  };

  const  handleCancelClick=()=>{
    setSelectedStudentID(null);
    setBarcode(null);
    setSelectedStudentDetails(null);
  }



  const getUserCurrentCardStatus=async(userID)=>{
    try {
        const userStatus=await getFullUserInformation(userID);
        console.log('====================================');
        console.log("selected user information ",userStatus);
        setSelectedStudentDetails(userStatus.data);
        const currentStatus=userStatus.data?.additionalInfo?.cardStatus;
        setCurrentCardStatus(currentStatus);
        if (currentStatus=="pending") {
            setNextCardStatus("To Manufacture")
        }else if(currentStatus=="manufacturing"){
            setNextCardStatus("CardReturned")
        }else if (currentStatus=="CardReturned") {
            setNextCardStatus("handOvered")
        }else if (currentStatus=="handOvered") {
            setNextCardStatus("Already HandOvered")
        }
        console.log('====================================');
    } catch (error) {
        console.log("User Card Status fetching error!");
        message.error("Student Card Details  Fetching Error!")
    }
  }



  const handleProceed=async()=>{
    try {
        setLoading(true);
        const studentCardStatusResult=await studentCardStatus([selectedStudentID]);
        console.log("selected Student card changing result ",studentCardStatusResult);
        if (studentCardStatusResult.status==200) {
            message.success("Student Card Updated!")
            handleCancelClick();
        }
        setLoading(false);
    } catch (error) {
        console.log("student card status changing error! ",error);
        message.error("student card status changing error! ")
        setLoading(false);
    }
  }

  const items = [
    {
      key: '1',
      label: 'Current State',
      children: <Tag color='green'>{currentCardStatus}</Tag>,
    },
    {
      key: '2',
      label: 'To',
      children: <ArrowRightOutlined />,
    },
    {
      key: '3',
      label: 'Next State',
      children: <Tag color='blue'>{nextCardStaus}</Tag>,
    },
]


    const  userDetails = [
        {
          key: '1',
          label: 'UserID',
          children: selectedStudentDetails?.UserID,
        },
        {
          key: '2',
          label: 'Name',
          children: selectedStudentDetails?.firstName+" "+selectedStudentDetails?.lastName,
        },
        {
          key: '3',
          label: "Phone No",
          children: selectedStudentDetails?.phoneNo,
        },
]
  return (
    
    <div className=' w-full h-full flex  flex-col  justify-center items-center'>
        {
             selectedStudentID?<div className='w-full flex flex-col items-center'>
           <div className='w-[60%] flex flex-col'>
                <Descriptions labelStyle={{fontWeight:"bold"}}  className='mb-2' bordered layout='vertical' items={userDetails}/>
                <Descriptions labelStyle={{fontWeight:"bold"}}  bordered layout='vertical' items={items}/>

            </div>
            <div className='w-full flex flex-row items-end  justify-end '>
                {currentCardStatus!="handOvered"?<Button onClick={handleProceed}  className=' bg-blue-500 hover:bg-blue-600 rounded-md mr-2 text-white'>Proceed</Button>:<></>}
                <Button onClick={handleCancelClick} className=' bg-gray-300 hover:bg-gray-500 rounded-md '>Cancel</Button>
            </div>
            </div>
            :
            <div>
                <img src={scanImage} className='w-[50%]'/>
            </div>
        }
    </div>
  )
}

export default StudentCardManufacturingScanner