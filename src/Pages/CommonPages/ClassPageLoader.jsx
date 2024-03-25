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
import ClassContent from "../../Components/Class/ClassContent";
import ClassParticipants from "../../InnerPages/ClassParticipants";


const pageChanger = (pageChanger) => {
  console.log("aasa ", pageChanger);
  switch (pageChanger) {
    case "A1":
      return <ClassContent/>

    case "A2":
      return <ClassParticipants/>

    case "A3":
      break

    case "A4":
      break

    case "A5":
        return <ClassContent/>

    case "A6":
        return <ClassParticipants/>

    case "A7":
      break

    case "A8":
      return <MainClassPage />;

    case "A9":
      return <StudentTimetable/>;

   
      break;
  }
};

const ClassPageLoader = ({ innerPageKey }) => {
  const  pageNumber  = useSelector((state) => state.page.classPageNumber);
  const [renderingPage,SetRenderingPage]=useState(<></>);
  useEffect(()=>{
      SetRenderingPage(pageChanger(pageNumber));
  },[pageNumber])
  return <>{renderingPage}</>;

};

export default ClassPageLoader;
