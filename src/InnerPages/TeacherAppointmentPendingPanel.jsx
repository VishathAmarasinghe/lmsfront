import React, { useEffect, useState } from "react";
import { getCreatedAppointmentsRelatedToTeacher } from "../API";
import LoadingInnerPage from "./LoadingInnerPage";
import AppointmentPendingTable from "../Components/AppointmentComp/AppointmentPendingTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPendingAppointments } from "../Actions/appointments";

const TeacherAppointmentPendingPanel = () => {
    const teacherID=JSON.parse(localStorage.getItem("profile")).result.UserID;
    const createdAppointmentsArray=useSelector((state)=>state.appointments.createdAppointments);
    const [createdAppointments,setCreatedAppointments]=useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();


    useEffect(()=>{
        dispatch(setPendingAppointments(teacherID));
    },[])



  useEffect(() => {
    fetchCreatedAppointments();
  }, [createdAppointmentsArray]);

  const fetchCreatedAppointments = async () => {
    setLoading(true);
    const reCreatedAppointments = createdAppointmentsArray.map((appointment) => ({
        ...appointment,
        publishdate: appointment.appointmentpublishDate.substring(0, 10),
        parentName: appointment.parentFirstName + " " + appointment.parentLastName,
        studentName: appointment.studentFirstName + " " + appointment.studentLastName,
        userStatus: appointment.status
    }));

    setCreatedAppointments(reCreatedAppointments);
    setLoading(false);
};







  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Appointments
        </h1>
      </div>

      <div className="w-[95%]  bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        {loading ? <LoadingInnerPage /> : <AppointmentPendingTable appointment={createdAppointments}/> }
      </div>
    </div>
  );
};

export default TeacherAppointmentPendingPanel;
