import React, { useEffect, useState } from 'react'
import PastAppointmentCard from '../Components/AppointmentComp/PastAppointmentCard'
import { getAppointmentsRelatedToParent } from '../API'
import { Empty } from 'antd';

const PastAppointments = () => {
  const parentID=JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [pastAppointmentArray,setPastAppointmentArray]=useState([]);

  useEffect(()=>{
    fetchParentAppointments();
  },[])


  const fetchParentAppointments=async()=>{
    const appointmentResult=await getAppointmentsRelatedToParent(parentID);
    console.log("past Appointments ",appointmentResult.data);
    setPastAppointmentArray(appointmentResult.data);

  }
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Past Appointments
      </h1>
    </div>

    <div data-aos="fade-right" className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      {
        pastAppointmentArray.length>0?(
        pastAppointmentArray.map((appintment)=>
        <PastAppointmentCard key={appintment.appointmentID} fetchParentAppointments={fetchParentAppointments} appintment={appintment}/>
        )
        ):(
          <Empty className='mt-28' description="No past Appointments"/>
        )
      }
      
    </div>
    </div>
  )
}

export default PastAppointments