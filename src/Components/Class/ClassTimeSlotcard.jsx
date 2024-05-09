import { Tag, message } from "antd";
import React from "react";

const ClassTimeSlotcard = ({ availableData, timeslot, setTimeSlot, classID }) => {
  const isSelected = timeslot.timeArray.includes(availableData.startTime);

  const handleTimeSelection = (startTime, lastTime, availability) => {
    console.log("startime ", startTime, " end time ", lastTime);

    if (!availability) {
      if (timeslot.endTime != startTime) {
        if (timeslot.endTime == "" || timeslot.StartTime == "") {
          const updatedArray = [...timeslot.timeArray, startTime];
          setTimeSlot({ ...timeslot, StartTime: startTime, endTime: lastTime, timeArray: updatedArray });
          console.log("added here");
        } else {
          if (timeslot.StartTime == lastTime) {
            const updatedArray = [...timeslot.timeArray, startTime];
            setTimeSlot({ ...timeslot, StartTime: startTime, timeArray: updatedArray });
          } else {
            console.log("you cannot add it");
            message.error("cannot select two different time slots");
          }
        }
      } else {
        const updatedArray = [...timeslot.timeArray, startTime];
        setTimeSlot({ ...timeslot, endTime: lastTime, timeArray: updatedArray });
      }
    } else {
      message.error("cannot select occupied timeslots");
    }
  };

  return (
    <Tag
      onClick={() => handleTimeSelection(availableData?.startTime, availableData?.lastTime, availableData.availability)}
      key={availableData?.startTime}
      color={`${availableData.availability ? "blue-inverse" : "green"}`}
      className={`m-1 ${
        availableData.availability ? "hover:bg-blue-800" : "hover:bg-green-500 hover:text-white"
      }  ${isSelected ? "bg-green-500 text-white" : ""}`}
    >
      {availableData.availability ? (
        <div className={`flex flex-row w-full items-center justify-around`}>
          <div className="flex flex-col items-center justify-center">
            <p>{availableData?.class?.classID}</p>
            <p>{availableData?.class?.ClassName}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>
              {availableData?.startTime}-{availableData?.lastTime}
            </p>
          </div>
        </div>
      ) : availableData?.class?.classID == classID && classID!=null ? (
        <div className="flex flex-row justify-around   rounded-md">
          <div >
            <p className="bg-purple-500 text-white rounded-md text-center">This Class</p>
            <p>Previous Time Slot</p>
          </div>
          <p>
            {availableData?.startTime}-{availableData?.lastTime}
          </p>
        </div>
      ) : (
        <div className="flex flex-row justify-around">
          <div>
            <p>Free Time</p>
            <p>Available</p>
          </div>
          <p>
            {availableData?.startTime}-{availableData?.lastTime}
          </p>
        </div>
      )}
    </Tag>
  );
};

export default ClassTimeSlotcard;
