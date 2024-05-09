import React, { useEffect, useState } from "react";
import { ownerDashboardImg } from "../assets";
import { Statistic, Tag, message } from "antd";
import {
  getAllClassesFullInfo,
  getClassFeePaymentForLastThirtyDaysByTeacher,
  getClassesByTeacher,
  getClassesByTeacherCalender,
  getCreatedAppointmentsRelatedToTeacher,
  getLastSevenDaysAttendance,
  getLastThirtyDaysclassPayment,
  getLastTwoWeeksTeacherClassAttendance,
  getProgressReport,
  getSMSAccountStatus,
  getTotalFeePaymentStatistics,
} from "../API";
import LoadingInnerPage from "./LoadingInnerPage";
import ClassPaymentLineChart from "../Components/Charts/ClassPaymentLineChart";
import dayjs from "dayjs";
import OverallPaymentPieChart from "../Components/Charts/OverallPaymentPieChart";
import CountUp from "react-countup";
import AttendanceBarchart from "../Components/Charts/AttendanceBarchart";
import { getNextNDaysClasses } from "../Utils/ClassesArranger";
import TimeTableDashboardCard from "../Components/TeacherComp/TimeTableDashboardCard";

const TeacherDashboard = () => {
  const activeUser = JSON.parse(localStorage.getItem("profile"))?.result;
  console.log("active user is ", activeUser);
  const [classPaymentChartData, setClassPaymentChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [classStatDetails, setClassStatDetails] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [smsAccountStatus, setSMSAccountStatus] = useState(null);
  const [classTimeTable, setClassTimeTable] = useState(null);
  const [appointmentCount,setAppointmentCount]=useState();
  const [classCount,setClassCount]=useState(null);
  const [studentCount,setStudentCount]=useState(null)

  useEffect(() => {
    // fetchLastDaysClassFees();
    fetchProgressReportData();
    // fetchTotalClassPaymentData();
    fetchTwoWeekStudentAttendance();
    // fetchSMSAccountStatus();
    fetchTeacherCalender();
    fetchLastDaysClassFeesByTeacher();
    fetchAppointmentsRelatedToTeacher();
    fetchClassesByTeacher();
  }, []);

  const genderChartValues = [
    {
      name: "Male",
      value: reportData?.studentGender?.male,
    },
    {
      name: "Female",
      value: reportData?.studentGender?.female,
    },
  ];

  const fetchLastDaysClassFees = async () => {
    try {
      setLoading(true);
      const classFeesResult = await getLastThirtyDaysclassPayment();
      console.log("class fee result ", classFeesResult);
      setClassPaymentChartData(classFeesResult.data);
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
      message.error("class fees payment fetching error!");
    }
  };


  const fetchLastDaysClassFeesByTeacher = async () => {
    try {
      setLoading(true);
      const classFeesResult = await getClassFeePaymentForLastThirtyDaysByTeacher(activeUser?.UserID);
      console.log("class fee result ", classFeesResult);
      setClassPaymentChartData(classFeesResult.data);
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
      message.error("class fees payment fetching error!");
    }
  };
  




  const fetchTeacherCalender = async () => {
    const classCalenderResult = await getClassesByTeacherCalender(
      activeUser.UserID
    );
    console.log("class calender result ", classCalenderResult);
    const nextDaysClassArrangement = getNextNDaysClasses(
      classCalenderResult.data,
      7
    );
    console.log("next n days class ", nextDaysClassArrangement);
    setClassTimeTable(nextDaysClassArrangement);
  };

  const fetchProgressReportData = async () => {
    try {
      const reportResult = await getProgressReport(dayjs().format("YYYY-MM"));
      console.log("progress report result ", reportResult);
      setReportData(reportResult.data);
    } catch (error) {
      console.log("progree report getting error! ", error);
      message.error("Progress Report getting error!");
    }
  };

  



  const fetchAppointmentsRelatedToTeacher=async()=>{
    try {
      const appointmentResult = await getCreatedAppointmentsRelatedToTeacher(activeUser?.UserID);
      console.log("appoinyment result ",appointmentResult);
      setAppointmentCount(appointmentResult.data?.length)
    } catch (error) {
      console.log("appointment getting error! ", error);
      message.error("appointment getting error!");
    }
  }


  const fetchClassesByTeacher=async()=>{
    try {
      const classResult = await getClassesByTeacher(activeUser?.UserID);
      console.log("class Result   ",classResult);
      setClassCount(classResult.data[0].length);


      const allclassResult=await getAllClassesFullInfo();
      console.log("class  full resulr ",allclassResult);
      let studentCount=0;
      for(const classData of classResult.data[0]){
        const classInfo=allclassResult?.data?.find((classes)=>classes?.classID==classData?.classID);
        if (classInfo) {
          studentCount=studentCount+classInfo.students.length
        }
      }
      setStudentCount(studentCount);
     
    } catch (error) {
      console.log("classes getting getting error! ", error);
      message.error("class Data fetching error!");
    }
  }

  

  const fetchTwoWeekStudentAttendance = async () => {
    try {
      const attendanceData = await getLastTwoWeeksTeacherClassAttendance(
        activeUser?.UserID
      );
      console.log("seven days attendance  ", attendanceData);
      setAttendanceData(attendanceData.data);
    } catch (error) {
      console.log("error fetching seven days Attendance", error);
      message.error("error fetching seven days Attendance!");
    }
  };

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Dashboard
        </h1>
      </div>

      <div
        data-aos="fade-right"
        className="w-[95%]  h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 "
      >
        <div className="w-full h-[100%] flex flex-col items-center  rounded-2xl">
          <div className="w-full bg-[#4551A1]  flex flex-row p-2 rounded-xl ">
            <div className="w-[70%]  flex flex-col justify-center mb-3 ml-5">
              <h1 className="text-[20px] font-medium text-white">
                Hello, {activeUser?.firstName}
              </h1>
              <p className="text-[15px] text-white">Welcome back to moodle</p>
            </div>
            <div className="w-[25%] flex flex-col items-end">
              <img className="w-[150px]" src={ownerDashboardImg} />
            </div>
          </div>
          {loading ? (
            <LoadingInnerPage />
          ) : (
            <div className="w-full mt-3  overflow-y-auto  h-full flex flex-col lg:flex-row justify-between">
              <div className="w-[95%] flex flex-col  justify-between h-full  lg:w-[74%] ">
                <div className="w-full flex flex-col lg:flex-row justify-between p-2 lg:h-[47%] ">
                <div className="w-full lg:w-[47%]  flex  flex-row justify-between">
                <div className="w-[47%] scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full  bg-white items-center justify-center">
                  <Statistic valueStyle={{fontSize:"60px",color:"#4551A1"}}  className="text-center text-[25px] " title={<p className="text-[17px] font-medium text-center text-gray-500">Teacher class Count</p>} value={classCount} formatter={formatter}/>
                </div>
                <div className="w-[47%] scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full  bg-white items-center justify-center">
                  <Statistic valueStyle={{fontSize:"60px",color:"#4551A1"}}  className="text-center text-[25px] " title={<p className="text-[17px] font-medium text-center text-gray-500">Class Students</p>} value={studentCount} formatter={formatter}/>
                </div>
                </div>


                <div className="w-full   lg:w-[50%] scalar-card lg:h-full p-2 bg-white rounded-xl ring-2">
                <p className="font-medium text-center text-gray-500">Total Class fees payment</p>
                  
                  <div className="w-full h-[90%]">
                  <ClassPaymentLineChart chartData={classPaymentChartData} />
                  </div>
               
                </div>


                </div>
                <div className="w-full hidden lg:flex flex-col lg:flex-row justify-between h-full p-2 lg:h-[47%] ">
                  <div className="w-full lg:w-[72%] scalar-card flex flex-col lg:h-full rounded-xl ring-2 shadow-lg p-2 bg-white ">
                    <p className="font-medium text-center text-gray-500">
                      Last Two weeks All classes Attendance
                    </p>
                    <AttendanceBarchart chartData={attendanceData} />
                  </div>
                  <div className="w-full lg:w-[23%] scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full  bg-white items-center justify-center">
                  <Statistic valueStyle={{fontSize:"60px",color:"#4551A1"}}  className="text-center text-[25px] " title={<p className="text-[17px] font-medium text-center text-gray-500">Total Appointments</p>} value={appointmentCount} formatter={formatter}/>
                </div>
                </div>
              </div>
              <div className="w-[95%] hidden  lg:w-[25%] ring-2 m-2  border-2 p-2 lg:flex flex-col items-center pt-1 bg-white rounded-lg ">
                <p className="font-medium text-center  text-gray-500">
                  Class Schedule
                </p>
                <div className="w-full overflow-y-auto">
                  {classTimeTable?.map((obj, index) => (
                    <React.Fragment key={index}>
                      {obj.classes?.map((classes, idx) => (
                        <TimeTableDashboardCard
                          index={index}
                          day={obj?.dayOfWeek}
                          classData={classes}
                          key={idx}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;


