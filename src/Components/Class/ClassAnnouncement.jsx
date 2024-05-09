import React, { useEffect, useState } from "react";
import { Empty, message } from "antd";
import { useParams } from "react-router-dom";
import { getAnnoucementSpecifcToStudentsAndClass } from "../../API";
import LoadingInnerPage from "../../InnerPages/LoadingInnerPage";
import NoticeCard from "../Student/NoticeCard";

const ClassAnnouncement = () => {
  const activeUser = JSON.parse(localStorage.getItem("profile"))?.result;
  const { classID } = useParams();
  const [classAnnoucements, setClassAnnoucements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchingclassStudentAnnoucements();
  }, []);

  const fetchingclassStudentAnnoucements = async () => {
    try {
      setLoading(true);
      const annoucementResult = await getAnnoucementSpecifcToStudentsAndClass(
        classID
      );
      console.log("annoucement result ", annoucementResult);
      setClassAnnoucements(annoucementResult.data);
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
      message.error("Student annoucement Fetching error!");
    }
  };
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Announcements
        </h1>
      </div>

      <div
        data-aos="fade-right"
        className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300"
      >
        <div className="w-[95%] mt-2 overflow-y-auto ">

        <div className='w-[95%] mt-3'>
           {
            loading?<LoadingInnerPage/>:<>
            {
                classAnnoucements?.length>0?
                classAnnoucements?.map((ann)=><NoticeCard announcement={ann} userID={activeUser.UserID}  />):<Empty description="No class Annoucements"/>
            }
            </>
           }
        </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAnnouncement;





