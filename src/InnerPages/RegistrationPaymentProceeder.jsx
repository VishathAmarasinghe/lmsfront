import { Col, Form, Input, Row } from "antd";
import React from "react";
import StudentCard from "../Components/Registration/StudentCard";
import RegistationBill from "../Components/Registration/RegistationBill";

const RegistrationPaymentProceeder = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center border-2 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] border-2 border-red-500  flex flex-row justify-between ">
        <div className="w-1/2 border-2 border-blue-700 flex flex-col justify-center items-center p-1 mt-2 bg-white rounded-lg">
          <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
            <p className="text-[16px] font-inter font-semibold">Student Number</p>
            <Input value={"sd233301"} disabled className="w-[50%]" />
          </div>
          <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
            <p className="text-[16px] font-inter font-semibold">Student Name</p>
            <Input value={"sd233301"} disabled className="w-[50%]" />
          </div>
          <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
            <p className="text-[16px] font-inter font-semibold">Registration Fee</p>
            <Input value={"sd233301"} disabled className="w-[50%]" />
          </div>
          <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
            <p className="text-[16px] font-inter font-semibold">Payment</p>
            <Input value={"sd233301"}  className="w-[50%]" />
          </div>
          <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
            <p className="text-[16px] font-inter font-semibold">Balance</p>
            <Input value={"sd233301"} disabled className="w-[50%]" />
          </div>

          <div className="w-[70%] mt-4 border-2 border-red-600 flec ">
            <StudentCard/>
          </div>


          
        </div>
        <div className="w-[40%] border-2 border-red-400 mt-2 bg-white flex flex-col items-center p-2 rounded-xl">
            <RegistationBill/>
            <div className="flex flex-col  w-full items-center mt-5">
              <button className="bg-blue-500 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-blue-600 rounded-lg scalar-card">Print Card</button>
              <button className="bg-green-700 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-green-800 rounded-lg scalar-card">Proceed Payment</button>
              <button className=" p-2 w-[96%] mb-2  text-red-700 border-2 border-red-700 font-bold hover:bg-red-700 hover:text-white rounded-lg scalar-card">Cancle</button>
            </div>
        </div>
       
      </div>
    </div>
  );
};

export default RegistrationPaymentProceeder;
