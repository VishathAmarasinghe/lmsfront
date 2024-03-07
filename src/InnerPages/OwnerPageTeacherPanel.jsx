import React from 'react'
import TeacherTable from '../Components/TeacherComp/TeacherTable'

const OwnerPageTeacherPanel = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center border-2 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] border-2 border-red-500">
        <TeacherTable/>
    </div>
    </div>
  )
}

export default OwnerPageTeacherPanel