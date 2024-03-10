import axios from "axios";


export const registerStudent=(registrationData)=>axios.post("http://localhost:5000/signup/student",registrationData);