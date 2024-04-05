import React, { useEffect, useState } from 'react'
import { Badge, Descriptions, Empty } from 'antd';
import AddStudentClassCard from './AddStudentClassCard';
import { getClassesForSelectedStudent } from '../../API';

const StudentMiniProfile = ({selectedStudent}) => {
    const [assignedClasses,SetAssignedClasses]=useState([]);
    const [assignedClassArray,setAssignedClassArray]=useState([]);
    useEffect(()=>{
            fetchStudentAssignedClasses();
    },[selectedStudent])

    const fetchStudentAssignedClasses = async() =>{
        const classResult=await getClassesForSelectedStudent(selectedStudent?.data?.UserID)
        console.log("class Result: " + classResult);
        SetAssignedClasses(classResult.data);
    }
    const items = [
       
        {
          key: '1',
          label:  <img
          src={`http://localhost:5000/${selectedStudent.data.photo}`}
          alt="student"
          className="w-[100px] rounded-md"
        />,
        span: 4,
          children: '',
        },
        {
          key: '2',
          label: 'User ID',
          span:2,
          children: `${selectedStudent.data.UserID}`,
        },
        {
            key: '3',
            label: 'Student ID',
            span:2,
            children: `${selectedStudent.data.studentID}`,
          },
          {
            key: '4',
            label: 'First Name',
            span:2,
            children: `${selectedStudent.data.firstName}`,
          },
          {
            key: '5',
            label: 'Last Name',
            span:2,
            children: `${selectedStudent.data.lastName}`,
          },
              
      ];
    console.log(selectedStudent.data);
  return (
    <div>
    <Descriptions labelStyle={{fontWeight:"bold"}} title="User Info" layout="horizontal" bordered items={items} />
    <div className='w-full border-2 border-yellow-400'>
        <p className='text-[16px] font-medium'>Assigned Classes</p>
        <div className='grid grid-cols-3'>
        {assignedClasses.length === 0 || assignedClasses === null ? (
              <Empty description="Class Data not available" className='text-slate-400'/>
            ) : (
              assignedClasses.map((classItem, index) => (
                <AddStudentClassCard key={classItem?.classID} assignType="assign" classItem={classItem} color={"green"} newSelectedClasses={assignedClassArray} setNewSelectedClasses={setAssignedClassArray} />
              ))
            )}
        </div>
    </div>
    </div>
  )
}

export default StudentMiniProfile