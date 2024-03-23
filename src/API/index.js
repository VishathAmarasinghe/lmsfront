import axios from "axios";


export const registerStudent=(registrationData)=>axios.post("http://localhost:5050/auth/signUp",registrationData);
export const signIn=(loginDetails)=>axios.post("http://localhost:5050/auth/signIn",loginDetails);


export const get_pending_confirmed_users=()=>axios.get("http://localhost:5050/user/pendinguser");
export const get_parent_details_according_to_Student=(studentID)=>axios.get("http://localhost:5050/user/parentStudentInfo?studentID="+studentID);

export const updateParentStudentData=(updateData)=>axios.patch("http://localhost:5050/user/updateuser",updateData);

export const registrationPayment=(paymentdata)=>axios.post("http://localhost:5050/payment/registration",paymentdata);


export const getUserPhoto=(photoId)=>axios.get(`http://localhost:5000/${photoId}`);