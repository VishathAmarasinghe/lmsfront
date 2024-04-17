import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";

const ClassHeaderPageStructure = () => {
  const selectedClass=useSelector((state)=>state?.classes?.selectedClass);

  console.log("selected class in header ",selectedClass);
  return (
    <div className=" w-full">
      <div className="w-full  bg-[#4551A1]">
   
        <h1 className="text-[23px] text-white font-inter font-semibold ml-1">{selectedClass?.classID} - {selectedClass?.gradeName} - {selectedClass?.subjectName}</h1>
      </div>
    </div>
  );
};

export default ClassHeaderPageStructure;
