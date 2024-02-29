import React from "react";
import { lecturer } from "../assets";
import ProfileDetails from "../Components/ParentProfile/ProfileDetails";
import { Avatar, Collapse, Progress } from "antd";
import { Divider } from "@mui/material";
import StudentProfileCard from "../Components/ParentProfile/StudentProfileCard";

const ParentProfile = () => {
    const items = [
        {
          key: '1',
          label: 'Student 1 Vishath Amarsinghe',
          children: <StudentProfileCard/>,
        },
        {
          key: '2',
          label: 'This is panel header 2',
          children: <StudentProfileCard/>,
        },
        {
          key: '3',
          label: 'This is panel header 3',
          children: <StudentProfileCard/>,
        },
      ];
  return (
    <div className="w-full h-[100%] flex flex-col items-center  shadow-2xl rounded-2xl overflow-y-auto  ">
      {/* <h1 className="text-2xl text-center font-semibold">Profile</h1> */}
      <div className="w-[95%]  flex flex-col md:flex-row justify-between ">
        <div className="flex flex-col h-[80%] w-full bg-white p-3 rounded-lg shadow-xl  md:w-[40%]  justify-center items-center">
          <Avatar
            className="w-[35%] h-[25%] rounded-2xl"
            src={<img src={lecturer} />}
          />
          <p className="text-2xl mt-2 font-inter font-medium">
            Vishath Amarasinghe
          </p>
          <p className="text-[16px]">Occupation</p>
          <div className="w-[90%] p-3 bg-[#EBEEFF] rounded-lg">
            <p>Your Profile 25% Complete</p>
            <Progress percent={70} status="active" />
          </div>
          <div className="w-[90%] mt-2 mb-1">
            <p className="text-gray-500 text-[16px]">Email</p>
            <p className="font-medium">vishathAmar@gmail.com</p>
          </div>
          <div className="w-[90%] mt-2 mb-1">
            <p className="text-gray-500 text-[16px]">Phone No</p>
            <p className="font-medium">0786070666</p>
          </div>
        </div>
        <div className="w-full md:w-[55%] bg-white p-3 rounded-lg shadow-xl">
          <div className="flex flex-col w-full  shadow-lg">
            <div className="w-full bg-gray-200 h-10 flex p-2 flex-col justify-center rounded-lg">
              <p className="text-xl font-inter font-semibold">Personal details</p>
            </div>
            <Divider orientation="horizontal" />
            <ProfileDetails />
            <ProfileDetails />
            <ProfileDetails />
            <ProfileDetails />
            <ProfileDetails />
            <ProfileDetails />
          </div>
          <div className="flex flex-col w-full  mt-5 shadow-lg">
            <div className="w-full bg-gray-200 h-10 flex p-2 flex-col justify-center rounded-md">
              <p className="text-xl font-inter font-semibold">Student details</p>
            </div>
            <Collapse defaultActiveKey={["1"]} accordion items={items}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
