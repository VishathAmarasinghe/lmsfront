import React from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GradeBookTable from "../Components/GradeBook/GradeBookTable";

const GradeBook = () => {
  return (
    <div className="w-full border-2 border-black flex flex-col items-center">
      <div className="w-[95%] border-2 border-green-600 mt-2 flex flex-col">
        <div className="w-full border-2 border-blue-600">
            <button className="bg-blue-700 p-2 flex flex-row justify-center items-center rounded-lg scalar-card">
                <AddRoundedIcon className="text-white"/>
                <p className="text-white ml-1 mr-1">Upload New Marksheet</p>
            </button>
        </div>
        <div className="w-full">
                <GradeBookTable/>
        </div>
      </div>
    </div>
  );
};

export default GradeBook;
