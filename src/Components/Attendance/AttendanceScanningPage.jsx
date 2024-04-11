import { Form, Select, message, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection-react18";
import { validateBarcode } from "../../Utils/Validations";
import { attendanceVerfiicationOfStudentsInclass, getActivatedStudents, markAttendance } from "../../API";
import { correctSign, scanImage, wrongSign } from "../../assets";
import AttendanceMarkingStats from "./AttendanceMarkingStats";

const AttendanceScanningPage = ({selectedClass, setSelectedClass }) => {
  const [optionStudentArray, setOptionStudentArray] = useState([]);
  const [selectedStudent,setSelectedStudent]=useState(null);
  const staffMember=JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [barcode, setBarcode] = useState("");
  const [finalStatOpen,setFinalStatOpen]=useState(false);
  const [viewStudent,setViewStudent]=useState({
    attendanceStatus:"",
    studentID:"",
    studentName:"",
    message:"Attendance checking",
    photo:""
  })

  useScanDetection({
    onComplete: setBarcode,
  });





  useEffect(() => {
    console.log("bar code", barcode);
    if (validateBarcode(barcode)) {
      fetchingScannedStudent();
    } else {
      if (barcode.length != 0) {
        notification.error({
          message: "Invalid Barcode",
          description: `Please check the card and rescan the card`,
        });
      }
    }
  }, [barcode]);





  useEffect(() => {
    arrangeStudentsToSearch();
  }, []);




  useEffect(() => {
    if (selectedStudent != null || selectedStudent != undefined) {
        const dateValue = selectedStudent?.data?.feePaymentAnalysis?.dataBeforeDefineDate;
        const feepayment = selectedStudent?.data?.feePaymentAnalysis?.feePayment;
        const studentName = selectedStudent?.data?.profileData?.firstName + " " + selectedStudent?.data?.profileData?.lastName;
        const photo = selectedStudent?.data?.profileData?.photo;
        const studentIDNumber = selectedStudent?.data?.profileData?.UserID + "  " + selectedStudent?.data?.profileData?.studentID;

        if (!dateValue) {
            if (feepayment === 0) {
                setViewStudent({
                    ...viewStudent,
                    attendanceStatus: false,
                    message: "monthly fees not paid!",
                    studentName: studentName,
                    photo: photo,
                    studentID: studentIDNumber
                });
            } else {
                setViewStudent({
                    ...viewStudent,
                    attendanceStatus: true,
                    message: "Attendance Marked",
                    studentName: studentName,
                    photo: photo,
                    studentID: studentIDNumber
                });
            }
        } else {
            console.log("integral came here");
            setViewStudent({
                ...viewStudent,
                attendanceStatus:true,
                message:"Attendance Marked",
                studentName: studentName,
                photo: photo,
                studentID: studentIDNumber
            });
        }
    }
}, [selectedStudent]);


  useEffect(()=>{
    console.log("view Student ",viewStudent);
  },[viewStudent])




  const filterStudents = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };




  const onSearch = (input) => {
    console.log("search:", input);
  };




  const handleSelectedValue = (value) => {
    console.log("selected value:", value);

    console.log("option obect array ",optionStudentArray);

    const selected = optionStudentArray.find(
      (student) => student.value === value
    );
    console.log("selected value of studnet ",selected);
    setSelectedStudent(selected);
  };





  const fetchingScannedStudent = () => {
    const extractedUserIDValue = "US" + parseInt(barcode.substring(0, 5));
    const extractStudentIDValue = "ST" + parseInt(barcode.substring(5));
    const extactedValue = `${extractedUserIDValue} ${extractStudentIDValue}`;
    console.log(
      "ectracted UserID and studentID ",
      extractedUserIDValue,
      "  ",
      extractStudentIDValue
    );
    const selected = optionStudentArray.find(
      (student) => student.value === extractedUserIDValue
    );
    console.log("selected values ", selected);
    if (selected === undefined) {
      notification.warning({
        message: "No existing student",
        description: `Please check the card and rescan the card`,
      });
    }
    setSelectedStudent(selected);
  };





  const arrangeStudentsToSearch = async () => {
    try {
      const studentResult = await attendanceVerfiicationOfStudentsInclass(selectedClass?.classID);
      console.log(studentResult.data);
      setOptionStudentArray(
        studentResult.data.map((student) => ({
          value: `${student.studentID}`,
          label: `${student?.profileData?.firstName}   ${student?.profileData?.lastName}  ${student?.profileData?.phoneNo}  ${student.studentID}  ${student?.profileData?.NIC}`,
          data: student,
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };


  const handleNext=async()=>{
    setSelectedStudent(null);
    if (viewStudent.attendanceStatus) {
        markStudentAttendance();
    }else{
        message.warning("attendance not marked for student!");
    }
    setViewStudent({
        attendanceStatus:"",
        studentID:"",
        studentName:"",
        message:"Attendance checking",
        photo:""
      })
  }


  const markStudentAttendance=async()=>{
    const attendanceData={
        studentID:selectedStudent?.data?.profileData?.UserID,
        staffID:staffMember,
        classID:selectedClass.classID
    }
    const attendanceResult=await markAttendance(attendanceData);
    if (attendanceResult.status==200) {
        message.success(attendanceResult.data.message);
    }else{
        message.error("attendance Marking Error!")
    }
  }

  const handleFinishedMarkingAttendance=()=>{
    handleNext();
    setFinalStatOpen(true);
  }


  const handleBackButton = () => {
    handleNext();
    setSelectedClass(null);
  };



  return (
    <div className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className=" w-[95%] h-[70%] lg:h-[80%]">
        <div className=" mt-3 w-full ">
            <AttendanceMarkingStats classData={selectedClass} totalNumber={optionStudentArray.length} finalStatOpen={finalStatOpen} setFinalStatOpen={setFinalStatOpen}/>
          <Form>
            <FormItem
              className="font-medium text-[17px]"
              label="Select Student"
            >
              <Select
                className=""
                showSearch
                onChange={handleSelectedValue}
                placeholder="Search by name, phone number, NIC, student ID, or user ID"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterStudents}
                options={optionStudentArray}
              />
            </FormItem>
          </Form>
        </div>
        <div className=" w-full h-[95%] ">
            {
                selectedStudent==null || selectedStudent==undefined?
                <div className="flex flex-col items-center justify-center h-[90%]">
                <img
                  className="w-[30%] "
                  src={scanImage}
                />
                <span className="text-slate-400">
                  Scan the card to get student details
                </span>
              </div>:
              <div className="flex flex-col items-center justify-center h-[90%]">
                     <img src={`http://localhost:5000/${viewStudent.photo}`} alt="student" className="w-[60%] lg:w-[10%] rounded-md"/>
                     <div className="flex flex-col mt-2  justify-center items-center">
                        <p className="text-[18px] font-medium">{viewStudent.studentID}</p>
                        <p className="text-[18px] font-semibold">{viewStudent.studentName}</p>
                     </div>
                     <div className="flex flex-col items-center my-6">
                        {
                            
                            viewStudent.attendanceStatus==true?<img className="w-[10%]" src={correctSign} />:<img className="w-[10%]" src={wrongSign}/>
                        }
                     </div>
                     <div>
                        <h1 className={`${viewStudent.attendanceStatus?"text-green-600":"text-red-600"} text-[22px] font-bold`}>{viewStudent.message}</h1>
                     </div>
              </div>
            }
        </div>
        <div className=" w-full flex flex-col justify-center items-center lg:items-end border-dashed p-2 border-t-2 border-slate-400 ">
          <div className=" w-full lg:w-[40%] flex flex-col lg:flex-row justify-between items-center">
          <button onClick={()=>handleNext()} className="border-2 border-blue-600 my-2 hover:bg-blue-700 text-white text-[15px] font-medium bg-blue-600 rounded-md p-1 w-[90%] lg:w-[30%]">
              Next
            </button>
            <button onClick={()=>handleFinishedMarkingAttendance()} className="border-2 border-green-600 hover:bg-green-700 text-white text-[15px] font-medium bg-green-600 rounded-md p-1 w-[90%] lg:w-[30%]">
              Finish
            </button>
            <button
              onClick={()=>handleBackButton()}
              className="border-2 border-slate-400 p-1 w-[90%] my-2 text-[15px] font-medium rounded-md hover:bg-slate-400 hover:text-white lg:w-[30%]"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceScanningPage;
