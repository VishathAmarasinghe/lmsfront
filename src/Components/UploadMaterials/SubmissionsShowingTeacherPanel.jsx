import { Tag, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { downloadAllSubmissions, getStudentResultAddingSheetAsExcel, getStudentSubmissionsByPanel } from '../../API';
import AssignmentSubmittedStudentTable from './AssignmentSubmittedStudentTable';
import { useSelector } from 'react-redux';

const SubmissionsShowingTeacherPanel = ({submissionData,allSubmissions}) => {
    console.log("submissionss areeee ",submissionData);
    console.log("all submissions ",allSubmissions);
    const [studentList,setStudentList]=useState([]);

    const classInside = useSelector((state) => state.classes.selectedClass);

    useEffect(()=>{
      if (classInside!=null) {
        const studentIDList=classInside?.students?.map((stu)=>stu?.studentID);
        console.log("class inside ",classInside);
        console.log("class studnt id list ",studentIDList);
        setStudentList(studentIDList);
      }
    },[classInside])
    


    const handleDownloadAllSubmissions = async () => {
      try {
        
        const downloadableResult = await downloadAllSubmissions(submissionData?.panelID);
        console.log("Downloadable result:", downloadableResult);
    
        if (downloadableResult.status === 200) {
          const blob = downloadableResult.data;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${submissionData?.panelID}_Submissions.zip`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        message.error("All submissions downloading error!");
        console.log("Error:", error);
      }
    };


    const handleDownloadStudentSheet = async () => {
      try {
        if (studentList.length==0) {
          return message.warning("No students in the class!")
        }
        const studentSheetResult = await getStudentResultAddingSheetAsExcel(studentList);
        console.log("studenr sheet result ", studentSheetResult);
  
        const blob = new Blob([studentSheetResult.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
  
        
        const url = window.URL.createObjectURL(blob);
  
        
        const link = document.createElement("a");
        link.href = url;
        link.download = "studentsResultSheet.xlsx";
  
      
        document.body.appendChild(link);
        link.click();
  
       
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log("student sheet downloading error", error);
        message.error("student sheet downloading error!");
      }
    };

    


  return (
    <div className='w-full flex flex-col '>
        <div className='w-full flex flex-row  '>
          <div className='w-full flex flex-row justify-between  my-2'>
          <div className='w-[50%] flex flex-row '>
            <p className='font-medium text-[15px]'>Current Total Submissions : </p>
            <p className='font-bold text-[15px]'>{allSubmissions.length}</p>
          </div>
          <div>
          <Tag onClick={handleDownloadStudentSheet} className='bg-blue-500 hover:bg-blue-600 text-white'>
            Download Student Bulk Result Adding Sheet
          </Tag>
          {
            allSubmissions?.length>0?<Tag onClick={handleDownloadAllSubmissions} className='bg-green-600  text-white  rounded-md hover:bg-green-700'>
            Download All submissions
          </Tag>:<></>
          }
          </div>
          
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <AssignmentSubmittedStudentTable allStudentSubmissions={allSubmissions}/>

        </div>
    </div>
  )
}

export default SubmissionsShowingTeacherPanel