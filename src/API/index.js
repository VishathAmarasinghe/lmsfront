import { Announcement } from "@mui/icons-material";
import axios from "axios";


const API=axios.create({
  baseURL:"http://localhost:5050"
})


API.interceptors.request.use((req)=>{
  if (localStorage.getItem("profile")) {
    req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})



export const registerStudent=(registrationData)=>API.post("/auth/signUp",registrationData);
export const signIn=(loginDetails)=>API.post("/auth/signIn",loginDetails);


export const get_pending_confirmed_users=()=>API.get("/user/pendinguser");
export const get_parent_details_according_to_Student=(studentID)=>API.get("/user/parentStudentInfo?studentID="+studentID);

export const updateParentStudentData=(updateData)=>API.patch("/user/updateuser",updateData);

export const registrationPayment=(paymentdata)=>API.post("/payment/registration",paymentdata);


export const getUserPhoto=(photoId)=>API.get(`http://localhost:5000/${photoId}`);

export const getAllsubjects=()=>API.get("/classService/subjects");

export const getAllGrades=()=>API.get("/classService/grades");

export const getAllHalls=()=>API.get("/classService/halls");


export const getActivatedAllHalls=()=>API.get("/classService/activatedHalls");

export const updateClass=(classData)=>API.patch("/classService/updateClass",classData);


export const getclasswithHalls=(day,hall)=>API.get(`/classService/classwithhall?day=${day}&hall=${hall}`);

export const newclassCreating=(classData)=>API.post("/classService/newclass",classData);

export const getClassesByTeacher=(teacherID)=>API.get(`/classService/classwithteacher?teacherID=${teacherID}`);

export const newAccordian=(accordianData)=>API.post("/classService/accordian",accordianData);


export const updateAccordian=(accordianData)=>API.patch("/classService/accordian",accordianData);


export const getAccordiansByClass=(classID)=>API.get(`/classService/accordian?classID=${classID}`);


export const getSpecificClass=(classID)=>API.get(`/classService/class?classID=${classID}`);

export const uploadNotes=(formData)=>API.post("/classService/noteUpload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  export const deleteNotewithMaterial=(noteData)=>API.delete("/classService/note",{data:noteData});



  export const getnotes=(noteurl)=>API.get(`http://localhost:5020/fileUpload?filename=${noteurl}`,{
    responseType:"blob"
  });






  
export const uploadSubmissionPanel=(formData)=>API.post("/classService/submission", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});



  
export const UpdateUploadSubmissionPanel=(formData)=>API.post("/classService/submissionPanelUpdate", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});




export const deleteSubmissionPanel=(panelData)=>API.delete("/classService/submission",{data:panelData});


