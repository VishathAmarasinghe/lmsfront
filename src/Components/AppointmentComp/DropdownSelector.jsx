import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";

const DropdownSelector = ({ titleName }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleMenuClick = (e) => {
    setSelectedStudent(e.key);
  };

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

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="w-full  flex flex-row justify-between my-3 md:my-1 items-center  md:w-[40%]">
      <p className="font-inter font-semibold">{titleName}</p>
      <Dropdown overlay={menu} placement="bottom">
        <Button className="bg-[#EBEEFF] w-full font-inter shadow-lg">
          {selectedStudent ? selectedStudent : "Select Student"}
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
