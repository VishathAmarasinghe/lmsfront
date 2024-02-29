import React from "react";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { eduinstitute } from "../../assets";

const InfoHeader = () => {
  return (
    <div className=" flex flex-col bg-white md:flex-row p-3 m-5 shadow-xl rounded-2xl ">
      <div className=" w-full md:w-[50%] m-2 bg-[#EBEEFF] rounded-lg p-2">
        <h1 className="font-inter font-extrabold text-2xl">
          Savitha Education Center
        </h1>
        <div className="flex flex-row justify-start items-center  md:ml-4 md:mt-3">
          <HomeRoundedIcon sx={{ color: "#5B6BD4" }} />
          <p className="ml-3 text-[17px]">No : Rohala Road, Homagama</p>
        </div>
        <div className="flex flex-row justify-start items-center md:ml-4 md:mt-3">
          <EmailRoundedIcon sx={{ color: "#5B6BD4" }} />
          <p className="ml-3 text-[17px]">SavithaInstitute@gmail.com</p>
        </div>

        <div className="flex flex-row justify-start items-center md:ml-4 md:mt-3">
          <PhoneInTalkRoundedIcon sx={{ color: "#5B6BD4" }} />
          <p className="ml-3 text-[17px]">0786070411</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row m-2  w-full md:w-[50%] bg-[#EBEEFF] rounded-lg p-2">
        <div className="w-full m-3 md:w-[45%]">
          <img
            alt="intitution"
            className="rounded-lg"
            src={eduinstitute}
          />
        </div>
        <div className="w-full m-3 md:w-[45%] rounded-md">
          <img
            alt="intitution"
            className="rounded-lg"
            src={eduinstitute}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoHeader;
