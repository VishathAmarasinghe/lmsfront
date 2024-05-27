import { notification } from 'antd';
import * as API from '../API/index';

export const studentRegister=(formData,navigation,notification)=>async(dispatch)=>{
    try {
        const {data}=await API.registerStudent(formData);
        dispatch({
            type:"Register",
            data

        })
        notification.success(
            {
              message:"Registration Details Save",
              description:`${data.message}`
            }
          )
        navigation("/login")
        
    } catch (error) {
        console.log("error in sending Data ",error);
        notification.error(
            {
              message:"Registration Error",
              description:"Please Contact reception"
            }
          )
    }
}

export const signIn=(loginDetails,notification,navigation,setloading)=>async(dispatch)=>{
    try {
        const {data}=await API.signIn(loginDetails);
        console.log("loggin form ",data);
        dispatch({
            type:"SIGNIN",
            data:data
        })
        navigation("/")
        notification.success(
            {
              message:"Login Success",
              description:`login as ${data?.result?.role}`,
              duration:0.5
            }
          )

    } catch (error) {
        console.log("error in login to the system");
        notification.error(
            {
              message:"Login Error",
              description:"Login Error occured, Please try again!"
            }
          )
          setloading(false);
    }
}



export const logout=(navigation)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LOGOUT"
        })
        navigation("/login")
    } catch (error) {
        console.log("logout error ",error);
    }
}


export const updateLoginUser=(userID)=>async(dispatch)=>{
  try {
    const {data}=await API.getFullUserInformation(userID);
    dispatch({
        type:"CURRENT_USER_UPDATE",
        data

    })
   
    
} catch (error) {
    console.log("error in sending Data ",error);
    notification.error(
        {
          message:"internal data  updation  error!",
          description:"Please logOut and come again."
        }
      )
}
}