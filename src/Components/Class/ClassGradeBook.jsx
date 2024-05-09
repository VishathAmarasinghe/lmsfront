import React, { useEffect, useState } from 'react'
import StudentGradeBookTable from '../GradeBook/StudentGradeBookTable'
import { message } from 'antd';
import { getResultForSpecificStudentByClass } from '../../API';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const ClassGradeBook = () => {
    const activeUser=JSON.parse(localStorage.getItem("profile"))?.result;
    const {classID}=useParams();
    const [studentResult,setStudentResult]=useState(null);

    useEffect(()=>{
        fetchResultForStudent();
    },[])


    const fetchResultForStudent=async()=>{
        try {
            const resultInfo=await getResultForSpecificStudentByClass(activeUser?.UserID,classID);
            console.log("class studebt result ",resultInfo);
            const studentResultArray=resultInfo.data?.map((res)=>({
                ...res,
                key:res?.resultID,
                publishDate:dayjs(res?.publishDate).format("YYYY-MM-DD")
            }))
            setStudentResult(studentResultArray);
        } catch (error) {
            console.log("error ",error);
            message.error("Student result Fetching error!")
        }
    }
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Grade Book
        </h1>
      </div>

      <div
        data-aos="fade-right"
        className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300"
      >
        <div className="w-[95%] mt-2 overflow-y-auto ">

        <div className='w-[95%] mt-3'>
<StudentGradeBookTable studentResult={studentResult}/>
</div>
            
        </div>
      </div>
    </div>
  )
}

export default ClassGradeBook




