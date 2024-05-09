import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllStudents } from '../API';
import LoadingInnerPage from './LoadingInnerPage';
import OwnerAndStaffStudentDetailTable from '../Components/Student/OwnerAndStaffStudentDetailTable';
import StudentProfileDrawer from '../Components/Student/StudentProfileDrawer';

const StaffAndOwnerStudentPanel = () => {
    const [studentData,setStudentData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [studentProfileOpener,setStudentProfileOpener]=useState({status:false,task:""});;
    const [selectedStudent,setSelectedStudent]=useState(null);

    useEffect(()=>{
        if (studentProfileOpener?.status==false) {
            fetchAllStudents();
        }
       
    },[studentProfileOpener])


    const fetchAllStudents=async()=>{
        try {
            setLoading(true)
            const studentResult=await getAllStudents();
            console.log("studentResult ",studentResult);
            if (studentResult.status==200) {
                const studentArray=studentResult?.data?.map((student)=>({
                    ...student,
                    photoName:student?.photo+")"+student?.firstName
                }))
                setStudentData(studentArray);
            }
           
            setLoading(false);
        } catch (error) {
            console.log("error in student fetching ",error);
            message.error("student data fetching error!")
        }
    }

  return (
    <div  className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
        <StudentProfileDrawer selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent}  openprofileeditingDrawer={studentProfileOpener} setProfileOpeneditingDrawer={setStudentProfileOpener} />
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Student Details
      </h1>
    </div>

    <div data-aos="fade-right" className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className='w-[95%] mt-2 overflow-y-auto '>
        {
            loading?<LoadingInnerPage/>:<OwnerAndStaffStudentDetailTable fetchAllStudents={fetchAllStudents} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} studentProfileOpener={studentProfileOpener} setStudentProfileOpener={setStudentProfileOpener} studentDetails={studentData} />
        }
      </div>
      
    </div>
  </div>
  )
}

export default StaffAndOwnerStudentPanel