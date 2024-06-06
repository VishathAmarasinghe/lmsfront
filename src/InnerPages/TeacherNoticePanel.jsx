import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import NoticeAddingDrawer from "../Components/NoticeComp/NoticeAddingDrawer";
import NoticeCard from "../Components/Student/NoticeCard";
import { getAllAnnoucements, getAnnouncementsCreatedByTeacher } from "../API";
import LoadingInnerPage from "./LoadingInnerPage";
import NoticeTable from "../Components/Owner/NoticeTable";
import dayjs from "dayjs";

const TeacherNoticePanel = () => {
  const [noticeAddingDrawerOpen, setNoticeAddingDrawerOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("profile")).result;
  const [announcements, setAnnouncments] = useState([]);
  const [allAnnoucementList,setAllAnnouncementList]=useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (noticeAddingDrawerOpen == false) {
      fetchAnnouncements();
      fetchAllAnnouncements();
    }
  }, [noticeAddingDrawerOpen]);




  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const announcementResult = await getAnnouncementsCreatedByTeacher(
        userInfo?.UserID
      );
      console.log("annoucment Result ", announcementResult.data);
      setAnnouncments(announcementResult.data);
      setLoading(false);
    } catch (error) {
      message.error("Announcements fetching error!");
      console.log("error ", error);
    }
  };




  const fetchAllAnnouncements = async () => {
    setLoading(true);
    try {
      const allAnnouncements = await getAllAnnoucements();
      console.log("all announcements ", allAnnouncements);
      const announcementArray = allAnnouncements.data?.map((announcement) => {

        const classIDs = announcement?.classList?.map((classid) => classid.classID);
        const classString = classIDs.join(",");

        return {
          key: announcement?.announcementID,
          classIDs: classString,
          ...announcement,
          createdDate:dayjs(announcement?.createdDate).format("YYYY-MM-DD")
        };
      });
      setAllAnnouncementList(announcementArray);
      setLoading(false);
    } catch (error) {
      message.error("Announcements fetching error!");
      console.log("error ", error);
    }
  };
  




  const handleOpenNewPanel = () => {
    setNoticeAddingDrawerOpen(true);
  };

  const handleAnnouncementDelete = () => {
    fetchAnnouncements();
  };

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Notices
        </h1>
      </div>

      <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className=" w-full mt-2 mb-2">
          <NoticeAddingDrawer
            noticeAddingDrawerOpen={noticeAddingDrawerOpen}
            setNoticeAddingDrawerOpen={setNoticeAddingDrawerOpen}
          />
          <Button
            onClick={handleOpenNewPanel}
            className="flex flex-row justify-center items-center bg-blue-500 text-white font-medium ml-7 p-2 hover:bg-blue-600"
          >
            <PlusOutlined />
            Add New Announcement
          </Button>
        </div>

        {userInfo?.role == "staff" || userInfo?.role == "owner" ? (
          <div className="w-[95%] overflow-x-auto ">
            <NoticeTable fetchAllAnnouncements={fetchAllAnnouncements} annoucementData={allAnnoucementList} />
          </div>
        ) : (
          <div className=" overflow-y-auto h-[90%] w-[95%]">
            {loading ? (
              <LoadingInnerPage />
            ) : (
              announcements.map((appoint) => (
                <NoticeCard
                  announcement={appoint}
                  userID={userInfo?.UserID}
                  onAnnouncementDeleted={handleAnnouncementDelete}
                  key={appoint?.announcementID}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherNoticePanel;
