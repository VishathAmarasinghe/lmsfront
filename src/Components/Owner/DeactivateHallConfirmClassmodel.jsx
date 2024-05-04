import React from "react";
import { Button, Modal, message } from "antd";
import { activateDeactivateHall } from "../../API";

const DeactivateHallConfirmClassmodel = ({
  fetchHallInfomation,
  deactivateClassModelOpen,
  setDeactivateClassModelOpen,
  classData,
  selectedHall,setSelectedHall
}) => {
  console.log("classs data ", classData);
  const handleOk = () => {
    setDeactivateClassModelOpen(false);
  };

  const handleCancel = () => {
    setDeactivateClassModelOpen(false);
  };

  const handleDeactivateAnyway = async () => {
    try {
      const hallData = {
        hallID: selectedHall?.hallID,
        activationStatus: "deactivated",
        confirmState: true,
      };
      const updationResult = await activateDeactivateHall(hallData);
      console.log("class updation result ", updationResult);
      if (updationResult.status == 200) {
        message.success(`Hall deactivated successfully`);
      }

      fetchHallInfomation();
    } catch (error) {
      console.log("deactivation of hall error ", error);
      message.error("deactivation failed!");
    }
    setDeactivateClassModelOpen(false);
  };

  return (
    <Modal
      title="Class info"
      width={"60%"}
      maskClosable={false}
      open={deactivateClassModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          className="bg-green-500 text-white font-medium hover:bg-green-600"
          onClick={handleOk}
        >
          OK
        </Button>,
        <Button
          key="danger"
          className="bg-red-500 text-white font-medium hover:bg-red-600"
          onClick={handleDeactivateAnyway}
        >
          Deactivate Anyway
        </Button>,
      ]}
    >
      <p className="bg-red-400 text-white font-medium p-2 mb-2">
        Below classes are still assigned to the selected Hall
      </p>
      {classData?.map((classInfo,index) => (
        <div key={index} className="w-full bg-gray-300 flex flex-row p-2 mb-2 rounded-md">
          <p className="w-[15%]">classID:{classInfo?.classID}</p>
          <p className="w-[35%]">className:{classInfo?.ClassName}</p>
          <p className="w-[15%]">grade:{classInfo?.gradeID}</p>
          <p className="w-[25%]">Subject:{classInfo?.subjectID}</p>
          <p className="w-[25%]">
            Subject:{classInfo?.ClassDay} {classInfo?.StartTime}
          </p>
        </div>
      ))}
    </Modal>
  );
};

export default DeactivateHallConfirmClassmodel;
