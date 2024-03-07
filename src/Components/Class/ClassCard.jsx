import React from 'react';
import classCardImage from '../../assets/classCard.jpg';
import classOwnerAvatar from '../../assets/lecturer.jpg';
import { Avatar } from 'antd';
import { Divider } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';



const ClassCard = () => {
  return (
    <div className=' w-full md:w-[95%] border-2 border-black shadow-lg hover:shadow-2xl rounded-xl relative scalar-card'>
        <div className='w-full border-2 border-green-600 rounded-xl rounded-bl-none rounded-br-none'>
            <img src={classCardImage} className='bg-cover w-full h-[150px] rounded-xl rounded-bl-none rounded-br-none' />
        </div>
        <div className='w-full border-2 bg-white border-red-600'>
            <p className='ml-2 text-[20px] font-semibold font-inter mt-1'>Grade 9 Mathematics</p>
            <div className='flex flex-row justify-start items-center ml-2'>
                <Avatar icon={<img src={classOwnerAvatar}/>}/>
                <p className='text-[#ABABAB] my-2 ml-2'>Tutor: <span className='font-semibold'>P.K Rajapajsha</span></p>
            </div>

        </div>
        <Divider orientation='horizontal'/>
        <div className='w-full border-2 border-purple-700 bg-white flex flex-row'>
            <div className=' w-[50%] flex flex-row justify-center items-center p-2 hover:bg-slate-300'>
                <StarBorderRoundedIcon className='text-[#ABABAB]'/>
                <p className='text-[15px] text-[#ABABAB]'>Grade 9</p>
            </div>
            <Divider orientation='horizontal'/>
            <div className='w-[50%] flex flex-row justify-center items-center hover:bg-slate-300 border-l-2 border-gray-400 p-2'>
                <CalendarMonthRoundedIcon className='text-[#ABABAB]'/>
                <p className='text-[15px] text-[#ABABAB]'>Sunday 10A.M</p>
            </div>

        </div>
        <div className='w-full border-2 border-yellow-400 flex flex-col justify-center items-center'>
            <button className='w-full p-2 rounded-md bg-white text-blu hover:bg-blue-400'>
                View
            </button>
        </div>
    </div>
  )
}

export default ClassCard