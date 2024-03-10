import * as API from '../API/index';

export const studentRegister=(formData)=>async(dispatch)=>{
    try {
        const {data}=await API.registerStudent(formData);
        dispatch({
            type:"Register",
            data

        })
    } catch (error) {
        
    }
}