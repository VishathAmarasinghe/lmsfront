import React, { useEffect } from 'react'
import { ownerDashboardImg } from '../assets'
import { message } from 'antd';
import { getLastThirtyDaysclassPayment } from '../API';

const OwnerDashboard = () => {
  const activeUser=JSON.parse(localStorage.getItem("profile"))?.result;
  console.log("active user is ",activeUser);

  useEffect(()=>{
    fetchLastDaysClassFees();
  },[])


  const fetchLastDaysClassFees=async()=>{
    try {
      const classFeesResult=await getLastThirtyDaysclassPayment();
      console.log("class fee result ",classFeesResult);
    } catch (error) {
      console.log("error ",error);
      message.error("class fees payment fetching error!")
    }
  }
  
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Dashboard
        </h1>
      </div>

      <div data-aos="fade-right" className="w-[95%]  h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 ">
        <div className="w-full h-[100%] flex flex-col items-center  rounded-2xl">
          <div className='w-full bg-[#4551A1]  flex flex-row p-2 rounded-xl scalar-card'>
            <div className='w-[70%]  flex flex-col justify-center mb-3 ml-5'>
              <h1 className='text-[20px] font-medium text-white'>Hello, {activeUser?.firstName}</h1>
              <p className='text-[15px] text-white'>Welcome back to moodle</p>
            </div>
            <div className='w-[25%] flex flex-col items-end'>
              <img className='w-[150px]' src={ownerDashboardImg}/>
            </div>
          </div>
          <div className='border-2 border-red-600 w-full mt-2'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard