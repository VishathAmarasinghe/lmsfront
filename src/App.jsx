import "aos/dist/aos.css";
import Aos from "aos";

import { useEffect } from "react";
import LoginRegistration from "./Pages/CommonPages/LoginRegistration";
import PageStructure from "./Pages/CommonPages/PageStructure";


function App() {

  useEffect(()=>{
    Aos.init();
    Aos.refresh();
  },[])


  return (
    // <LoginRegistration actionType="Regist"/>
    <PageStructure/>
  )
}

export default App
