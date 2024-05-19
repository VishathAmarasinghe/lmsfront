import React, { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import { formatBarcode } from "../../Utils/Validations";

const StudentCard = ({ studentData, barCode }) => {
  useEffect(() => {
    JsBarcode("#barcode", barCode, {
      format: "CODE128", 
      height: 25,
    });
  }, [barCode]);

  return (
    <div
      id="studentCard"
      style={{
        width: "8.5cm",
        height: "5.5cm",
       
      }}
      className="flex flex-col mb-2 border-2 border-black"
    >
      <div className="w-full flex flex-col justify-center items-center p-1 bg-[#5B6BD4]">
        <h1 className="font-inter font-semibold text-[15px] text-white">
          Savitha Education Institute
        </h1>
        <p className="text-white font-inter text-[10px] font-normal">
          Tel: 0112894233, 0713234566
        </p>
      </div>
      <div className="flex flex-row h-full items-center justify-around bg-white">
        <div className="flex flex-col w-[35%] h-full justify-center items-center">
          <img
            src={`http://localhost:5000/${studentData?.photo}`}
            alt="student"
            className=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
        <div className="w-[60%] flex flex-col items-center justify-center">
          <div className="flex flex-row w-full justify-around mt-2">
            <p className="font-inter font-semibold">Student No</p>
            <p className="font-inter">
              {studentData?.UserID + "/" + studentData?.studentID}
            </p>
          </div>
          <div className="flex flex-row w-full justify-around mt-2">
            <p className="font-inter font-semibold">Student Name</p>
            <p className="font-inter">{studentData?.firstName}</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <svg id="barcode" />
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-[#5B6BD4]"></div>
    </div>
  );
};

export default StudentCard;
