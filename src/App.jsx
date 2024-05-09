import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect, useState } from "react";
import LoginRegistration from "./Pages/CommonPages/LoginRegistration";
import PageStructure from "./Pages/CommonPages/PageStructure";
import ClassPageStructure from "./Pages/CommonPages/ClassPageStructure";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoadingPage from "./Pages/CommonPages/LoadingPage";
import TeacherPaymentDetailReport from "./Pages/CommonPages/ReportTemplates/TeacherPaymentDetailReport";
import ProgressReport from "./Pages/CommonPages/ReportTemplates/ProgressReport";



function App() {
  const user=JSON.parse(localStorage.getItem("profile"));
  const location=useLocation();

  useEffect(()=>{
    Aos.init();
    Aos.refresh();
  },[])

  useEffect(()=>{
    // setUser(JSON.parse(localStorage.getItem("profile")));
    console.log("current user ",user);
    console.log("location Path ",location.pathname);
  },[location.pathname])


  return (
    <Routes>
      <Route path="/login" Component={()=>(!user?<LoginRegistration actionType="login"/>:<Navigate to="/"/>)}/>
      <Route path="/register" Component={()=>(!user?<LoginRegistration actionType="register"/>:<Navigate to="/"/>)}/>
      <Route path="/" Component={()=>(!user?<LoginRegistration actionType="login"/>:<PageStructure/>)}/>
      <Route path="/class/:classID" Component={()=>(!user?<LoginRegistration actionType="login"/>:<ClassPageStructure/>)}/>
      <Route path="/" Component={()=>(!user?<LoginRegistration actionType="login"/>:<Navigate to="/"/>)}/>
      <Route path="/report/teacher" Component={TeacherPaymentDetailReport}/>
      <Route path="/report/progressReport" Component={ProgressReport}/>
    </Routes>
  )
}

export default App
