import "aos/dist/aos.css";
import Aos from "aos";
import Login from './Pages/CommonPages/Login'
import { useEffect } from "react";

function App() {

  useEffect(()=>{
    Aos.init();
    Aos.refresh();
  },[])


  return (
    <Login/>
  )
}

export default App
