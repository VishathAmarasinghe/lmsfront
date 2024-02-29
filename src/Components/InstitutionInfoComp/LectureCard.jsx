import React from 'react'
import { eduinstitute, lecturer } from "../../assets";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const LectureCard = () => {
  return (
    <div className=" w-full md:w-[95%] m-2 flex bg-white flex-col md:flex-row justify-around shadow-2xl  rounded-lg p-2">
        <div className="w-full md:w-[40%]">
          <img src={lecturer} className="rounded-lg w-full" alt="lecturer" />
        </div>
        <div className=" w-full md:w-[50%] pl-4 md:pl-0">
          <h1 className="text-[22px] font-medium">Mr.Nalin Pathum</h1>
          <h1 className="text-[15px] font-medium">Science Teacher</h1>
          <h1 className="text-[13px] ">5 year experienced teacher, teaching at Ananda college</h1>
          <div className="flex flex-row justify-start items-center md:ml-4 md:mt-3">
            <EmailRoundedIcon sx={{ color: "#5B6BD4",fontSize:"20px" }} />
            <p className="ml-3 text-[13px]">SavithaInstitute@gmail.com</p>
          </div>

          <div className="flex flex-row justify-start items-center md:ml-4 md:mt-3">
            <PhoneInTalkRoundedIcon sx={{ color: "#5B6BD4",fontSize:"20px" }} />
            <p className="ml-3 text-[13px]">0786070411</p>
          </div>
        </div>
      </div>
  )
}

export default LectureCard