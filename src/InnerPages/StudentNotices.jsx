import React from "react";
import NoticeCard from "../Components/Student/NoticeCard";

const StudentNotices = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center  border-2 mt-3 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] border-2 border-red-500  flex flex-col justify-between ">
        <NoticeCard/>
        <NoticeCard/>
        <NoticeCard/>
        <NoticeCard/>
      </div>
    </div>
  );
};

export default StudentNotices;
