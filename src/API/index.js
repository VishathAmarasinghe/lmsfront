import axios from "axios";


export const registerStudent=(registrationData)=>axios.post("http://localhost:5000/signup/student",registrationData);
export const signIn=(loginDetails)=>axios.post("http://localhost:5000/signup/signIn",loginDetails);


export const get_pending_confirmed_users=()=>axios.get("http://localhost:5000/userdetails/pendingUsers");
export const get_parent_details_according_to_Student=(studentID)=>axios.get("http://localhost:5000/userdetails/parentstudentinfo?studentID="+studentID);