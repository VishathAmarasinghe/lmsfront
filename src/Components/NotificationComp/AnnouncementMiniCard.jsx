import { NotificationOutlined, BookOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, message, notification } from "antd";
import React from "react";
import { deleteAnnouncement } from "../../API";

const AnnouncementMiniCard = ({ announcement, userID,onAnnouncementDeleted }) => {

 

  return (
    <Tag color="blue" data-aos="fade-up" className="w-[95%]  shadow-md flex flex-col md:flex-row justify-around  items-center scalar-card p-2   my-3 rounded-lg ">
      <div className="bg-[#4551A1] p-2 mr-2 w-[90%] md:w-[5%] flex flex-col rounded-md justify-center items-center">
        <NotificationOutlined className="text-[15px] text-white " />
      </div>
      <div className="flex flex-col w-[90%] md:w-[70%] ">
        <h1 className="font-inter font-semibold text-[15px]">
          {announcement?.title}
        </h1>

        <div>
          <p className="text-[#ABABAB]">
            Audiance: {announcement?.audience}{" "}
            {announcement?.classes?.length > 0
              ? ` - Classes: ${announcement?.classes}`
              : ""}
          </p>
        </div>
      </div>
      <div className="w-[90%] md:w-[25%]   flex flex-row justify-center items-center">
        <BookOutlined className="text-[15px] mr-2 text-[#4551A1]" />
        <h1 className="font-inter text-[12px] font-semibold">
          {announcement?.createdDate.substring(0, 10)}
        </h1>
       
      </div>
    </Tag>
  );
};


export default AnnouncementMiniCard