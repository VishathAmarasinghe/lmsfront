import React, { useEffect, useState } from 'react'
import TeacherTable from '../Components/TeacherComp/TeacherTable'
import { Button, message } from 'antd'
import LoadingInnerPage from './LoadingInnerPage'
import { PlusOutlined } from '@ant-design/icons'
import { getAllTeachersInfo } from '../API'

const OwnerPageTeacherPanel = () => {
  const [loading,setLoading]=useState(true);
  const [teacherData,setTeacherData]=useState([]);
  const [openeditingDrawer, setOpeneditingDrawer] = useState({
    status:false,
    task:""
  });


  useEffect(()=>{
    if(openeditingDrawer.status==false){
      fetchTeacherInfo();
    }
   
  },[openeditingDrawer])


  const fetchTeacherInfo=async()=>{
    setLoading(true);
    try {

      const teacherResult=await getAllTeachersInfo();
      console.log("teacher result ",teacherResult.data);
      const teacherDataArray = teacherResult.data.map((teacher) => ({
        ...teacher,
        photoName: `${teacher.photo})${teacher.firstName}`,

      }));
      
      console.log("teacher Array ",teacherDataArray);
      setTeacherData(teacherDataArray);
      setLoading(false);

    } catch (error) {
      console.log("error ",error);
      message.error("Teacher Data fetching Error!")
    }
  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Teacher Panel
      </h1>
    </div>

    <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className=" w-full mt-4 mb-2">
     
        <Button
          onClick={()=>setOpeneditingDrawer({...openeditingDrawer,status:true,task:"Create"})}
          className="flex flex-row justify-center items-center bg-blue-500 text-white font-medium ml-7 p-2 hover:bg-blue-600"
        >
          <PlusOutlined />
          
          Add New Teacher
        </Button>
      </div>
      <div className=" overflow-y-auto h-[90%] w-[95%]">
        {
          loading?<LoadingInnerPage/>:<TeacherTable fetchTeacherInfo={fetchTeacherInfo} openeditingDrawer={openeditingDrawer} setOpeneditingDrawer={setOpeneditingDrawer}  teacherData={teacherData} setTeacherData={setTeacherData}/>
          
        }
          
      </div>
    </div>
  </div>
  )
}

export default OwnerPageTeacherPanel