export const submitSubmissions=(formData)=>API.post("/classService/submit", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getSubmittedAssignment=(panelID,studentID)=>API.get(`/classService/submit`,{
  params:{
    panelID:panelID,
    studentID:studentID
  }
});


export const deleteSubmissionAssignment=(assignmentData)=>API.delete("/classService/submit",{data:assignmentData});

export const getActivatedStudents=()=>API.get("/user/activeStudents");

export const getClassesForSelectedStudent=(studentID)=>API.get(`/classService/classforstudent?studentID=${studentID}`)

export const getClassesForNotSelectedStudent=(studentID)=>API.get(`/classService/classforNotStudents?studentID=${studentID}`)

export const addStudentsToClass=(studentAddingData)=>API.post(`/classService/addToClasses`,studentAddingData);

export const checkStudentClassFeePayment=(studentpaymentData)=>API.post(`/payment/classfeeExisitance`,studentpaymentData);


export const addClassFeePayment=(paymentData)=>API.post(`/payment/addClassFee`,paymentData);

export const attendanceVerfiicationOfStudentsInclass=(classID)=>API.get(`/classService/attendenceVerification?classID=${classID}`);

export const markAttendance=(attendanceData)=>API.post("/classService/markAttendance",attendanceData);


export const getAttendanceDataByDateAndClass=(classID,date)=>API.get(`/classService/attendanceDateByClassDate?classID=${classID}&date=${date}`)

export const getAllchildsOfParent=(parentID)=>API.get(`/user/childrenOfParent?parentID=${parentID}`)


export const getAllTeachers=()=>API.get(`/user/activatedTeachers`);

export const createAppointment=(appointmentData)=>API.post("/user/appointment",appointmentData)

export const getAppointmentsRelatedToParent=(parentID)=>API.get(`/user/parentAppointment?parentID=${parentID}`)

export const deleteAppoinment=(appointmentID)=>API.delete("/user/appointment",{data:{ appointmentID}});

export const getCreatedAppointmentsRelatedToTeacher=(teacherID)=>API.get(`/user/CreatedTeacherAppointment?teacherID=${teacherID}`)


export const getClassesWithTeacherAndStudent=(teacherID,studentID)=>API.get(`/classService/classesWithTeacherAndStudent?teacherID=${teacherID}&studentID=${studentID}`);


export const updateAppointmentTOApporived=(appoinmentConfirmData)=>API.patch("/classService/appointmentUpdate",appoinmentConfirmData);



export const createNewAnnouncement=(announcementData)=>API.post("/notification/announcement",announcementData);


export const getAnnouncementsCreatedByTeacher=(teacherID)=>API.get(`/notification/teacherAnnouncement?teacherID=${teacherID}`);

export const getAnnoucementSpecifcToStudentsAndClass=(classID)=>API.get(`/notification/annoucementsSpecifcToClassAndStudent?classID=${classID}`)

export const deleteAnnouncement=(announcementID)=>API.delete("/notification/announcement",{data:{announcementID}})


export const getClassesByTeacherCalender=(teacherID)=>API.get(`/classService/teacherClassesCalender?teacherID=${teacherID}`);

export const getClassesByStudentCalender=(studentID)=>API.get(`/classService/studentClassesCalender?studentID=${studentID}`);

export const getAllClassesForCalender=()=>API.get(`/classService/allClassesCalender`);

export const getFullUserInformation=(userID)=>API.get(`/user/fullUserDetails?userID=${userID}`);

export const updateFullUserInformation=(userDetails)=>API.post("/user/updateFullUserDetails",userDetails);


export const getAllTeachersInfo=()=>API.get("/user/allteachers");

export const createNewUser=(userDetails)=>API.post("/user/createUser",userDetails);

export const getAllStaffInfo=()=>API.get("/user/allStaff");


export const getAllClassesFullInfo=()=>API.get(`/classService/fullclassInfo`);


export const getStudentAndTeacherDetails=(allPeople)=>API.post("/user/teacherAndStudentData",allPeople);

export const getStudentListAsExcel=(studentList)=>API.post("/user/generateStudentExcel",studentList,{responseType:"blob"})

export const getResultHeadingForClass=(classID)=>API.get(`/classService/resultForClass?classID=${classID}`);


export const uploadResultWithExcel=(formData)=>API.post("/classService/uploadResultWith", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getChartData=(chartData)=>API.post("/classService/charts",chartData);

export const getResultForSpecificStudent=(userID)=>API.get(`/classService/resultForUserID?userID=${userID}`);

export const getResultForSpecificStudentByClass=(userID,classID)=>API.get(`/classService/resultForClassAndStudent?userID=${userID}&classID=${classID}`);

export const getParentAnnouncements=(parentID)=>API.get(`/notification/parentAnnouncements?parentID=${parentID}`)


export const getStudentAnnouncements=(studentID)=>API.get(`/notification/studentAnnouncements?studentID=${studentID}`)

export const activateStudentAndParent=(studentData)=>API.post("/user/studentAndParentActivate",studentData)


export const getAllRegistrationPayments=()=>API.get("/payment/registrationPayments")

export const getAllClassPayments=()=>API.get("/payment/classFeePaymentData")


export const getBulkUserData=(userArray)=>API.post("/user/bulkUserData",userArray);

export const getOverallAttendanceVisualization=(startDate,endDate)=>API.get(`/classService/attendanceOverview?startDate=${startDate}&endDate=${endDate}`)


export const getAllStudents=()=>API.get("/user/allStudents")


export const getNotHandoveredCards=()=>API.get("/user/notReleasedCards")


export const getHandoveredCards=()=>API.get("/user/ReleasedCards")

export const createNewHall=(hallData)=>API.post("/classService/newHall",hallData);


export const updateHallDetails=(hallData)=>API.post("/classService/updateHall",hallData);


export const getTotalFeePaymentStatistics=(month,year)=>API.get(`/payment/totalClassFessStatistics?month=${month}&year=${year}`);

export const getTotalFeePaymentStatisticsByTeacher=(month,year)=>API.get(`/payment/totalClassFessStatisticsByTeacher?month=${month}&year=${year}`);


export const getClassFeePaymentForLastThirtyDaysByTeacher=(teacherID)=>API.get(`/payment/last30DaysClassFeesByTeacher?teacherID=${teacherID}`);

export const getTeacherPaymentReport=(teacherPaymentData)=>API.post("/payment/teacherPaymentReport",teacherPaymentData,{ responseType: 'arraybuffer' } );



export const getProgressReport=(selectedReportDate)=>API.get(`/user/progressReport?reportDate=${selectedReportDate}`);

export const getLastThirtyDaysclassPayment=()=>API.get(`/payment/last30DaysClassFees`);



export const getLastSevenDaysAttendance=()=>API.get("/classService/last7DaysAttendance")

export const getLastTwoWeeksTeacherClassAttendance=(teacherID)=>API.get(`/classService/last7DaysAttendance?teacherID=${teacherID}`)

export const activateDeactivateUser=(userData)=>API.post("/user/activateDeactivateUser",userData)

export const activateDeactivateHall=(hallData)=>API.post("/classService/activateDeactivateHall",hallData)


export const getAllRegistrationfees=()=>API.get(`/payment/allRegFees`);

export const getLatestRegistrationFee=()=>API.get(`/payment/latestRegFee`);


export const createNewRegistrationFee=(regFeeData)=>API.post(`/payment/newRegFee`,regFeeData);

export const getProgressReportDownload=(date)=>API.get(`/classService/progressReport?date=${date}`,{ responseType: 'arraybuffer' })

export const getAllOwners=()=>API.get("/user/AllownerInfo")


export const getAllEmailTemplates=()=>API.get("/notification/allEmailTemplates")

export const getAllSMSTemplates=()=>API.get("/notification/allSmsTemplates")

export const updateSMSTemplate=(SMStemplateData)=>API.patch("/notification/updateSmsTemp",SMStemplateData)

export const updateEmailTemplate=(EmailtemplateData)=>API.patch("/notification/updateEmailTemp",EmailtemplateData)

export const getAllAnnoucements=()=>API.get("/notification/AllAnnoucements")


export const getSMSAccountStatus=()=>API.get("/notification/smsAccountStatus")


export const sendAttendanceSMSNotification=(attendanceList)=>API.post("/notification/attendanceSMSNotification",attendanceList)


export const addNewSubject=(subjectData)=>API.post("/classService/newSubject",subjectData);


export const getStudentSubmissionsByPanel=(panelID)=>API.get(`/classService/studentSubmissionsByPanelID?panelID=${panelID}`);


export const getSelectedClassSelectedStudentAttendance=(classID,studentID)=>API.get(`/classService/attendanceForSelectedStudentSelectedClass?classID=${classID}&studentID=${studentID}`);

export const getClassFeePaymentForStudent=(UserID)=>API.get(`/payment/paymentsRelatedToStudent?UserID=${UserID}`);

export const getCreatedZoomMeeting=(meetingInfo)=>API.post(`/classService/createMeeting`,meetingInfo);

export const sendForgotPasswordEmail=(email)=>API.get(`/auth/forgotPasswordEmail?email=${email}`);

export const resetPassword=(passwordData)=>API.post(`/auth/resetPassword`,passwordData);