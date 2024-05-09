import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getAllClassesForCalender, getClassesByStudentCalender, getClassesByTeacherCalender } from "../API";
import { ConfigProvider, Segmented, message } from "antd";
import InnerPageLoader from "../Pages/CommonPages/InnerPageLoader";
import LoadingPage from "../Pages/CommonPages/LoadingPage";


function renderEventContent(eventInfo) {
  return (
    <div className="w-full">
      <b>{eventInfo.timeText}</b>
      <br></br>
      <p><i>{eventInfo.event.title}</i></p>
    </div>
  );
}

const TeacherTimeTable = () => {
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const [calenderEvent, setCalenderEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(user?.role=="teacher"){
      fetchTeacherClassCalender();
    }else if(user?.role=="student"){
      fetchStudentClassCalender();
    }
    
  }, []);

  const fetchTeacherClassCalender = async () => {
    setLoading(true);
    try {
      const classCalenderResult = await getClassesByTeacherCalender(user.UserID);

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
    }else if(value=="My Classes"){
      if(user?.role=="teacher"){
        fetchTeacherClassCalender();
      }else if(user?.role=="student"){
        fetchStudentClassCalender();
      }
    }
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
        <div className="w-[95%]  mt-3">
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemSelectedBg:"rgb(59 130 246)",
                  itemSelectedColor:"white"
                },
              },
            }}
          >
            <Segmented
              options={["My Classes", "All Classes"]}
              defaultChecked="My Classes"
              onChange={handleSegmentChange}
            />
          </ConfigProvider>
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

export default TeacherTimeTable;
