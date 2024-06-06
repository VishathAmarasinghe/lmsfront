import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getAllClassesForCalender, getAllTeachers, getClassesByStudentCalender, getClassesByTeacherCalender } from "../API";
import { Avatar, ConfigProvider, Segmented, Select, message } from "antd";
import InnerPageLoader from "../Pages/CommonPages/InnerPageLoader";
import LoadingPage from "../Pages/CommonPages/LoadingPage";
import { teacher } from "../assets";


function renderEventContent(eventInfo) {
  return (
    <div className="w-full">
      <b>{eventInfo.timeText}</b>
      <br></br>
      <p><i>{eventInfo.event.title}</i></p>
    </div>
  );
}

const OwnerAndStaffTimeTable = () => {
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const [calenderEvent, setCalenderEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacherData,setTeacherData]=useState(null);
  const [clickedSegmentValue,setClickedSegmentValue]=useState("All Classes");

  useEffect(() => {
    if(user?.role=="teacher"){
      fetchTeacherClassCalender(user?.UserID);
    }else if(user?.role=="student"){
      fetchStudentClassCalender();
    }else{
        fetchAllClassCalender();
    }
    
  }, []);

  const fetchTeacherClassCalender = async (userID) => {
    setLoading(true);
    try {
      const classCalenderResult = await getClassesByTeacherCalender(userID);

      console.log("calender Result ", classCalenderResult?.data);
      setCalenderEvent(classCalenderResult?.data);
    } catch (error) {
      message.error("calender data fetching Error!");
    }

    setLoading(false);
  };


  const fetchStudentClassCalender = async () => {
    setLoading(true);
    try {
      const classCalenderResult = await getClassesByStudentCalender(user.UserID);

      console.log("calender Result ", classCalenderResult?.data);
      setCalenderEvent(classCalenderResult?.data);
    } catch (error) {
      message.error("calender data fetching Error!");
    }

    setLoading(false);
  };


  const fetchAllTeacherInformation=async()=>{
    setLoading(true)
    try {
        const teacherDetails=await getAllTeachers();
        console.log("all teacher result ",teacherDetails);
        const teacherDetailsArray=teacherDetails?.data?.map((teacher)=>({
            value:teacher?.UserID,
            label:<div className="flex flex-row justify-between"><Avatar ><img src={`http://localhost:5000/${teacher?.photo}`}/></Avatar><p>{teacher?.firstName+" "+teacher?.lastName}</p></div>
            
        }))
        setTeacherData(teacherDetailsArray);
        console.log("teacher array ",teacherDetailsArray);
    } catch (error) {
        console.log("error",error);
      message.error("Teacher data fetching Error!");
    }
  }





  const fetchAllClassCalender = async () => {
    setLoading(true);
    try {
      const classCalenderResult = await getAllClassesForCalender();

      console.log("calender Result ", classCalenderResult?.data);
      setCalenderEvent(classCalenderResult?.data);
    } catch (error) {
        console.log("error",error);
      message.error("calender data fetching Error!");
    }

    setLoading(false);
  };

  const handleSegmentChange=(value)=>{
    console.log("selected segmant value is ",value);
    if(value=="All Classes"){
        fetchAllClassCalender();
    }else if(value=="Teacher Classes"){
      fetchAllTeacherInformation();
    }
    setClickedSegmentValue(value)
  }


  const handleSelectedTeacherChange=(teacher)=>{
    console.log("selected teacher ",teacher);
    fetchTeacherClassCalender(teacher);
  }

  const businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    startTime: "07:00",
    endTime: "21:00",
  };

  return (
    <div className="w-full h-full flex flex-col items-center shadow-2xl overflow-hidden">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Time Table
        </h1>
      </div>

      <div data-aos="fade-right" className="w-[95%]  bg-white h-[90%] flex flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className="w-[95%]  flex flex-row  mt-3">
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemSelectedBg:"rgb(59 130 246)",
                  itemSelectedColor:"white"
                },
                Select:{
                    selectorBg:"#EBEEFF"
                }
              },
            }}
          >
            <Segmented
              options={["All Classes","Teacher Classes"]}
              defaultChecked="All Classes"
              onChange={handleSegmentChange}
            />
          </ConfigProvider>
          {
            clickedSegmentValue!="All Classes"?<Select style={{backgroundColor:"#EBEEFF"}} onChange={handleSelectedTeacherChange} className="w-[40%]" options={teacherData}/>:<></>
          }
          
        </div>

        <div className=" w-[95%] h-[95%] flex flex-col justify-center m-auto">
          {loading ? (
            <LoadingPage />
          ) : (
            <FullCalendar
              height={"100%"}
              nowIndicator={true}
              businessHours={businessHours}
              plugins={[timeGridPlugin, dayGridPlugin]}
              initialView="timeGridWeek"
              titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
              headerToolbar={{
                start: 'title', 
                center: '',
                end: 'today timeGridWeek,timeGridDay prev,next',
                cssClass: 'custom-header' 
                
              }}
              events={calenderEvent}
              eventContent={renderEventContent}
             
            />
          )}
        </div>
      </div>
    </div>
  );
};



export default OwnerAndStaffTimeTable