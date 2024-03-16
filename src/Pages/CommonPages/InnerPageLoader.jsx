import React from "react";
import StudentDashboard from "../../InnerPages/StudentDashboard";
import MainClassPage from "../../InnerPages/MainClassPage";
import StudentTimetable from "../../InnerPages/StudentTimetable";
import StudentNotices from "../../InnerPages/StudentNotices";
import StaffDashboard from '../../InnerPages/StaffDashboard';
import RegistrationPending from "../../InnerPages/RegistrationPending";
import ClassPayments from "../../InnerPages/ClassPayments";


const pageChanger = (pageChanger) => {
  console.log("aasa ", pageChanger);
  switch (pageChanger) {
    case "1":
      break

    case "2":
      break

    case "3":
      break

    case "4":
      break

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
      break

    case "12":
      break

    case "13":
      break

    case "14":
      break

    case "15":
      break

    case "16":
      return <StaffDashboard/>

    case "17":
      return <RegistrationPending/>

    case "18":
      return <ClassPayments/>

    case "19":
      break

    case "20":
      break

    case "21":
      break

    case "22":
      break
      
    case "23":
      break

    case "24":
      break

    case "25":
      break

    case "26":
      return <StudentDashboard />;

    case "27":
      break

    case "28":
      break

    case "29":
      break
    default:
      break;
  }
};

const InnerPageLoader = ({ innerPageKey }) => {
  return <>{pageChanger(innerPageKey)}</>;
};

export default InnerPageLoader;
