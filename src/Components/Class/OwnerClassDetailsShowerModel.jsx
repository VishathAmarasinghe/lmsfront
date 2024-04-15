import React, { useState } from "react";
import { Button, ConfigProvider, Modal, Segmented } from "antd";
import OwnerClassDetailDescription from "./OwnerClassDetailDescription";

const OwnerClassDetailsShowerModel = ({
  selectedClass,
  classDetailedPanelOpen,
  setClassDetailedPanelOpen,
}) => {
    const [selectedSegment,setSelectedSegment]=useState("General Info");


  const handleOk = () => {
    setClassDetailedPanelOpen(false);
  };

  const handleCancel = () => {
    setClassDetailedPanelOpen(false);
  };

  const handleSegmentChanging = (value) => {
    console.log("segment Value is ", value);
    setSelectedSegment(value);
  };

  return (
    <Modal
      title="Class Details"
      width={"70%"}
      centered
      open={classDetailedPanelOpen}
      onOk={handleOk}
      closable={false}
      onCancel={handleCancel}
      footer={[
        <Button
          key="ok"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <div className="w-full border-2 border-red-500 ">
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                itemSelectedBg: "rgb(59 130 246)",
                itemSelectedColor: "white",
                trackBg: "rgb(229 231 235)",
              },
            },
          }}
        >
          <Segmented
            options={["General Info", "Teacher Info", "Student Info"]}
            onChange={(value) => handleSegmentChanging(value)}
          />
        </ConfigProvider>
        <div className="w-full border-blue-500 border-2">
          {
            selectedSegment=="General Info"?
            <div className="w-full h-[]">
                <OwnerClassDetailDescription selectedClass={selectedClass} />
            </div>:
            selectedSegment=="Teacher Info"?
            <div>
                teacher ino
            </div>:
            selectedSegment=="Student Info"?
            <div>
                studenrt ind
            </div>:
            <></>
          }
          

         

          
        </div>
      </div>
    </Modal>
  );
};

export default OwnerClassDetailsShowerModel;
