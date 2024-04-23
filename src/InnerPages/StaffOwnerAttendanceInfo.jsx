import React from "react";
import { Col, DatePicker, Form, Row, Space } from "antd";
import { getOverallAttendanceVisualization } from "../API";
import StaffOverallAttendanceChart from "../Components/Charts/StaffOverallAttendanceChart";
const { RangePicker } = DatePicker;

const StaffOwnerAttendanceInfo = () => {


    const handleChangeDates=async(date,dateRangeString)=>{
        console.log("selected date range  is ",dateRangeString);
        try {
            const result=await getOverallAttendanceVisualization(dateRangeString[0],dateRangeString[1]);
            console.log("result is ",result);
        } catch (error) {
            console.log("error ",error);
        }
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
            <Form.Item
              name="Profile Picture"
              label="Select Date Range to evaluate"
            >
                <RangePicker onChange={handleChangeDates}/>
            </Form.Item>
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
