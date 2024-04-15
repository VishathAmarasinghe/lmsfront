import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import LoadingPage from '../Pages/CommonPages/LoadingPage';
import OwnerClassTable from '../Components/Class/OwnerClassTable';
import { getAllClassesFullInfo } from '../API';
import LoadingInnerPage from './LoadingInnerPage';

const OwnerClassPanel = () => {
  const [loading,setLoading]=useState(false);
  const [classData,setClassData]=useState([]);
  const [classDetailedPanelOpen,setClassDetailedPanelOpen]=useState(false);


  useEffect(()=>{
      fetchClassInfo();
  },[])

  const fetchClassInfo=async()=>{
    try {
      setLoading(true)
      const classResult=await getAllClassesFullInfo();
      console.log("class full result is ",classResult);
      setClassData(classResult.data);
      setLoading(false);
    } catch (error) {
      message.error("class Data fetching Error!")
    }
   
  }



  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Classes
      </h1>
    </div>

    <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
    <div className=" overflow-y-auto h-[90%] w-[95%] mt-5">
      {
        loading?<LoadingInnerPage/>:<OwnerClassTable classData={classData} classDetailedPanelOpen={classDetailedPanelOpen} setClassDetailedPanelOpen={setClassDetailedPanelOpen}/>
      }
    </div>
    </div>
  </div>
  )
}

export default OwnerClassPanel