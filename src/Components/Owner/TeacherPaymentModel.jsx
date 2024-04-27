import React from "react";
import { Button, Modal } from "antd";
import TeacherPaymentCard from "./TeacherPaymentCard";

const TeacherPaymentModel = ({ teacherModelOpen, setTeacherModelOpen,teacherPaymentData }) => {
  const handleOk = () => {
    setTeacherModelOpen(false);
  };

  const handleCancel = () => {
    setTeacherModelOpen(false);
  };

  return (
    <Modal
    centered
    
      width={"80%"}
      title={<p className="text-[20px]">Teacher Payment Analysis</p>}
      open={teacherModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >

      {
        teacherPaymentData?.map((teacherData)=>
        <TeacherPaymentCard key={teacherData?.teacherID}  teacherData={teacherData}/>
    )
      }
      
    </Modal>
  );
};

export default TeacherPaymentModel;
