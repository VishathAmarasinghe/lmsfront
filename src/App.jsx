import "aos/dist/aos.css";
import Aos from "aos";

import { useEffect } from "react";
import LoginRegistration from "./Pages/CommonPages/LoginRegistration";
import PageStructure from "./Pages/CommonPages/PageStructure";
import ClassPageStructure from "./Pages/CommonPages/ClassPageStructure";
import { Route, Routes } from "react-router-dom";


function App() {

  useEffect(()=>{
    Aos.init();
    Aos.refresh();
  },[])


  return (
    // <LoginRegistration actionType="Regist"/>
    // <PageStructure/>
    // <ClassPageStructure/>
    <Routes>
      <Route path="/login" element={<LoginRegistration actionType="login"/>}/>
      <Route path="/register" element={<LoginRegistration actionType="register"/>}/>
      <Route path="/" element={<PageStructure/>}/>
    </Routes>
  )
}

export default App
