import React, { useEffect, useState } from "react";
import TeacherPaymentCard from "../../../Components/Owner/TeacherPaymentCard";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const TeacherPaymentDetailReport = () => {
  const [teacherPaymentData, setTeacherPaymentData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serializedData = searchParams.get("data");

  useEffect(() => {
    const paymentDataResult=JSON.parse(decodeURIComponent(serializedData));
    console.log("payment result ",paymentDataResult);
    setTeacherPaymentData(paymentDataResult);
  }, []);



  return (
    <div className="m-2   rounded-md p-4 flex flex-col">
        <div className="w-full  bg-slate-300">
            <h1 className="font-bold text-[17px] text-center">Teacher Payment Analysis</h1>
            <p className="text-center text-[15px]">Savitha Education Institute</p>
            


        </div>
        <div>

       
      {teacherPaymentData?.map((teacherData) => (
        <TeacherPaymentCard
          key={teacherData?.teacherID}
          teacherData={teacherData}
        />
      ))}
       </div>
       <p className="text-[12px] text-right p-2 ">Generated at {dayjs().format("YYYY-MM-DD HH:mm:ss")}</p>
    </div>
  );
};

export default TeacherPaymentDetailReport;
