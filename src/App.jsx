import "aos/dist/aos.css";
import Aos from "aos";

import { useEffect } from "react";
import LoginRegistration from "./Pages/CommonPages/LoginRegistration";


function App() {

  useEffect(()=>{
    Aos.init();
    Aos.refresh();
  },[])


  return (
    <LoginRegistration actionType="Regist"/>
  )
}

export default App
