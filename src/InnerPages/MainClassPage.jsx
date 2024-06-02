import React, { useEffect, useState } from "react";
import ClassCard from "../Components/Class/ClassCard";
import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import ClassAddingDrawer from "../Components/Class/ClassAddingDrawer";
import ClassAddingModel from "../Components/Class/ClassAddingModel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassesForSelectedStudent } from "../API";

const MainClassPage = () => {
  const user=JSON.parse(localStorage.getItem("profile")).result;
  const classeData=useSelector(state=>state.classes.teacherClasses);

  const [classes,setClasses]=useState([]);

  
  const [addingCompOpen,setAddingCompOpen]=useState(false);

  useEffect(()=>{
    if(user?.role=="teacher"){
      setClasses(classeData);
    }else if(user?.role=="student"){
      fetchStudentClasses();
    }
      console.log("teacher classes are ",classes);
  },[])

  const fetchStudentClasses=async()=>{
    const classResult=await getClassesForSelectedStudent(user.UserID);
    console.log("class Results ",classResult.data);
    setClasses(classResult.data);
  }



  return (
    <div className="w-full h-[100%] flex flex-col items-center   shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] mt-3  h-[95%] overflow-y-auto  ">
        {
          user?.role=="teacher"?<div className="w-full my-3  h-10 ">
          <button  className="bg-blue-700 p-2 text-white rounded-md" onClick={()=>setAddingCompOpen(true)} >
              <div className="flex flex-row">
                  <PlusOutlined/>
              <p className="ml-2">Add New Class</p>
              </div>
              
          </button>
      </div>:<></>
        }
        
        <div className="w-full  grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 my-2" >
        {
            classes.map((classItem) => (
              <ClassCard  key={classItem.classID} classinfo={classItem} />
            ))
          }
          
        </div>
      </div>
      {/* <ClassAddingDrawer addingCompOpen={addingCompOpen} setAddingCompOpen={setAddingCompOpen}/> */}
      <ClassAddingModel addingCompOpen={addingCompOpen} setAddingCompOpen={setAddingCompOpen}/>

    </div>
  );
};

export default MainClassPage;
