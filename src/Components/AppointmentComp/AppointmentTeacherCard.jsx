import { Tag } from 'antd'
import React from 'react'
import { lecturer, teacherSample } from '../../assets'

const AppointmentTeacherCard = ({teacher,clickedTeacher,setClickedTeacher}) => {
    console.log("teacher is ",teacher);

    const handleTeacherclicked=()=>{
        setClickedTeacher(teacher);
    }

  return (
    <Tag onClick={handleTeacherclicked} color='blue' className={`${clickedTeacher?.UserID==teacher?.UserID?"bg-blue-500 text-white":""} hover:bg-blue-500 hover:text-white p-2 m-2 flex flex-row justify-between`}>
        <div className='w-[30%] '>
        
            <img src={teacher.photo==null || teacher.photo==""?teacherSample:`http://localhost:5000/${teacher.photo}`} className='rounded-md'/>
        </div>
        <div className='w-[70%]  flex flex-col justify-center '>
            <p className='text-[15px] ml-2 '>Name:{(teacher.firstName+" "+teacher.lastName).substring(0,14)}</p>
            <p className='text-[13px] ml-2'>Email:{teacher.email}</p>
            <p className='text-[13px] ml-2'>Phone No:{teacher.phoneNo}</p>
        </div>
    </Tag>
  )
}

export default AppointmentTeacherCard