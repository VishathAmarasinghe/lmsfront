import React, { useEffect, useState } from "react";
import { ownerDashboardImg } from "../assets";
import { Statistic, Tag, message } from "antd";
import { getLastSevenDaysAttendance, getLastThirtyDaysclassPayment, getProgressReport, getSMSAccountStatus, getTotalFeePaymentStatistics } from "../API";
import LoadingInnerPage from "./LoadingInnerPage";
import ClassPaymentLineChart from "../Components/Charts/ClassPaymentLineChart";
import dayjs from "dayjs";
import OverallPaymentPieChart from "../Components/Charts/OverallPaymentPieChart";
import CountUp from 'react-countup';
import AttendanceBarchart from "../Components/Charts/AttendanceBarchart";

const StaffDashboard = () => {
  const activeUser = JSON.parse(localStorage.getItem("profile"))?.result;
  console.log("active user is ", activeUser);
  const [classPaymentChartData, setClassPaymentChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [classStatDetails,setClassStatDetails]=useState(null);
  const [attendanceData,setAttendanceData]=useState(null);
  const [smsAccountStatus,setSMSAccountStatus]=useState(null);

  useEffect(() => {
    fetchLastDaysClassFees();
    fetchProgressReportData();
    fetchTotalClassPaymentData();
    fetchLastSevenDaysAttendance();
    fetchSMSAccountStatus();
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




  const fetchSMSAccountStatus=async()=>{
    try {
      const accountData=await getSMSAccountStatus();
      console.log("account data ",accountData);
      setSMSAccountStatus(accountData.data?.data);
    } catch (error) {
      console.log("SMS account Data error! ", error);
      message.error("SMS account Data error!");
    }
  }



  const fetchTotalClassPaymentData = async () => {
    try {
      const selectedReportDate=dayjs().format("YYYY-MM");
      const selectedDate=selectedReportDate.split("-");
      const result = await getTotalFeePaymentStatistics(selectedDate[1],selectedDate[0]);
      console.log("result od payment stat is ", result);
      setClassStatDetails(result.data);
     
    } catch (error) {
      console.log("error fetching totalPayment statistics", error);
      message.error("class Fees statistics getting error!");
    }
  };


  const fetchLastSevenDaysAttendance=async()=>{
    try {
      const attendanceData=await getLastSevenDaysAttendance();
      console.log("seven days attendance  ",attendanceData);
      setAttendanceData(attendanceData.data);
    } catch (error) {
      console.log("error fetching seven days Attendance", error);
      message.error("error fetching seven days Attendance!");
    }
  }

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
            <div className="w-full mt-3  h-full flex flex-col justify-between">
              <div className=" w-full flex flex-row justify-between h-[45%] mt-2">
                <div className="w-[45%] scalar-card h-full p-2 bg-white rounded-xl ring-2">
                <p className="font-medium text-center text-gray-500">Class fees payment</p>
                  
                  <div className="w-full h-[90%]">
                  <ClassPaymentLineChart chartData={classPaymentChartData} />
                  </div>
               
                </div>
                <div className="w-[25%] scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full  bg-white items-center justify-center">
                <p className="font-medium text-center text-gray-500">Revenue presentage</p>
                  <OverallPaymentPieChart chartData={classStatDetails?.overallStat} />
                </div>
                <div className="w-[25%] scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full  bg-white items-center justify-center">
                  <Statistic valueStyle={{fontSize:"60px",color:"#4551A1"}}  className="text-center text-[25px] " title={<p className="text-[17px] font-medium text-center text-gray-500">Active Students</p>} value={reportData?.activatedStudents} formatter={formatter}/>
                </div>
              </div>
              <div className="w-full  flex flex-row justify-between  h-[50%]">
                
                <div className="w-[30%] scalar-card flex flex-col ring-2 h-full p-2 bg-white rounded-xl">
                <p className="font-medium text-center text-gray-500">Student Gender Veriation</p>
                  <OverallPaymentPieChart chartData={genderChartValues} />
                </div>
                <div className="w-[25%] scalar-card rounded-xl shadow-lg ring-2  flex flex-col h-full  bg-white items-center justify-center">
                  <Statistic valueStyle={{fontSize:"60px",color:smsAccountStatus?.acc_balance>100?"#4551A1":"red"}}   className="text-center  text-[25px] " title={<p className="text-[17px] font-medium text-center text-gray-500">SMS Credits</p>} value={smsAccountStatus?.acc_balance} formatter={formatter}/>
                  <Tag className={smsAccountStatus?.active?"bg-green-500 text-white  rounded-md":""}>{smsAccountStatus?.active?"Account Active":"Account Deactivated"}</Tag>
                </div>
                <div className="w-[40%] scalar-card flex flex-col h-full rounded-xl ring-2 shadow-lg p-2 bg-white ">
                <p className="font-medium text-center text-gray-500">Weekly  Attendance</p>
                  <AttendanceBarchart chartData={attendanceData}/>
                 
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default StaffDashboard