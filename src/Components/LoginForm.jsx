import { IconButton, InputAdornment, TextField,Checkbox } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import React, { useEffect, useState } from "react";
import {  RememberMe, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { signIn } from "../Actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";
import { loginValidation } from "../Utils/Validations";
import { getUserPhoto } from "../API";
import ForgetPasswordEmailForm from "./ForgetPasswordEmailForm";

export const LoginForm = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [openForgotPasswordModel,setPasswordModelOpen]=useState(false);
  const [ValidationErrors,setValidationErrors]=useState(
    {
      userNameValidation:"",
      passwordValidation:""
    }
  );
    const labelcheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [LoginDetails,setLoginDetails]=useState({
      userName_Email:"",
      password:""
  });

  const handleOpenForgotPasswordModel=()=>{
    setPasswordModelOpen(true);
  }



  const ondetailsChangin=(e)=>{
    setLoginDetails({...LoginDetails,[e.target.name]:e.target.value});
  }

    const [showPassword, setShowPassword]=useState(false);
    const [loading,setloading]=useState(false);


    const handleLogin=()=>{
        setloading(true);
        console.log("login Details ",LoginDetails);
        const validationStatus=loginValidation(LoginDetails,setValidationErrors);
        if (validationStatus) {
          message.error("Validation Error. Please enter your details")
          setloading(false);
        }else{
          dispatch(signIn(LoginDetails,notification,navigate,setloading))
        }
        
        
        
    }
  return (
    <div className="bg-white shadow-2xl w-full md:w-[70%] m-5 p-8 rounded-2xl">
      <ForgetPasswordEmailForm openModel={openForgotPasswordModel} setOpenModel={setPasswordModelOpen}/>
        <h1 className="text-2xl font-inter font-extrabold text-center my-1 text-[#5B6BD4]">Login</h1>
        <h2 className="text-xl font-inter font-medium text-center my-1">Welcome</h2>
      <div className="flex flex-col mb-3">
        <label className="font-inter font-medium">User Name</label>
        <TextField
        name="userName_Email"
        value={LoginDetails.userName_Email}
        onChange={(e)=>ondetailsChangin(e)}
        // error
        
        className="bg-[#EBEEFF]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon  sx={{color:"#5B6BD4"}} className="mr-2" />
              </InputAdornment>
            ),
          }}
        />
        {/* <p className="text-red-700">Error text</p> */}
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-inter font-medium">Password</label>
        <TextField
        name="password"
        value={LoginDetails.password}
        onChange={(e)=>ondetailsChangin(e)}
        type={showPassword?"text":"password"}
        className="bg-[#EBEEFF]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockPersonRoundedIcon sx={{color:"#5B6BD4"}}  className="mr-2"/>
              </InputAdornment>
            ),
            endAdornment:(
                <InputAdornment position="end">
                    <IconButton 
                    onClick={()=>setShowPassword((pre)=>!pre)}
                    >
                        {
                            showPassword?<VisibilityOff/>:<Visibility/>
                        }
                    </IconButton>
                </InputAdornment>
            )
          }}
          
          
        />
        {/* <p className="text-red-700">Error text</p> */}
      </div>
      <div className="w-full flex flex-row justify-between items-center my-3">
          <div className="flex flex-row  items-center">
            <Checkbox  {...labelcheckbox} defaultChecked/>
            <p className="cursor-pointer">Remember Me</p>
            
          </div>
          <div>
            <p onClick={handleOpenForgotPasswordModel} className="cursor-pointer">Forgot Password</p>
          </div>
      </div>
      
      <LoadingButton variant="contained" sx={{backgroundColor:"#5B6BD4",marginBottom:"4px",fontWeight:600}} className="w-full " loading={loading} onClick={handleLogin}>Login</LoadingButton>
    </div>
  );
};
