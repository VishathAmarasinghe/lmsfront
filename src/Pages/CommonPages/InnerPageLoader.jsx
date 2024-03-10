import React from "react";
import StudentDashboard from "../../InnerPages/StudentDashboard";
import MainClassPage from "../../InnerPages/MainClassPage";
import StudentTimetable from "../../InnerPages/StudentTimetable";
import StudentNotices from "../../InnerPages/StudentNotices";

const pageChanger = (pageChanger) => {
  console.log("aasa ", pageChanger);
  switch (pageChanger) {
    case "7":
      return <StudentDashboard />;
      break;
    case "8":
      return <MainClassPage />;
    case "9":
      return <StudentTimetable/>;
    case "10":
      return <StudentNotices/>;
    default:
      break;
  }
};

const InnerPageLoader = ({ innerPageKey }) => {
  return <>{pageChanger(innerPageKey)}</>;
};

export default InnerPageLoader;
