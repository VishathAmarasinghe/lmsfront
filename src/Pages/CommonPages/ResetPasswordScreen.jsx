import React, { useEffect, useState } from 'react'
import { logo } from '../../assets'
import { Button, Form, Input, message, notification } from 'antd'
import { stringEmptyValidation } from '../../Utils/Validations';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../API';
import { jwtDecode } from 'jwt-decode';

const ResetPasswordScreen = () => {

    const {token}=useParams();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [passwordVisibility,setPasswordVisibiliy]=useState(false);

    const [passwordData,setPasswordData]=useState({});
    const [errorValidator,setErrorValidator]=useState(null);


    useEffect(()=>{
        if (token) {
            const decodedToken=jwtDecode(token);
            if (decodedToken.exp*1000<new Date().getTime()) {
              notification.error({message:"Time expired!",description:""})
            //   navigate("/login")
            }
          }
    },[])


    const handleInputChange=(e)=>{
        setPasswordData({...passwordData,[e.target.name]:e.target.value,token:token})
        errorValidations(e);

    }

    const errorValidations=(e)=>{
        if (e.target.name=="newPassword") {
            setErrorValidator({...errorValidator,[e.target.name]:stringEmptyValidation(e.target.value)});
        }else if(e.target.name=="confirmPassword"){
            setErrorValidator({...errorValidator,[e.target.name]:stringEmptyValidation(e.target.value)});
        }
    }


    const checkValidationStatusToSubmit=()=>{
        let errorStatus=true;
        for (const key in errorValidator) {
          if (errorValidator[key] !== "") {
            return false;
          }
        }
        const requiredcolumns=["newPassword","confirmPassword"]
        for(const value of requiredcolumns){
          if (passwordData[value]=="" || passwordData[value]==null || passwordData[value]==undefined) {
            message.error("please fill mandatory columns")
            errorStatus=false;
            return errorStatus;

          }
        }
        if (passwordData["newPassword"]!=passwordData["confirmPassword"]) {
            message.error("Passwords cannot different")
            errorStatus=false;
        }
        return errorStatus;
      }


      const handleSubmitPasswords=async()=>{
        setLoading(true);
        try {
            if (checkValidationStatusToSubmit()) {
                console.log("password data is ",passwordData);
                const sendPasswordResult=await resetPassword(passwordData);
                if (sendPasswordResult.status==200) {
                    notification.success({message:"Password Changed Successfully!"})
                    navigate("/login")
                }
            }
        } catch (error) {
            console.log("error ",error);
            message.error("New passwords submission error!")
        }
        setLoading(false);
      }




  return (
    <div className='w-full h-screen border-2 overflow-auto overflow-x-hidden md:overflow-hidden    bg-[#EBEEFF]'>
   
      <div  className='w-full z-50  h-[10%] bg-[#EBEEFF]   flex items-center md:justify-end justify-center'>
            <img src={logo} className='w-44 mx-6' alt='logo'/>
        </div>
        <div className='w-full flex flex-col h-[90%]   justify-center items-center'>
            <div className='bg-white p-6 rounded-lg scalar-card mb-8 shadow-lg w-[40%]'>
            <h1 className='font-medium py-2'>Resert your password here</h1>
            <Form layout='vertical'>
                <Form.Item
                    label="New Password"
                    validateStatus={errorValidator?.newPassword ? "error" : "success"}
                    help={errorValidator?.newPassword || ""}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password 
                    visibilityToggle={{
                        visible: passwordVisibility,
                        onVisibleChange: setPasswordVisibiliy,
                      }}
                    className="bg-[#EBEEFF]" name="newPassword" onChange={handleInputChange} value={passwordData?.newPassword} placeholder="Please enter password" />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    validateStatus={errorValidator?.confirmPassword ? "error" : "success"}
                    help={errorValidator?.confirmPassword || ""}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password
                    
                    visibilityToggle={{
                        visible: passwordVisibility,
                        onVisibleChange: setPasswordVisibiliy,
                      }}
                    className="bg-[#EBEEFF]" name="confirmPassword" onChange={handleInputChange} value={passwordData?.confirmPassword} placeholder="Please re enter password" />
                </Form.Item>
            </Form>

            <Button  loading={loading} onClick={handleSubmitPasswords} className='bg-blue-500 w-full hover:bg-blue-600  rounded-lg text-white font-medium'>
                Reset Password
            </Button>
            </div>
        </div>

    </div>
  )
}

export default ResetPasswordScreen