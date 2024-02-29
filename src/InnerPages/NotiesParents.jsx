import React from 'react'
import NoticeCard from '../Components/NoticeComp/NoticeCard'

const NotiesParents = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center bg-white shadow-2xl rounded-2xl overflow-y-auto  ">
        <h1 className="text-2xl text-center my-2 font-semibold">Notices</h1>
        <NoticeCard/>
        <NoticeCard/>
    </div>
  )
}

export default NotiesParents