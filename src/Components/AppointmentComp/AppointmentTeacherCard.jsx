import { Tag } from 'antd'
import React from 'react'
import { lecturer } from '../../assets'

const AppointmentTeacherCard = () => {
  return (
    <Tag color='blue' className='hover:bg-blue-500 hover:text-white p-2 m-2 flex flex-row justify-between'>
        <div className='w-[30%]'>
            <img src={lecturer} className='rounded-md'/>
        </div>
        <div className='w-[60%] '>
            <p className='text-[15px] '>Name</p>
            <p className='text-[13px]'>Email:</p>
            <p className='text-[13px]'>Phone No:</p>
        </div>
    </Tag>
  )
}

export default AppointmentTeacherCard