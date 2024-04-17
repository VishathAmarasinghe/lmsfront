import React, { useEffect, useState } from 'react'
import { getAllchildsOfParent, getClassesForSelectedStudent, getParentAnnouncements, getStudentAnnouncements } from '../API';
import { Empty, message } from 'antd';
import LoadingInnerPage from './LoadingInnerPage';
import NoticeCard from '../Components/Student/NoticeCard';

const ParentNoticePanel = () => {
    const user=JSON.parse(localStorage.getItem("profile"))?.result;
    const [annoucements,setAnnoucements]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
      if (user?.role=="parent") {
        fetchParentAnnouncemnts()
      }else if(user?.role=="student"){
       fetchStudentAnnouncemnts()
      }
        
    },[])


    





    const fetchParentAnnouncemnts = async () => {
        try {
            setLoading(true)
            const annoucementResult=await getParentAnnouncements(user?.UserID);
            console.log("parent Announcements  ",annoucementResult);
            setAnnoucements(annoucementResult.data);
            setLoading(false);
        } catch (error) {
            console.log("error ",error);
            message.error("error occured fetching parent annoucements! ")
        }
      };



      const fetchStudentAnnouncemnts = async () => {
        try {
            setLoading(true)
            const annoucementResult=await getStudentAnnouncements(user?.UserID);
            console.log("parent Announcements  ",annoucementResult);
            setAnnoucements(annoucementResult.data);
            setLoading(false);
        } catch (error) {
            console.log("error ",error);
            message.error("error occured fetching parent annoucements! ")
        }
      };

      




  return (
    <div  className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Announcements
        </h1>
      </div>

      <div data-aos="fade-right" className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className='w-[95%] mt-2 overflow-y-auto '>
        {
            loading?<LoadingInnerPage/>:(
              annoucements.length==0?<Empty description="No Announcements Yet!"/>:
                annoucements.map((announcement)=>
                <NoticeCard announcement={announcement} userID={user?.UserID}   key={announcement?.announcementID}/>
                )
            )
        }
        </div>
        
      </div>
    </div>
  )
}

export default ParentNoticePanel