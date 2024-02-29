import React from 'react'
import { student } from '../../assets'

const InfoCards = () => {
  return (
    <div className='w-full md:w-[30%] bg-white border-2 border-[#5B6BD4] rounded-2xl shadow-2xl'>
        <div className='flex flex-row justify-around items-center p-4'>
            <div className='flex flex-col justify-between items-center'>
                <img src={student} className='w-[50%]' alt=' studentIcon'/>
                <p className='text-[15px] font-inter'>Total Students</p>
            </div>
            <p className='text-3xl font-semibold font-inter'>650+</p>
        </div>
    </div>
  )
}

export default InfoCards