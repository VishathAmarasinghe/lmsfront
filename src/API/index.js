import axios from "axios";


export const registerStudent=(registrationData)=>axios.post("http://localhost:5050/auth/signUp",registrationData);
export const signIn=(loginDetails)=>axios.post("http://localhost:5050/auth/signIn",loginDetails);


export const get_pending_confirmed_users=()=>axios.get("http://localhost:5050/user/pendinguser");
export const get_parent_details_according_to_Student=(studentID)=>axios.get("http://localhost:5050/user/parentStudentInfo?studentID="+studentID);

export const updateParentStudentData=(updateData)=>axios.patch("http://localhost:5050/user/updateuser",updateData);

export const registrationPayment=(paymentdata)=>axios.post("http://localhost:5050/payment/registration",paymentdata);


export const getUserPhoto=(photoId)=>axios.get(`http://localhost:5000/${photoId}`);

export const getAllsubjects=()=>axios.get("http://localhost:5050/classService/subjects");

export const getAllGrades=()=>axios.get("http://localhost:5050/classService/grades");

export const getAllHalls=()=>axios.get("http://localhost:5050/classService/halls");


export const getclasswithHalls=(day,hall)=>axios.get(`http://localhost:5050/classService/classwithhall?day=${day}&hall=${hall}`);

export const newclassCreating=(classData)=>axios.post("http://localhost:5050/classService/newclass",classData);

export const getClassesByTeacher=(teacherID)=>axios.get(`http://localhost:5050/classService/classwithteacher?teacherID=${teacherID}`);

export const newAccordian=(accordianData)=>axios.post("http://localhost:5050/classService/accordian",accordianData);

export const getAccordiansByClass=(classID)=>axios.get(`http://localhost:5050/classService/accordian?classID=${classID}`);


export const getSpecificClass=(classID)=>axios.get(`http://localhost:5050/classService/class?classID=${classID}`);

export const uploadNotes=(formData)=>axios.post("http://localhost:5050/classService/noteUpload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  export const deleteNotewithMaterial=(noteData)=>axios.delete("http://localhost:5050/classService/note",{data:noteData});



  export const getnotes=(noteurl)=>axios.get(`http://localhost:5020/fileUpload?filename=${noteurl}`,{
    responseType:"blob"
  });






  
export const uploadSubmissionPanel=(formData)=>axios.post("http://localhost:5050/classService/submission", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


export const deleteSubmissionPanel=(panelData)=>axios.delete("http://localhost:5050/classService/submission",{data:panelData});


export const submitSubmissions=(formData)=>axios.post("http://localhost:5050/classService/submit", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getSubmittedAssignment=(panelID,studentID)=>axios.get(`http://localhost:5050/classService/submit`,{
  params:{
    panelID:panelID,
    studentID:studentID
  }
});


export const deleteSubmissionAssignment=(assignmentData)=>axios.delete("http://localhost:5050/classService/submit",{data:assignmentData});

export const getActivatedStudents=()=>axios.get("http://localhost:5050/user/activeStudents");

export const getClassesForSelectedStudent=(studentID)=>axios.get(`http://localhost:5050/classService/classforstudent?studentID=${studentID}`)

export const getClassesForNotSelectedStudent=(studentID)=>axios.get(`http://localhost:5050/classService/classforNotStudents?studentID=${studentID}`)