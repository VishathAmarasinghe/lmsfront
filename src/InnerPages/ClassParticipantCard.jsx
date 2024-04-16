import React from 'react'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import { lecturer } from '../assets';
import { Avatar } from 'antd';

const ClassParticipantCard = ({userData}) => {
  return (
    <div className='flex flex-row justify-between bg-[#D0D7FF] p-2 rounded-xl w-full hover:bg-[#838ED8] mb-1 scalar-card'>
        <div className='flex flex-row justify-start items-center border-2 border-red-700 w-[50%] '>
        <Avatar
          className="scalar-cardlg"
            style={{ backgroundColor: "#87d068" }}
            icon={
              userData.photo && userData.photo!=null && userData.photo !== "" ? (
                <img src={`http://localhost:5000/${userData.photo}`} />
              ) : (
                userData?.firstName?.substring(0, 1)
              )
            }
          />
        <h1 className='ml-2 font-medium'>{userData?.firstName+" "+userData?.lastName}</h1>
        </div>
        <div className='flex flex-row justify-center items-center border-2 border-red-700 w-[30%] '>
            <LocalPhoneRoundedIcon className='text-[#9C9C9C] scalar-cardlg'/>
            <p className='text-[] font-inter font-medium '>
            {userData?.email+"     "+userData?.phoneNo}
            </p>
        </div>
        <div className='flex flex-1 justify-end items-center border-2 border-red-700 w-[20%]'>
            <AccountBoxRoundedIcon className='text-[#9C9C9C] scalar-cardlg hover:text-black'/>
        </div>
    </div>
  )
}

export default ClassParticipantCard