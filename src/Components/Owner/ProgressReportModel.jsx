import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ProgressReport from "../../Pages/CommonPages/ReportTemplates/ProgressReport";
import TeacherPaymentCard from "./TeacherPaymentCard";

const ProgressReportModel = ({
  teacherPaymentData,
  keyValue,
  progressReportModelOpen,
  setProgressReportModelOpen,
  progressReport,
}) => {
  const navigate = useNavigate();
  console.log("progress report data is ", progressReport);
  console.log('====================================');
  console.log("teacher payment data ",teacherPaymentData);
  console.log('====================================');

  const handleOk = () => {
    // setTeacherModelOpen(false);
    // console.log("teacher  payyment  data is  ",teacherPaymentData);
    // const serializedData = encodeURIComponent(JSON.stringify(teacherPaymentData));
    // // Navigate to the report page with the serialized object as a parameter
    // navigate(`/report/teacher?data=${serializedData}`);
    // console.log("use navation to the page");
  };

  const handleCancel = () => {
    setProgressReportModelOpen(false);
  };

  return (
    <Modal
      centered
      width={"80%"}
      title={<p className="text-[20px]">Progress Report</p>}
      open={progressReportModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleOk}
        >
          Download
        </Button>,
      ]}
    >
      <div className="w-full">
        {keyValue == "progressReport" ? (
          <ProgressReport progressReport={progressReport} />
        ) : keyValue == "teacherReport" ? (
          <>
            {teacherPaymentData?.map((teacherData) => (
              <TeacherPaymentCard
              
                key={teacherData?.teacherID}
                teacherData={teacherData}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default ProgressReportModel;
