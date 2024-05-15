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
import ParentPerformance from "../../InnerPages/ParentPerformance";
import ParentNoticePanel from "../../InnerPages/ParentNoticePanel";
import PastPaymentsStaff from "../../InnerPages/PastPaymentsStaff";
import OwnerAndStaffTimeTable from "../../InnerPages/OwnerAndStaffTimeTable";
import StaffOwnerAttendanceInfo from "../../InnerPages/StaffOwnerAttendanceInfo";
import StaffAndOwnerStudentPanel from "../../InnerPages/StaffAndOwnerStudentPanel";
import StudentCardProcess from "../../InnerPages/StudentCardProcess";
import OwnerHallInfoPage from "../../InnerPages/OwnerHallInfoPage";
import TeacherPayments from "../../InnerPages/TeacherPayments";
import OwnerReportShowingPage from "../../InnerPages/OwnerReportShowingPage";
import OwnerConfigurationPage from "../../InnerPages/OwnerConfigurationPage";
import OwnerAddingPage from "../../InnerPages/OwnerAddingPage";
import TeacherDashboard from "../../InnerPages/TeacherDashboard";
import ParentStudentPanel from "../../InnerPages/ParentStudentPanel";
import ParentAttendanceShower from "../../InnerPages/ParentAttendanceShower";
import ParentPaymentshower from "../../InnerPages/ParentPaymentshower";




const pageChanger = (pageChanger) => {
  console.log("aasa ", pageChanger);
  switch (pageChanger) {
    case "1":
      return <ParentDashboard/>
      
    case "2":
      return <ParentPerformance/>

    case "3":
      return <NewAppointment/>

    case "4":
      return <PastAppointments/>

    case "5":
      return <ParentNoticePanel/>

    case "6":
      break

    case "7":
     return <StudentDashboard/>

    case "8":
      return <MainClassPage />;

    case "9":
      return <TeacherTimeTable/>

    case "10":
      return <ParentNoticePanel/>

    case "11":
      return <TeacherDashboard/>
      

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
      return <PastPaymentsStaff/>
      break

    case "20":
      break

    case "21":
      return <AddStudentToClass/>

    case "22":
      return <OwnerClassPanel/>
      
    case "23":
      return <OwnerAndStaffTimeTable/>

    case "24":
      return <TeacherNoticePanel/>

    case "25":
      return <OwnerDashboard/>

    case "26":
      return <OwnerPageTeacherPanel/>

    case "27":
      return <StaffAndOwnerStudentPanel/>

    case "28":
      return <OwnerPageStaffPanel/>

    case "29":
      return <PastPaymentsStaff/>
    case "30":
      return <RegistrationPaymentProceeder/>
    case "31":
      return <OwnerReportShowingPage/>
    case "32":
      break
    case "33":
      return <AttendanceMarkPage/>
    case "34":
      return <StaffOwnerAttendanceInfo/>
    case "35":
      return <OwnerClassPanel/>
    case "36":
      return <OwnerAndStaffTimeTable/>
    case "37":
      return <StaffAndOwnerStudentPanel/>
    case "38":
      return <StudentCardProcess/>
    case "39":
      return <OwnerHallInfoPage/>
    case "40":
      return <TeacherPayments/>
    case "41":
      return <OwnerConfigurationPage/>
    case "42":
      return <OwnerAddingPage/>
    case "43":
      return <ParentStudentPanel/>
    case "44":
      return <ParentAttendanceShower/>
    case "45":
      return <ParentPaymentshower/>
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
