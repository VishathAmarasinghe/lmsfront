import React, { useEffect, useState } from 'react'
import { lecturer } from '../../assets'
import Barcode from 'react-barcode'


const StudentCard = ({studentData}) => {
    const [barcodeValue,setBarcodeValue]=useState(Date.now());
    useEffect(()=>{
        setBarcodeValue(studentData.UserID+studentData.studentID+"D"+Date.now())
    },[])
  return (
    <div className='w-[390px]  flex flex-col mb-2 border-2 border-black'>
        <div className='w-full  flex flex-col justify-center items-center p-1 bg-[#5B6BD4]'>
            <h1 className='font-inter font-semibold text-[15px] text-white'>Savitha Education Institute</h1>
            <p className='text-white font-inter text-[10px] font-normal'>Tel:0112894233,0713234566</p>
        </div>
        <div className='flex flex-row h-full items-center justify-center'>
            <div className='flex flex-col w-[35%] h-full justify-center items-center'>
                <img src={lecturer} alt='student' className=''/>
            </div>
            <div className='w-[60%] '>
                <div className='flex flex-row w-full justify-around mt-2'>
                    <p className='font-inter font-semibold'>Student No</p>
                    <p className='font-inter'>{studentData.UserID+"/"+studentData.studentID}</p>
                </div>
                <div className='flex flex-row w-full justify-around mt-2'>
                    <p className='font-inter font-semibold'>Student Name</p>
                    <p className='font-inter'>{studentData.firstName}</p>
                </div>
                <div className='w-full  flex flex-col justify-center items-center'>
                    <Barcode height={25} width={0.8} fontSize={12} value={barcodeValue}/>
                </div>
               
            </div>
        </div>
        <div className='h-2 w-full bg-[#5B6BD4]'>

</div>
    </div>
  )
}

export default StudentCard