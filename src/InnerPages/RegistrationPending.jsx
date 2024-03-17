import React, { useEffect, useState } from "react";
import RegistrationpendingTable from "../Components/Registration/RegistrationpendingTable";
import { useDispatch } from "react-redux";
import { get_pending_confirmed_students } from "../Actions/user";
import { useSelector } from "react-redux";
import LoadingInnerPage from "./LoadingInnerPage";

const RegistrationPending = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { pendingUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(get_pending_confirmed_students());
    console.log("Selectors ", pendingUsers);
  }, [dispatch]);

  useEffect(() => {
    if (pendingUsers != null) {
      setLoading(false);
    }
  }, [pendingUsers]);
  return (
    <div className="w-full h-[100%] flex flex-col items-center border-2 border-pink-700  shadow-2xl  overflow-y-auto  ">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">Student Registrations</h1>
      </div>
      <div className="w-[95%] h-[90%] border-2 border-red-500  flex flex-col md:flex-row justify-between ">
        {loading ? <LoadingInnerPage /> : <RegistrationpendingTable pendingUsers={pendingUsers} />}
      </div>
    </div>
  );

};

export default RegistrationPending;
