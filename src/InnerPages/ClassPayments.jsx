import React, { useEffect, useRef, useState } from "react";
import ClassPaymentBill from "../Components/Class/ClassPaymentBill";
import { lecturer } from "../assets";
import ClassPaymentCardSelection from "../Components/Class/ClassPaymentCardSelection";
import { Descriptions, Input,Button } from "antd";
import StudentScanOrSearchCard from "../Components/Class/StudentScanOrSearchCard";
import ClassPaymentBillList from "../Components/Payments/ClassPaymentBillList";
import { useDispatch } from "react-redux";
import { classPaymentSelectedClasses } from "../Actions/payment";

const ClassPayments = () => {
  const [selectedStudent, setSelectedStudent]=useState(null);
  const studentScanOrSeachCardRef=useRef(null);
  
  
  const [paymentProceedClicked,setPaymentProceedClicked]=useState(false);


  const dispatch=useDispatch();

  useEffect(()=>{
    if (paymentProceedClicked==false) {
      dispatch(classPaymentSelectedClasses([]))
      setSelectedStudent(null);
    }
  },[paymentProceedClicked])


  const handlePaymentProceed=()=>{
    console.log("paymend proceed button clicked");
    setPaymentProceedClicked(true);
    studentScanOrSeachCardRef.current.focus();
  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
        
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Class Fees Payment
        </h1>
      </div>
      <div className="w-[95%] bg-white h-[90%] border-2 border-red-600 flex flex-row lg:flex-row justify-between rounded-xl  p-1 shadow-xl ring-1 ring-gray-300">
        <div className=' shadow-xl p-2 rounded-xl  w-[58%]'>
          <StudentScanOrSearchCard ref={studentScanOrSeachCardRef} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />
        </div>
        <div className=' w-[40%] bg-white   shadow-xl border-l-2 border-slate-400 p-2 flex flex-col justify-between'>
        <div className='w-full  h-[100%] p-2  '>
          <div className="w-full h-[80%]">

      
          {/* <h1 className='text-gray-500 text-[16px]'>Bill</h1> */}
          <ClassPaymentBillList paymentProceedClicked={paymentProceedClicked} setPaymentProceedClicked={setPaymentProceedClicked}   selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent}/>
          </div>
          
          <div className='w-full h-[20%] mt-2'>
            <button onClick={handlePaymentProceed}  className='bg-green-600 text-white hover:bg-green-700 p-2 w-full rounded-lg mt-2'>
                Proceed Payment
            </button>
            <Button  type='primary' className='border-2 border-slate-400  text-slate-500 hover:bg-slate-400 hover:text-white w-full rounded-lg mt-2'>
                Cancel
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ClassPayments;
