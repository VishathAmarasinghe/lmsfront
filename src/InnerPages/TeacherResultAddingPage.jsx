import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import LoadingInnerPage from './LoadingInnerPage'
import TeacherResultTable from '../Components/TeacherComp/TeacherResultTable'
import { getResultHeadingForClass } from '../API'
import { useParams } from 'react-router-dom'
import ClassResultInfoModel from '../Components/TeacherComp/ClassResultInfoModel'

const TeacherResultAddingPage = () => {
  const {classID}=useParams();
  const [loading,setLoading]=useState(false);
  const [classResult,setClassResult]=useState([]);
  const [openingResultPanel,setOpeningResultPanel]=useState(false);
  const [selectedClassResult,setSelectedClassResult]=useState(null);


  useEffect(()=>{
    if (openingResultPanel==false) {
      fetchClassResults();
    }
   
  },[openingResultPanel])


  const fetchClassResults=async()=>{
    try {
      setLoading(true);
      const classResultinfo=await getResultHeadingForClass(classID);
      console.log("class reuslt info ",classResultinfo);
      const editedClassResult=classResultinfo?.data?.map((result)=>({
        ...result,
        publishDate:result.publishDate.substring(0,10)
      }))
      setClassResult(editedClassResult);
      setLoading(false);
    } catch (error) {
      message.error("class results fetching error!")
      console.log(error);
    }
  }


  const handleOpenPanel=(type)=>{
    if (type=="new") {
      setSelectedClassResult(null)
      setOpeningResultPanel(true);
    }else{

    }
  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Result Panel
      </h1>
    </div>

    <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className=" w-full mt-4 mb-2">
     
        <Button
          onClick={()=>handleOpenPanel("new")}
          className="flex flex-row justify-center items-center bg-blue-500 text-white font-medium ml-7 p-2 hover:bg-blue-600"
        >
          <PlusOutlined />
          
          Add New Result
        </Button>
      </div>
      <div className=" overflow-y-auto h-[90%] w-[95%]">
        <ClassResultInfoModel selectedClassResult={selectedClassResult} openingResultPanel={openingResultPanel} setOpeningResultPanel={setOpeningResultPanel}/>
        {
          loading?<LoadingInnerPage/>:<TeacherResultTable openingResultPanel={openingResultPanel} setOpeningResultPanel={setOpeningResultPanel} selectedClassResult={selectedClassResult} setSelectedClassResult={setSelectedClassResult} classResult={classResult}/>
          
        }
          
      </div>
    </div>
  </div>
  )
}

export default TeacherResultAddingPage