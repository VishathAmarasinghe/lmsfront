import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAttendanceDataByDateAndClass } from '../../API';
import { getCurrentDateInSQLFormat } from '../../Utils/defaultValues';
import { useDispatch } from 'react-redux';
import { change_page_number } from '../../Actions/PageNumbers';

const AttendanceMarkingStats = ({classData, totalNumber, finalStatOpen, setFinalStatOpen }) => {
    const [numberOfAttendance,setNumberOFAttendance]=useState(0);
    const dispatch=useDispatch();




    const handleCancel = () => {
        setFinalStatOpen(false);
        dispatch(change_page_number("34"))
    };


    useEffect(()=>{
        if (finalStatOpen==true) {
            fetchAttendanceTotals();
        }
    },[finalStatOpen])




    const fetchAttendanceTotals=async()=>{
        const attendanceResult=await getAttendanceDataByDateAndClass(classData.classID,getCurrentDateInSQLFormat());
        console.log("attendance result ",attendanceResult);
        setNumberOFAttendance(attendanceResult.data?.length)
        console.log("number of adat ",attendanceResult.data?.length);
    }


    const ClassInfo=({classData})=>{
        return (
            <div className='flex flex-row w-full  justify-between'>
                <p className='text-[15px] font-medium'>{classData.name}</p>
                <p>{classData.value}</p>
            </div>
        )
    }


    const classDescriptionData=[
        {
            name:"Class ID",
            value:classData.classID
        },
        {
            name:"Class Name",
            value:classData.ClassName
        },
        {
            name:"Attendance Date",
            value:getCurrentDateInSQLFormat()
        },


    ]

    return (

        
        <Modal
            title="Attendance Marking Summary"
            open={finalStatOpen}
            onCancel={handleCancel}
            footer={[
                <button
                    key="ok"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCancel}
                >
                    OK
                </button>,
            ]}
        >

            <div className='boder-2 border-red-500 w-full flex flex-col lg:flex-row justify-between'>
                <div className='w-full lg:w-[50%] bg-[#EBEEFF] p-2 rounded-md'>
                    {
                        classDescriptionData.map((classinfos,index)=>
                        <ClassInfo key={index} classData={classinfos} />
                        )
                    }
                </div>
                <div className='w-full lg:w-[45%] bg-[#c0ffa7] p-2 rounded-md flex flex-col justify-center items-center'>
                    <h1 className='text-[35px] font-semibold'>
                        {numberOfAttendance}/{totalNumber}
                    </h1>
                    <p>Total Attendance</p>

                </div>
            </div>

           
        </Modal>
    );
};

export default AttendanceMarkingStats;
