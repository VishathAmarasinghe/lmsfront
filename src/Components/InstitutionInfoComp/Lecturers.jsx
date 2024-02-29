import React from "react";
import LectureCard from "./LectureCard";

const Lecturers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2   m-3  ">
      <LectureCard/>
      <LectureCard/>
    </div>
  );
};

export default Lecturers;
