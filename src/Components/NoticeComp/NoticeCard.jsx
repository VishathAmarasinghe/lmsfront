import React from "react";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import { Avatar } from "antd";
import { lecturer } from "../../assets";

const NoticeCard = () => {
  return (
    <div className="w-[95%] flex flex-col justify-center items-center  mt-4  bg-[#EBEEFF] rounded-2xl p-4 shadow-md hover:shadow-xl">
      <div className="w-full flex flex-row justify-start items-start">
        <InsertInvitationRoundedIcon sx={{color:"#5B6BD4"}} />
        <p className="font-inter font-bold ml-3 mb-2">23rd November 2023</p>
      </div>
      <div>
        <p>
          Please be informed that there will be a slight change in the class
          schedule on November 24th. The classes will be conducted at their
          usual time, ensuring minimal disruption to your regular routine.
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row  mt-2">
      <div className="w-full flex flex-row justify-start items-start">
        <LaptopMacRoundedIcon sx={{color:"#5B6BD4"}} />
        <p className="font-inter font-bold ml-3 mb-2">English medium Science Class</p>
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <Avatar src={<img src={lecturer}/>}/>
        
        <p className="font-bold ml-3">Teacher:<span className="ml-2">Vishath Amarasinghe</span></p>
        
      </div>

      </div>
    </div>
  );
};

export default NoticeCard;
