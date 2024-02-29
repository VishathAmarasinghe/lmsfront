import React from 'react'
import { lecturer } from '../../assets'
import { Divider } from '@mui/material'

const StudentProfileCard = () => {
  return (
    <div className='flex flex-col md:flex-row w-full bg-[#EBEEFF] p-2 rounded-lg'>
        <div className='w-[30%]'>
            <img src={lecturer} alt='student'/>
        </div>
        <div className='w-full md:w-[100%] ml-2 '>
            <div className='w-full  flex flex-row justify-between'>
                <p className='text-[15px] font-semibold'>Name</p>
                <p className='text-[15px] font-inter font-normal'> Vishath Amarasinghe</p>
            </div>
            <Divider orientation='horizontal'/>
            <div className='w-full  flex flex-row justify-between'>
                <p className='text-[15px] font-semibold'>Name</p>
                <p className='text-[15px] font-inter font-normal'> Vishath Amarasinghe</p>
            </div>
            <Divider orientation='horizontal'/>
            <div className='w-full  flex flex-row justify-between'>
                <p className='text-[15px] font-semibold'>Name</p>
                <p className='text-[15px] font-inter font-normal'> Vishath Amarasinghe</p>
            </div>
            <Divider orientation='horizontal'/>
            <div className='w-full  flex flex-row justify-between'>
                <p className='text-[15px] font-semibold'>Name</p>
                <p className='text-[15px] font-inter font-normal'> Vishath Amarasinghe</p>
            </div>
            
        </div>
    </div>
  )
}

export default StudentProfileCard