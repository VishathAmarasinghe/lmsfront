import { NotificationOutlined,BookOutlined } from '@ant-design/icons'
import React from 'react'


const NoticeCard = ({announcement}) => {
  return (
    <div  className='w-[100%] bg-[#EBEEFF] shadow-md flex flex-col md:flex-row justify-around  items-center border-2 p-2 hover:bg-blue-300  my-3 rounded-lg border-blue-700'>
        <div className='bg-[#1ED925] p-2 w-[90%] md:w-[5%] flex flex-col rounded-md justify-center items-center'>
        <NotificationOutlined className='text-[30px] text-white border-2 border-red-600'/>
        </div>
        <div className='flex flex-col w-[90%] md:w-[70%] border-2 border-gray-600'>
            <h1 className='font-inter font-semibold text-[17px]'>{announcement?.title}</h1>
            <p className='font-inter font-normal text-[14px] ' >{announcement?.description}</p>
            <div>
              <p className='text-[#ABABAB]'>Audiance: {announcement?.audience}  {announcement?.classes.length>0?` - Classes: ${announcement?.classes}`:""}</p>
            </div>
        </div>
        <div className='w-[90%] md:w-[20%] border-2 border-blue-600 flex flex-col justify-center items-center'>
            
            <BookOutlined className='text-[20px] text-[#727070]'/>
            <h1 className='font-inter text-[12px] font-semibold'>Created At {announcement?.createdDate.substring(0,10)}</h1>
        </div>
    </div>
  )
}

export default NoticeCard