import React from "react";
import RegistrationpendingTable from "../Components/Registration/RegistrationpendingTable";


const RegistrationPending = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center border-2 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-[95%] border-2 border-red-500  flex flex-col md:flex-row justify-between ">
        <RegistrationpendingTable/>
      </div>
    </div>
  );
};

export default RegistrationPending;
