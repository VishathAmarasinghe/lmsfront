import React from "react";
import ClassParticipantCard from "./ClassParticipantCard";
import { Collapse, Tooltip } from "antd";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const ClassParticipants = () => {
  return (
    <div className="w-full border-2 border-black flex flex-col items-center">
      <div className="w-[95%] border-2 border-green-600 mt-2 flex flex-col">
        <h1 className="text-[17px] font-inter font-semibold mb-1">
          Course Participants
        </h1>
        <div className="w-full">
          <Collapse
            items={[
              {
                key: "1",
                label: (
                  <p className="font-inter font-medium text-[15px]">
                    Instructors
                  </p>
                ),
                children: <ClassParticipantCard />,
              },
              {
                key: "2",
                label: (
                  <div className="flex flex-row justify-between items-center">
                    <p className="font-inter font-medium text-[15px]">
                      Students
                    </p>
                    <Tooltip title="Download Student List">
                      <DownloadRoundedIcon className="text-green-700 hover:text-black" />
                    </Tooltip>
                  </div>
                ),
                children: <ClassParticipantCard />,
              },
            ]}
          />
          {/* <ClassParticipantCard/> */}
        </div>
      </div>
    </div>
  );
};

export default ClassParticipants;
