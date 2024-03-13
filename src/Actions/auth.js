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