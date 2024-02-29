import { DatePicker, Space } from "antd";
import React from "react";

const DatePickerComp = ({ titleName }) => {
  return (
    <div className="w-full  flex flex-row justify-between my-1 items-center  md:w-[40%]">
      <p className="font-inter font-semibold">{titleName}</p>

      <DatePicker placement="bottomLeft" className="w-[60%] bg-[#EBEEFF]" />
    </div>
  );
};

export default DatePickerComp;
