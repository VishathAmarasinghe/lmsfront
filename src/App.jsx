import "aos/dist/aos.css";
import Aos from "aos";
import { thunk } from "redux-thunk";
import { reducers } from "./Reducers/index";

import { useEffect } from "react";
import LoginRegistration from "./Pages/CommonPages/LoginRegistration";
import PageStructure from "./Pages/CommonPages/PageStructure";
import ClassPageStructure from "./Pages/CommonPages/ClassPageStructure";
import { Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";


function App() {

  useEffect(()=>{
    Aos.init();
    Aos.refresh();
  },[])


  const store=configureStore({
    reducer:reducers,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
  })



  return (
    // <LoginRegistration actionType="Regist"/>
    // <PageStructure/>
    // <ClassPageStructure/>
    <Provider store={store}>
    <Routes>
      <Route path="/login" element={<LoginRegistration actionType="login"/>}/>
      <Route path="/register" element={<LoginRegistration actionType="register"/>}/>
      <Route path="/" element={<PageStructure/>}/>
    </Routes>
    </Provider>
  )
}

export default App
