import { NotificationOutlined,BookOutlined } from '@ant-design/icons'
import React from 'react'


const NoticeCard = () => {
  return (
    <div  className='w-[100%] flex flex-col md:flex-row justify-around  items-center border-2 p-2 bg-white my-2 rounded-lg border-blue-700'>
        <div className='bg-[#1ED925] p-2 w-[90%] md:w-[5%] flex flex-col rounded-md justify-center items-center'>
        <NotificationOutlined className='text-[30px] text-white border-2 border-red-600'/>
        </div>
        <div className='flex flex-col w-[90%] md:w-[80%] border-2 border-gray-600'>
            <h1 className='font-inter font-semibold text-[17px]'>Major Notice</h1>
            <p className='font-inter font-normal text-[14px] text-[#ABABAB]' >Deadline 2nd December</p>
        </div>
        <div className='w-[90%] md:w-[10%] border-2 border-blue-600 flex flex-col justify-center items-center'>
            <h1 className='font-inter font-semibold'>6th Dec 2023</h1>
            <BookOutlined className='text-[20px] text-[#727070]'/>
        </div>
    </div>
  )
}

export default NoticeCard