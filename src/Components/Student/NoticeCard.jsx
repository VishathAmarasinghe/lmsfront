import { NotificationOutlined, BookOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, message, notification } from "antd";
import React from "react";
import { deleteAnnouncement } from "../../API";

const NoticeCard = ({ announcement, userID,onAnnouncementDeleted }) => {

  const handleDeleteAnnouncement=async()=>{
    try {
    const deleteResult=await deleteAnnouncement(announcement?.announcementID);
    if (deleteResult.status==200) {
      notification.success({
        message:"Announcement Deleted successfully!",
        description:"Dissapeared from all related users."
      })
    }else{
      notification.error({
        message:"Error occured during Deleting annuncement!",
        description:"please try again later"
      })
    }
  } catch (error) {
    console.log("error ",error);
      message.error("Announcement Deletion Error!")
  }
    onAnnouncementDeleted();
  }

  return (
    <div data-aos="fade-up" className="w-[100%] bg-[#D6DCFF] shadow-md flex flex-col md:flex-row justify-around  items-center  p-2 hover:bg-blue-300  my-3 rounded-lg ">
      <div className="bg-[#1ED925] p-2 w-[90%] md:w-[5%] flex flex-col rounded-md justify-center items-center">
        <NotificationOutlined className="text-[30px] text-white " />
      </div>
      <div className="flex flex-col w-[90%] md:w-[70%] ">
        <h1 className="font-inter font-semibold text-[17px]">
          {announcement?.title}
        </h1>
        <p className="font-inter font-normal text-[14px] ">
          {announcement?.description}
        </p>
        <div>
          <p className="text-[#ABABAB]">
            Audiance: {announcement?.audience}{" "}
            {announcement?.classes?.length > 0
              ? ` - Classes: ${announcement?.classes}`
              : ""}
          </p>
        </div>
      </div>
      <div className="w-[90%] md:w-[20%]  flex flex-col justify-center items-center">
        <BookOutlined className="text-[20px] text-[#727070]" />
        <h1 className="font-inter text-[12px] font-semibold">
          Created At {announcement?.createdDate.substring(0, 10)}
        </h1>
        {userID == announcement?.userID ? (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleDeleteAnnouncement}
            okButtonProps={{ className: "bg-red-500 hover:bg-red-600 text-white" }}
            okText="Yes"
            cancelText="No"
          >
            <Tag
              className="w-full text-center p-0 hover:bg-red-600"
              color="red"
            >
              Delete
            </Tag>
          </Popconfirm>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
