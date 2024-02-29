import React from "react";
import { Button, Dropdown, Space } from "antd";

const DropdownSelector = ({titleName}) => {
  const items = [
    {
      key: "1",
      label: <p>Vishath Amarasinghe</p>,
    },
    {
      key: "2",
      label: <p>Pathum Nirmal</p>,
    },
    {
      key: "3",
      label: <p>Sumudu rasangana</p>,
    },
  ];
  return (
    <div className="w-full  flex flex-row justify-between my-3 md:my-1 items-center  md:w-[40%]">

      <p className="font-inter font-semibold">{titleName}</p>

      <Dropdown
        className="w-[60%]"
        menu={{
          items,
        }}
        placement="bottom"
      >
        <Button className="bg-[#EBEEFF] font-inter shadow-lg">Student </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
