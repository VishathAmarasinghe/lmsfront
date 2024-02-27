import React from "react";
import { IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";

const RegistrationFormOne = () => {
  return (
    <div className="w-full ">
      <div className="w-full flex md:flex-row flex-col justify-between ">
      <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">First Name</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 ml-2 mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">Last Name</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
      </div>
      <div className="flex flex-col mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">Address</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        <div className="flex flex-col mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">Email</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        <div className="flex flex-col mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">School</label>
          <TextField inputProps={
            {style:{
                height:"2px"
            }}
          } error className="bg-[#EBEEFF]" />
          <p className="text-red-700 text-[12px]">Error text</p>
        </div>
        
        
        

    </div>
  );
};

export default RegistrationFormOne;
