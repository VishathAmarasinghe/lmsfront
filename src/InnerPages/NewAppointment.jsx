
import React from "react";
import DropdownSelector from "../Components/AppointmentComp/DropdownSelector";
import DatePickerComp from "../Components/AppointmentComp/DatePicker";
import TimePickercomp from "../Components/AppointmentComp/TimePicker";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const NewAppointment = () => {

  return (
    <div className="w-full h-[100%] flex flex-col items-center bg-white shadow-2xl rounded-2xl overflow-y-auto  ">
      <h1 className="text-2xl text-center my-3 font-semibold">New Appointment</h1>
      <div className="w-full p-2  flex flex-col md:flex-row justify-around items-center">
        <DropdownSelector titleName={"Select Student"}/>
        <DropdownSelector titleName={"Select Subject"}/>
      </div>
      <div className="w-full p-2  flex flex-col md:flex-row justify-around items-center ">
        <DropdownSelector titleName={"Select Student"}/>
        <DropdownSelector titleName={"Select Subject"}/>
      </div>
      <div className="w-full p-2  flex flex-col md:flex-row justify-around items-center ">
        <DatePickerComp titleName={"Select Date"}/>
        <TimePickercomp titleName={"Select time"}/>
      </div>
      <div className="w-full p-2  flex flex-col md:flex-row justify-around items-center ">
        <div className="w-full  flex flex-col md:flex-row justify-between my-1 items-start  md:w-[90%]">
            <p className="font-inter font-semibold mr-14 my-2">Title(Reason)</p>
            <Input className="bg-[#EBEEFF] w-full md:w-[82%]" variant="filled"/>
        </div>
      </div>
      <div className="w-full p-2  flex flex-col md:flex-row justify-around items-center ">
        <div className="w-full  flex flex-col md:flex-row justify-between my-1 items-start  md:w-[90%]">
            <p className="font-inter font-semibold mr-14">Description</p>
            <TextArea rows={3} className="bg-[#EBEEFF] w-full md:w-[82%]" variant="filled"/>
        </div>
      </div>
      <div className="w-full md:w-[90%] p-2  flex flex-col md:flex-row justify-center md:justify-end items-center md:items-end ">
        <button className="w-[90%] md:w-[20%] bg-[#5B6BD4] text-white font-medium hover:text-[15px]  p-2 rounded-xl">Submit Appointment</button>
      </div>
    </div>
  );
};

export default NewAppointment;
