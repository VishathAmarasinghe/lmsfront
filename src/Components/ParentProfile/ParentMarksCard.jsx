import React from "react";
import { BarIndicator, CircleIndicator } from "react-indicators";

const ParentMarksCard = ({ TitleText, classPlace,value,studentCount }) => {
  return (
    <div data-aos="fade-up" className="w-full h-[150px] lg:w-[30%] border-2  border-[#5B6BD4]  flex flex-col justify-center items-center bg-[#EBEEFF] hover:bg-[#CCD4FF] rounded-lg">
      <p className="text-[15px] mt-2 text-slate-600 font-medium">{TitleText}</p>

      {classPlace == null ? (
        <div className="w-full flex flex-col justify-center items-center p-2 mb-2">
          <CircleIndicator
            className="scalar-card"
            key={1}
            progress={parseFloat(value)/100}
            size={100}
            stroke="#5B6BD4"
            strokeWidth={5}
            strokeBackground="#CECECE"
          />
          <span className="absolute text-[25px] font-medium">{value}{studentCount!=null?"/"+studentCount:"%"}</span>
        </div>
      ) : (
        <div className="w-full h-full  flex flex-col justify-center items-center">

            
          <p className="text-[40px] font-medium text-[#5B6BD4] ">{classPlace}</p>
        </div>
      )}
    </div>
  );
};

export default ParentMarksCard;
