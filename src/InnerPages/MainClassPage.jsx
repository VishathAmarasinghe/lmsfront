import React, { useEffect, useState } from "react";
import ClassCard from "../Components/Class/ClassCard";
import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import ClassAddingDrawer from "../Components/Class/ClassAddingDrawer";
import ClassAddingModel from "../Components/Class/ClassAddingModel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainClassPage = () => {
  const classes=useSelector(state=>state.classes.teacherClasses);
  
    const [addingCompOpen,setAddingCompOpen]=useState(false);

  
    useEffect(()=>{
      console.log("teacher classes ",classes);
    },[])
  return (
    <div className="w-full h-[100%] flex flex-col items-center border-2 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] border-2 border-red-500   ">
        <div className="w-full my-3 border-2 border-green-600 h-10">
            <button  className="bg-blue-700 p-2 text-white rounded-md" onClick={()=>setAddingCompOpen(true)} >
                <div className="flex flex-row">
                    <PlusOutlined/>
                <p className="ml-2">Add New Class</p>
                </div>
                
            </button>
        </div>
        <div className="w-full border-2 border-yellow-500 grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 my-2" >
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
