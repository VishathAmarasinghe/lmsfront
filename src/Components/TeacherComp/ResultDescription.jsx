import React, { useEffect, useState } from 'react';
import { Badge, Descriptions, Input, message } from 'antd';
import { studentResultsByResultID, updateResults } from '../../API';
import IndividualClassResultAddingModel from './IndividualClassResultAddingModel';

const ResultDescription = ({ selectedClassResult, editing, setEditing,studentResultList,setStudentResultList }) => {
  const [title, setTitle] = useState(selectedClassResult?.resultTitle || '');


  useEffect(()=>{
    if (selectedClassResult!=null ) {
      fetchStudntResults();
    }
  },[selectedClassResult])


  const fetchStudntResults=async()=>{
    try {
      const studentResult=await studentResultsByResultID(selectedClassResult?.resultID);
      console.log("studdent result  ",studentResult);
      console.log("student list pervious result  ",studentResultList);
      const updatedList = studentResultList?.map(student => {
        const update = studentResult?.data.find(update => update.studentID === student.UserID);
        if (update) {
          return { ...student, mark: update.mark, markFeedback: update.markfeedback };
        }
        return student;
      });
  
      setStudentResultList(updatedList);
      
    } catch (error) {
      console.log("error ",error);
      message.error("Student Results fetching error!")
    }
  }



  const updateResultsInfo=async()=>{
    try {
      const resultData={
        title:title,
        resultID:selectedClassResult?.resultID,
        studentResultList
      }
      const updateStatus=await updateResults(resultData);
      if (updateStatus.status==200) {
        message.success("Result Updated Successfully!")
      }
    } catch (error) {
      message.error("Result updation error!");
      console.log("error ",error);
    }
  }





  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const items = [
    {
      key: '1',
      label: 'Result ID',
      children: selectedClassResult?.resultID,
    },
    {
      key: '2',
      label: 'Publish Date',
      children: selectedClassResult?.publishDate.substring(0, 10),
    },
    {
      key: '3',
      label: 'class ID',
      children: selectedClassResult?.classID,
    },
    {
      key: '4',
      label: 'Result Title',
      children: editing ? (
        <Input value={title} onChange={handleTitleChange} />
      ) : (
        selectedClassResult?.resultTitle
      ),
    },
  ];

  return (
  <div className='w-full'>
      <Descriptions layout="horizontal" bordered items={items} />
      <IndividualClassResultAddingModel setStudentResultList={setStudentResultList} studentResultList={studentResultList}/>
      <div className='w-full flex flex-row justify-end'>
        <button onClick={updateResultsInfo} className='bg-blue-500 hover:bg-blue-600 p-2 rounded-lg text-white'>Update/Save Result</button>
      </div>
  </div>
  )
 ;
};

export default ResultDescription;
