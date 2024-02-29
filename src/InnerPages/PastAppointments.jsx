import React from 'react'
import PastAppointmentCard from '../Components/AppointmentComp/PastAppointmentCard'

const PastAppointments = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center bg-white shadow-2xl rounded-2xl overflow-y-auto  ">
        <h1 className="text-2xl text-center my-2 font-semibold">Past Appointment</h1>
        <PastAppointmentCard/>
        <PastAppointmentCard/>
    </div>
  )
}

export default PastAppointments