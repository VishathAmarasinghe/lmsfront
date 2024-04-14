import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import NoticeAddingDrawer from "../Components/NoticeComp/NoticeAddingDrawer";
import NoticeCard from "../Components/Student/NoticeCard";
import { getAnnouncementsCreatedByTeacher } from "../API";
import LoadingInnerPage from "./LoadingInnerPage";

const TeacherNoticePanel = () => {
  const [noticeAddingDrawerOpen, setNoticeAddingDrawerOpen] = useState(false);
  const teacherID=JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [announcements,setAnnouncments]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if (noticeAddingDrawerOpen==false) {
      fetchAnnouncements();
    }
  },[noticeAddingDrawerOpen])


  const fetchAnnouncements=async()=>{
    setLoading(true);
    const announcementResult=await getAnnouncementsCreatedByTeacher(teacherID);
    console.log("annoucment Result ",announcementResult.data);
    setAnnouncments(announcementResult.data);
    setLoading(false);
  }

  const handleOpenNewPanel = () => {
    setNoticeAddingDrawerOpen(true);
  };

  const handleAnnouncementDelete=()=>{
    fetchAnnouncements();
  }

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Notices
        </h1>
      </div>

      <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className=" w-full mt-2 mb-2">
        <NoticeAddingDrawer noticeAddingDrawerOpen={noticeAddingDrawerOpen} setNoticeAddingDrawerOpen={setNoticeAddingDrawerOpen}/>
          <Button
            onClick={handleOpenNewPanel}
            className="flex flex-row justify-center items-center bg-blue-500 text-white font-medium ml-7 p-2 hover:bg-blue-600"
          >
            <PlusOutlined />
            
            Add New Announcement
          </Button>
        </div>
        <div className=" overflow-y-auto h-[90%] w-[95%]">
          {
            loading?<LoadingInnerPage/>:(
              announcements.map((appoint)=>
              <NoticeCard announcement={appoint} userID={teacherID} onAnnouncementDeleted={handleAnnouncementDelete}  key={appoint?.announcementID}/>
              )
            )
          }
            
           

        </div>
      </div>
    </div>
  );
};

export default TeacherNoticePanel;
