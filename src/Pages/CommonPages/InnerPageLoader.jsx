import React, { useEffect, useState } from "react";
import StudentDashboard from "../../InnerPages/StudentDashboard";
import MainClassPage from "../../InnerPages/MainClassPage";
import StudentTimetable from "../../InnerPages/StudentTimetable";
import StudentNotices from "../../InnerPages/StudentNotices";
import StaffDashboard from '../../InnerPages/StaffDashboard';
import RegistrationPending from "../../InnerPages/RegistrationPending";
import ClassPayments from "../../InnerPages/ClassPayments";
import RegistrationPaymentProceeder from "../../InnerPages/RegistrationPaymentProceeder";
import { useSelector } from "react-redux";
import AddStudentToClass from "../../InnerPages/AddStudentToClass";
import AttendanceMarkPage from "../../InnerPages/AttendanceMarkPage";
import ParentDashboard from "../../InnerPages/ParentDashboard";
import NewAppointment from "../../InnerPages/NewAppointment";
import  PastAppointments from '../../InnerPages/PastAppointments';
import TeacherAppointmentPendingPanel from "../../InnerPages/TeacherAppointmentPendingPanel";
import TeacherNoticePanel from "../../InnerPages/TeacherNoticePanel";
import TeacherTimeTable from "../../InnerPages/TeacherTimeTable";
import OwnerPageTeacherPanel from "../../InnerPages/OwnerPageTeacherPanel";
import OwnerDashboard from "../../InnerPages/OwnerDashboard";
import OwnerPageStudentPanel from "../../InnerPages/OwnerPageStudentPanel";
import OwnerPageStaffPanel from '../../InnerPages/OwnerPageStaffPanel';
import OwnerClassPanel from "../../InnerPages/OwnerClassPanel";
import OwerClassTimeTable from "../../InnerPages/OwerClassTimeTable";




const pageChanger = (pageChanger) => {
  console.log("aasa ", pageChanger);
  switch (pageChanger) {
    case "1":
      return <ParentDashboard/>

    case "2":
      break

    case "3":
      return <NewAppointment/>

    case "4":
      return <PastAppointments/>

    case "5":
      break

    case "6":
      break

    case "7":
      break

    case "8":
      return <MainClassPage />;

    case "9":
      return <StudentTimetable/>;

    case "10":
      return <StudentNotices/>;

    case "11":
      break;
      

    case "12":
      return <MainClassPage/>

    case "13":
      return <TeacherTimeTable/>

    case "14":
      return <TeacherNoticePanel/>

    case "15":
      return <TeacherAppointmentPendingPanel/>

    case "16":
      return <StaffDashboard/>

    case "17":
      return <RegistrationPending/>

    case "18":
      return <ClassPayments/>

    case "19":
      return <RegistrationPaymentProceeder/>
      break

    case "20":
      break

    case "21":
      return <AddStudentToClass/>

    case "22":
      break
      
    case "23":
      break

    case "24":
      break

    case "25":
      return <OwnerDashboard/>

    case "26":
      return <OwnerPageTeacherPanel/>

    case "27":
      return <OwnerPageStudentPanel/>

    case "28":
      return <OwnerPageStaffPanel/>

    case "29":
      break
    case "30":
      return <RegistrationPaymentProceeder/>
    case "31":
      break
    case "32":
      break
    case "33":
      return <AttendanceMarkPage/>
    case "34":
      break
    case "35":
      return <OwnerClassPanel/>
    case "36":
      return <OwerClassTimeTable/>
    default:
      break;
  }
};

const InnerPageLoader = ({ innerPageKey }) => {
  const { pageNumber } = useSelector((state) => state.page);
  const [renderingPage,SetRenderingPage]=useState(<></>);
  useEffect(()=>{
      SetRenderingPage(pageChanger(pageNumber));
  },[pageNumber])
  return <>{renderingPage}</>;
  // pageChanger(innerPageKey)
};

export default InnerPageLoader;
