import React from "react";
import ClassPaymentBill from "../Components/Class/ClassPaymentBill";
import { lecturer } from "../assets";
import ClassPaymentCardSelection from "../Components/Class/ClassPaymentCardSelection";
import { Input } from "antd";

const ClassPayments = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center border-2 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] border-2 border-red-500  flex flex-row justify-between ">
        <div className="w-1/2 border-2 border-blue-700 flex flex-col justify-around items-center p-1 mt-2 bg-white rounded-lg">
          <div className="flex flex-row justify-around border-2 border-red-600 items-center">
            <div className="w-[30%]">
              <img src={lecturer} className="rounded-md" />
            </div>
            <div className="flex flex-col w-[50%] h-full  bg-[#C6CFFF] rounded-lg justify-center items-start">
              <p className="font-medium ml-4 text-[17px]">Student No: SE0123455</p>
              <p className="font-medium ml-4 text-[17px]">Student Name: Vishath Amarasinghe</p>
            </div>
          </div>
          <div className="w-full border-2 border-green-500">
            <div className="w-full">
              <p className="text-[17px] font-inter font-medium">
                Registered Classes
              </p>
            </div>
            <div className="border-2 border-red-600 w-full grid grid-cols-4">
              <ClassPaymentCardSelection />
              <ClassPaymentCardSelection />
              <ClassPaymentCardSelection />
              <ClassPaymentCardSelection />
              <ClassPaymentCardSelection />
            </div>
            <div>
              <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
                <p className="text-[16px] font-inter font-semibold">
                  Total Fee
                </p>
                <p className="text-[20px]">Rs:12345</p>
              </div>
              <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
                <p className="text-[16px] font-inter font-semibold">
                  Payment Amount
                </p>
                <Input value={"sd233301"}  className="w-[50%] text-right" />
              </div>
              <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
                <p className="text-[16px] font-inter font-semibold">
                  Balance
                </p>
                <p className="text-[20px]">Rs:12345</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] border-2 border-red-400 mt-2 bg-white flex flex-col items-center p-2 rounded-xl">
          <ClassPaymentBill />
          <div className="flex flex-col  w-full items-center mt-5">
           
            <button className="bg-green-700 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-green-800 rounded-lg scalar-card">
              Proceed Payment
            </button>
            <button className=" p-2 w-[96%] mb-2  text-red-700 border-2 border-red-700 font-bold hover:bg-red-700 hover:text-white rounded-lg scalar-card">
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPayments;
