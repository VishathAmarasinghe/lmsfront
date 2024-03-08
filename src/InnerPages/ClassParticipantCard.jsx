import React from 'react'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import { lecturer } from '../assets';
import { Avatar } from 'antd';

const ClassParticipantCard = () => {
  return (
    <div className='flex flex-row justify-between bg-[#D0D7FF] p-2 rounded-xl w-full hover:bg-[#838ED8] mb-1 scalar-card'>
        <div className='flex flex-row justify-start items-center border-2 border-red-700 w-[50%] '>
        <Avatar icon={<img src={lecturer}/>}/>
        <h1 className='ml-2 font-medium'>Vishath Amarasinghe</h1>
        </div>
        <div className='flex flex-row justify-center items-center border-2 border-red-700 w-[30%] '>
            <LocalPhoneRoundedIcon className='text-[#9C9C9C] scalar-cardlg'/>
            <p className='text-[] font-inter font-medium '>
                07860706065
            </p>
        </div>
        <div className='flex flex-1 justify-end items-center border-2 border-red-700 w-[20%]'>
            <AccountBoxRoundedIcon className='text-[#9C9C9C] scalar-cardlg hover:text-black'/>
        </div>
    </div>
  )
}

export default ClassParticipantCard