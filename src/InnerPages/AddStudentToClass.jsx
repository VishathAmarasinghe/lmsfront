import React, { useEffect, useState } from 'react';
import AddStudentClassCard from '../Components/Class/AddStudentClassCard';
import StudentScanOrSearchCard from '../Components/Class/StudentScanOrSearchCard';
import { getClassesForNotSelectedStudent } from '../API';
import { Button, Empty, message } from 'antd';
import StudentAddingToClassesPopup from '../Components/Class/StudentAddingToClassesPopup';
import { useDispatch } from 'react-redux';
import { getNotAvailableClassesforSpecificStudent } from '../Actions/class';
import { useSelector } from 'react-redux';
import { change_page_number } from '../Actions/PageNumbers';


const AddStudentToClass = () => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newSelectedClasses,setNewSelectedClasses] = useState([]);
  const [modelOpen,setModelOpen]=useState(false);
  const studentClassesNotAvailable=useSelector((state)=>state.classes.studentClassesNotAvailable)
  const dispatch=useDispatch();
  

  useEffect(() => {
    handleFetchingClasses();
  }, [selectedStudent]);


  useEffect(()=>{
      if (studentClassesNotAvailable!=null) {
        setAvailableClasses(studentClassesNotAvailable);
      }
  },[studentClassesNotAvailable])

  const handleFetchingClasses = async () => {
    try {

      
      dispatch(getNotAvailableClassesforSpecificStudent(selectedStudent?.data?.UserID,message))
      console.log("student classes not available ",studentClassesNotAvailable);
      const classes = studentClassesNotAvailable || [];
      setAvailableClasses(classes);
      
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };


  const handleAddingNewClasses=()=>{
    if (newSelectedClasses.length > 0) {
      setModelOpen(true);
    }else{
      message.warning("please select classes to add")
    }
  }

  const cancelProcess=()=>{
    dispatch(change_page_number("16"))
  }

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
        <StudentAddingToClassesPopup modelOpen={modelOpen} setModelOpen={setModelOpen} newSelectedClasses={newSelectedClasses} selectedStudent={selectedStudent}/>
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Add Student to Class
        </h1>
      </div>
      <div className="w-[95%] h-[90%]  flex flex-row lg:flex-row justify-around rounded-xl bg-white p-1 shadow-xl ring-1 ring-gray-300">
        <div className=' w-[50%]'>
          <StudentScanOrSearchCard selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />
        </div>
        <div className=' w-[40%] p-2 flex flex-col justify-between'>
        <div className='w-full  h-[90%] '>
          <h1 className='text-gray-500 text-[16px]'>Classes</h1>
          <div className='grid grid-cols-2 2 max-h-[85%]  w-full overflow-y-auto'>
            {availableClasses.length === 0 || availableClasses === null ? (
              <Empty description="Class Data not available" className='text-slate-400'/>
            ) : (
              availableClasses.map((classItem, index) => (
                <AddStudentClassCard key={classItem?.classID} selectedStudent={selectedStudent} assignType="selectedClass" classItem={classItem} newSelectedClasses={newSelectedClasses} setNewSelectedClasses={setNewSelectedClasses} color={"blue"} />
              ))
            )}
          </div>
          </div>
          <div className='w-full'>
            <button onClick={handleAddingNewClasses} className='bg-green-600 text-white hover:bg-green-700 p-2 w-full rounded-lg mt-2'>
                Add Selected Classes
            </button>
            <Button onClick={cancelProcess} type='primary' className='border-2 border-slate-400  text-slate-500 hover:bg-slate-400 hover:text-white w-full rounded-lg mt-2'>
                Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentToClass;
