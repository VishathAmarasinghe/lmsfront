import axios from "axios";


export const registerStudent=(registrationData)=>axios.post("http://localhost:5000/signup/student",registrationData);
export const signIn=(loginDetails)=>axios.post("http://localhost:5000/signup/signIn",loginDetails);