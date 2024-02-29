import React from "react";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { Divider } from "@mui/material";

const ProfileDetails = ({ profileinfo }) => {
  return (
    <div>
    <div className="w-full h-10 flex flex-row justify-between hover:bg-slate-100  items-center ">
      <p className="font-semibold mr-3 ml-1">Parent ID</p>
      <p className="font-normal">parent ID sdad</p>
     
    </div>
     <Divider orientation="horizontal"/>
     </div>
  );
};

export default ProfileDetails;
