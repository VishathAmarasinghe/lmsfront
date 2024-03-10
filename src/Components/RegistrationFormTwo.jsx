import React from 'react'
import { IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import ProfilePicUploading from './TeacherComp/ProfilePicUploading';



const RegistrationFormTwo = () => {
  return (
    <div className="w-full  ">
      <div className="flex flex-col mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">Student Profile Picture</label>
          <ProfilePicUploading/>
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        <div className="w-full flex md:flex-row flex-col justify-between ">
      <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">Gardient Name</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 ml-2 mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">NIC No</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between ">
      <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">Gardient Email</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 ml-2 mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">Gradient Contact No</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
      </div>
      <div className="flex flex-col mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">Occupation</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        
        
    </div>
  )
}

export default RegistrationFormTwo