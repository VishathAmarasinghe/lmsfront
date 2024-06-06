import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Row, Select, Space, message } from "antd";
import { getAllClassesFullInfo, getAttendanceByClassIDandTimePeriod, getOverallAttendanceVisualization } from "../API";
import StaffOverallAttendanceChart from "../Components/Charts/StaffOverallAttendanceChart";
const { RangePicker } = DatePicker;

const StaffOwnerAttendanceInfo = () => {
  const [classList,setClassList]=useState(null);
  const [selectedClass,setSelectedClass]=useState(null);
  const [selectedDataRange,setSelectedDataRange]=useState(null);

  useEffect(()=>{
    handleGettingAllClasses();
  },[])


  useEffect(()=>{
      if (selectedDataRange!=null && selectedClass!=null) {
         
      }
  },[selectedDataRange,selectedClass])

  const fetchAttendanceData=async()=>{
    try {
      const fetchAttendanceData=await getAttendanceByClassIDandTimePeriod(selectedClass,selectedDataRange);
      console.log("fetch Attendance Resutl ",fetchAttendanceData);
    } catch (error) {
      console.log("attendance fetching error! ",error);
      message.error("Attendance fetching error!")
    }
  }


  const handleGettingAllClasses=async()=>{
    try {
      const classDetails=await getAllClassesFullInfo();
      console.log("class dtails  ",classDetails.data);
      const classListInfo=classDetails?.data?.map((clas)=>({
        value:clas?.classID,
        label:clas?.ClassName+" "+clas?.gradeName+" "+clas?.subjectName
      }))
      setClassList(classListInfo)
      console.log("final class list ",classListInfo);
    } catch (error) {
      message.error("Class Details getting error!")
    }
  }


    const handleChangeDates=async(date,dateRangeString)=>{
        console.log("selected date range  is ",dateRangeString);
        try {
            const result=await getOverallAttendanceVisualization(dateRangeString[0],dateRangeString[1]);
            setSelectedDataRange(`${dateRangeString[0]}_${dateRangeString[1]}`);
            console.log("result is ",result);
        } catch (error) {
            console.log("error ",error);
        }
    }


    const classSelectionHandle=(value)=>{
      console.log("selected class  ",value);
      setSelectedClass(value);
    }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Attendance Infomation
        </h1>
      </div>

      <div
        data-aos="fade-right"
        className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300"
      >
        <div className="border-2 border-red-500 flex flex-col w-[95%] h-[95%] mt-3">
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
            <Form.Item
              name="Profile Picture"
              label="Select Date Range to evaluate"
            >
                <RangePicker onChange={handleChangeDates}/>
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
              
              label="Select Class"
            >
              <Select onChange={classSelectionHandle} options={classList}/>
            </Form.Item>
            </Col>
            </Row>
          </Form>
        <div className="w-full h-[50%] border-2 border-red-500">
            <StaffOverallAttendanceChart />
        </div>
        </div>
      </div>
    </div>
  );
};

export default StaffOwnerAttendanceInfo;
