import { Announcement } from "@mui/icons-material";
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

export const addStudentsToClass=(studentAddingData)=>axios.post(`http://localhost:5050/classService/addToClasses`,studentAddingData);

export const checkStudentClassFeePayment=(studentpaymentData)=>axios.post(`http://localhost:5050/payment/classfeeExisitance`,studentpaymentData);


export const addClassFeePayment=(paymentData)=>axios.post(`http://localhost:5050/payment/addClassFee`,paymentData);

export const attendanceVerfiicationOfStudentsInclass=(classID)=>axios.get(`http://localhost:5050/classService/attendenceVerification?classID=${classID}`);

export const markAttendance=(attendanceData)=>axios.post("http://localhost:5050/classService/markAttendance",attendanceData);


export const getAttendanceDataByDateAndClass=(classID,date)=>axios.get(`http://localhost:5050/classService/attendanceDateByClassDate?classID=${classID}&date=${date}`)

export const getAllchildsOfParent=(parentID)=>axios.get(`http://localhost:5050/user/childrenOfParent?parentID=${parentID}`)


export const getAllTeachers=()=>axios.get(`http://localhost:5050/user/activatedTeachers`);

export const createAppointment=(appointmentData)=>axios.post("http://localhost:5050/user/appointment",appointmentData)

export const getAppointmentsRelatedToParent=(parentID)=>axios.get(`http://localhost:5050/user/parentAppointment?parentID=${parentID}`)

export const deleteAppoinment=(appointmentID)=>axios.delete("http://localhost:5050/user/appointment",{data:{ appointmentID}});

export const getCreatedAppointmentsRelatedToTeacher=(teacherID)=>axios.get(`http://localhost:5050/user/CreatedTeacherAppointment?teacherID=${teacherID}`)


export const getClassesWithTeacherAndStudent=(teacherID,studentID)=>axios.get(`http://localhost:5050/classService/classesWithTeacherAndStudent?teacherID=${teacherID}&studentID=${studentID}`);


export const updateAppointmentTOApporived=(appoinmentConfirmData)=>axios.patch("http://localhost:5050/classService/appointmentUpdate",appoinmentConfirmData);



export const createNewAnnouncement=(announcementData)=>axios.post("http://localhost:5050/notification/announcement",announcementData);


export const getAnnouncementsCreatedByTeacher=(teacherID)=>axios.get(`http://localhost:5050/notification/teacherAnnouncement?teacherID=${teacherID}`);

export const deleteAnnouncement=(announcementID)=>axios.delete("http://localhost:5050/notification/announcement",{data:{announcementID}})


export const getClassesByTeacherCalender=(teacherID)=>axios.get(`http://localhost:5050/classService/teacherClassesCalender?teacherID=${teacherID}`);

export const getClassesByStudentCalender=(studentID)=>axios.get(`http://localhost:5050/classService/studentClassesCalender?studentID=${studentID}`);

export const getAllClassesForCalender=()=>axios.get(`http://localhost:5050/classService/allClassesCalender`);

export const getFullUserInformation=(userID)=>axios.get(`http://localhost:5050/user/fullUserDetails?userID=${userID}`);

export const updateFullUserInformation=(userDetails)=>axios.post("http://localhost:5050/user/updateFullUserDetails",userDetails);


export const getAllTeachersInfo=()=>axios.get("http://localhost:5050/user/allteachers");

export const createNewUser=(userDetails)=>axios.post("http://localhost:5050/user/createUser",userDetails);

export const getAllStaffInfo=()=>axios.get("http://localhost:5050/user/allStaff");


export const getAllClassesFullInfo=()=>axios.get(`http://localhost:5050/classService/fullclassInfo`);


export const getStudentAndTeacherDetails=(allPeople)=>axios.post("http://localhost:5050/user/teacherAndStudentData",allPeople);

export const getStudentListAsExcel=(studentList)=>axios.post("http://localhost:5050/user/generateStudentExcel",studentList,{responseType:"blob"})

export const getResultHeadingForClass=(classID)=>axios.get(`http://localhost:5050/classService/resultForClass?classID=${classID}`);


export const uploadResultWithExcel=(formData)=>axios.post("http://localhost:5050/classService/uploadResultWith", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getChartData=(chartData)=>axios.post("http://localhost:5050/classService/charts",chartData);

export const getResultForSpecificStudent=(userID)=>axios.get(`http://localhost:5050/classService/resultForUserID?userID=${userID}`);

export const getParentAnnouncements=(parentID)=>axios.get(`http://localhost:5050/notification/parentAnnouncements?parentID=${parentID}`)


export const getStudentAnnouncements=(studentID)=>axios.get(`http://localhost:5050/notification/studentAnnouncements?studentID=${studentID}`)

export const activateStudentAndParent=(studentData)=>axios.post("http://localhost:5050/user/studentAndParentActivate",studentData)


export const getAllRegistrationPayments=()=>axios.get("http://localhost:5050/payment/registrationPayments")

export const getAllClassPayments=()=>axios.get("http://localhost:5050/payment/classFeePaymentData")


export const getBulkUserData=(userArray)=>axios.post("http://localhost:5050/user/bulkUserData",userArray);

export const getOverallAttendanceVisualization=(startDate,endDate)=>axios.get(`http://localhost:5050/classService/attendanceOverview?startDate=${startDate}&endDate=${endDate}`)


export const getAllStudents=()=>axios.get("http://localhost:5050/user/allStudents")


export const getNotHandoveredCards=()=>axios.get("http://localhost:5050/user/notReleasedCards")


export const getHandoveredCards=()=>axios.get("http://localhost:5050/user/ReleasedCards")

export const createNewHall=(hallData)=>axios.post("http://localhost:5050/classService/newHall",hallData);


export const updateHallDetails=(hallData)=>axios.post("http://localhost:5050/classService/updateHall",hallData);


export const getTotalFeePaymentStatistics=(month,year)=>axios.get(`http://localhost:5050/payment/totalClassFessStatistics?month=${month}&year=${year}`);

export const getTotalFeePaymentStatisticsByTeacher=(month,year)=>axios.get(`http://localhost:5050/payment/totalClassFessStatisticsByTeacher?month=${month}&year=${year}`);


export const getTeacherPaymentReport=(teacherPaymentData)=>axios.post("http://localhost:5050/payment/teacherPaymentReport",teacherPaymentData,{ responseType: 'arraybuffer' } );



export const getProgressReport=(selectedReportDate)=>axios.get(`http://localhost:5050/user/progressReport?reportDate=${selectedReportDate}`);

export const getLastThirtyDaysclassPayment=()=>axios.get(`http://localhost:5050/payment/last30DaysClassFees`);

export const getLastSevenDaysAttendance=()=>axios.get("http://localhost:5050/classService/last7DaysAttendance")

export const activateDeactivateUser=(userData)=>axios.post("http://localhost:5050/user/activateDeactivateUser",userData)

export const activateDeactivateHall=(hallData)=>axios.post("http://localhost:5050/classService/activateDeactivateHall",hallData)


export const getAllRegistrationfees=()=>axios.get(`http://localhost:5050/payment/allRegFees`);

export const getLatestRegistrationFee=()=>axios.get(`http://localhost:5050/payment/latestRegFee`);


export const createNewRegistrationFee=(regFeeData)=>axios.post(`http://localhost:5050/payment/newRegFee`,regFeeData);

export const getProgressReportDownload=(date)=>axios.get(`http://localhost:5050/classService/progressReport?date=${date}`,{ responseType: 'arraybuffer' })