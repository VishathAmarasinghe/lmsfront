import React, { useEffect, useState } from "react";
import { ownerDashboardImg } from "../assets";
import { Empty, Statistic, Tag, message } from "antd";
import {
  getAllClassesFullInfo,
  getAllTeachers,
  getClassFeePaymentForLastThirtyDaysByTeacher,
  getClassesByStudentCalender,
  getClassesByTeacher,
  getClassesByTeacherCalender,
  getClassesForSelectedStudent,
  getCreatedAppointmentsRelatedToTeacher,
  getLastSevenDaysAttendance,
  getLastThirtyDaysclassPayment,
  getLastTwoWeeksTeacherClassAttendance,
  getProgressReport,
  getSMSAccountStatus,
  getStudentAnnouncements,
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
import NoticeCard from "../Components/Student/NoticeCard";
import AnnouncementMiniCard from "../Components/NotificationComp/AnnouncementMiniCard";

const StudentDashboard = () => {
  const activeUser = JSON.parse(localStorage.getItem("profile"))?.result;
  console.log("active user is ", activeUser);
  const [classPaymentChartData, setClassPaymentChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [classTimeTable, setClassTimeTable] = useState(null);
  const [appointmentCount, setAppointmentCount] = useState();
  const [classCount, setClassCount] = useState(null);
  const [teacherCount, setTeacherCount] = useState(null);
  const [announcements,setAnnouncements]=useState(null);

  useEffect(() => {
    // fetchLastDaysClassFees();
    fetchProgressReportData();
    fetchStudentCalender();
    fetchClassesByStudent();
    fetchStudentAnnouncemnts();
    fetchAllTeachers();
  }, []);



  const fetchAllTeachers = async () => {
    try {
      setLoading(true);
      const teacherResult =
        await getAllTeachers();
      console.log("All teacher result ", teacherResult);
      setTeacherCount(teacherResult?.data?.length);
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
      message.error("class fees payment fetching error!");
    }
  };

  const fetchStudentCalender = async () => {
    const classCalenderResult = await getClassesByStudentCalender(
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



  const fetchClassesByStudent = async () => {
    try {
      const classResult = await getClassesForSelectedStudent(
        activeUser?.UserID
      );
      console.log("class Result   ", classResult);
      setClassCount(classResult.data?.length);
    } catch (error) {
      console.log("classes getting getting error! ", error);
      message.error("class Data fetching error!");
    }
  };



  const fetchStudentAnnouncemnts = async () => {
    try {
        setLoading(true)
        const annoucementResult=await getStudentAnnouncements(activeUser?.UserID);
        console.log("parent Announcements  ",annoucementResult);
        setAnnouncements(annoucementResult.data);
        setLoading(false);
    } catch (error) {
        console.log("error ",error);
        message.error("error occured fetching annoucements! ")
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
              <div className="w-[95%] flex flex-col lg:flex-row  justify-start  lg:justify-between h-full  lg:w-[74%] ">
                <div className="w-full lg:w-[70%] flex flex-rowk lg:flex-row justify-between p-2 lg:h-full ">
                    <div className="w-full bg-white p-2 ring-2 flex flex-col items-center rounded-lg ">
                    <p className="text-[17px] font-medium text-center  text-gray-500">
                          Announcements
                        </p>
                    {
            loading?<LoadingInnerPage/>:(
              announcements?.length==0?<Empty description="No Announcements Yet!"/>:
                announcements?.map((announcement)=>
                <AnnouncementMiniCard announcement={announcement} userID={activeUser?.UserID}   key={announcement?.announcementID}/>
                )
            )
        }

                    </div>
                </div>
                <div className="w-full lg:w-[30%] flex flex-row lg:flex-col   justify-between p-2 lg:h-full ">
                  <div className="w-full scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full lg:h-[47%] bg-white items-center justify-center">
                    <Statistic
                      valueStyle={{ fontSize: "60px", color: "#4551A1" }}
                      className="text-center text-[25px] "
                      title={
                        <p className="text-[17px] font-medium text-center text-gray-500">
                          My class Count
                        </p>
                      }
                      value={classCount}
                      formatter={formatter}
                    />
                  </div>

                  <div className="w-full  scalar-card ring-2 rounded-xl shadow-lg flex flex-col h-full lg:h-[47%]  bg-white items-center justify-center">
                    <Statistic
                      valueStyle={{ fontSize: "60px", color: "#4551A1" }}
                      className="text-center text-[25px] "
                      title={
                        <p className="text-[17px] font-medium text-center text-gray-500">
                          All Teachers
                        </p>
                      }
                      value={teacherCount}
                      formatter={formatter}
                    />
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

export default StudentDashboard;
