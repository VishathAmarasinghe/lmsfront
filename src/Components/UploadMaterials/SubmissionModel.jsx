import { Badge, Descriptions, Modal, Popconfirm, Tag, message, Button } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import parse from "html-react-parser";
import fileDownload from "js-file-download";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Countdown from "react-countdown-simple";
import SubmissionsUploadingcard from "./SubmissionsUploadingcard";
import { deleteSubmissionAssignment, getStudentSubmissionsByPanel, getSubmittedAssignment, getnotes, submitSubmissions } from "../../API";
import SubmissionsShowingTeacherPanel from "./SubmissionsShowingTeacherPanel";
import moment from "moment";

const SubmissionModel = ({
  submission,
  mainMaterial,
  submissionModelOpen,
  setSubmissionModelOpen,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dissableSubmitButton, setDissableSubmitButton] = useState(false);
  const [submittedAssignment, setSubmittedAssignment] = useState(false);
  const [opendeleteConfirmation, setdeleteConfirmation] = useState(false);
  const [submissionDeleteLoading,setSubmissionDeleteLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [allSubmissions,setAllSubmissions]=useState([]);

  useEffect(() => {
    if (submissionModelOpen === true) {
      handleSubmittedAssignment();
      if(user?.result?.role === "teacher"){
        fetchingAllStudentSubmissions();
      }
    }
  }, [submissionModelOpen,uploadedFiles]);

  const fetchingAllStudentSubmissions = async () => {
    try {
        const studentSubmissions = await getStudentSubmissionsByPanel(submission?.panelID);
        console.log("student all submisssions ", studentSubmissions);
        const studentSubmissionArray = studentSubmissions.data?.map((submission) => ({
          ...submission,
          ...submission?.studentInfo,
          photoName: submission?.studentInfo?.photo + ")" + submission?.studentInfo?.firstName,
          submissionDate: dayjs(submission?.submissionDate).format("YYYY-MM-DD")
        }));
        console.log("refactored student Submission Array ", studentSubmissionArray);
        setAllSubmissions(studentSubmissionArray);
    } catch (error) {
        console.log("error ", error);
        message.error("All student Submissions Fetching Error!");
    }
  }

  const checkSubmissionClosedOrNot = () => {
    const closingDateTime = `${dayjs(submission.subCloseDate).format("YYYY-MM-DD")}T${submission.subCloseTime}`;
    const currentDateTime = moment();
    console.log("closing data is  ", closingDateTime);

    return moment(closingDateTime).isAfter(currentDateTime);
  };

  const handleSubmittedAssignment = async () => {
    const assignment = await getSubmittedAssignment(
      submission.panelID,
      user?.result?.UserID
    );

    console.log("assignment Data", assignment);
    if (assignment.data.length === 0) {
      setSubmittedAssignment(false);
    } else {
      setSubmittedAssignment(assignment.data);
    }
  };

  const handleSubmissionSave = async () => {
    console.log("profile data ", user);
    setDissableSubmitButton(true);
    const submissionData = {
      panelID: submission.panelID,
      studentID: user?.result?.UserID,
    };
    console.log("submission data ", submissionData);
    const formData = new FormData();
    formData.append("submissionData", JSON.stringify(submissionData));
    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const uploadResult = await submitSubmissions(formData);
    console.log("upload result is here  ", uploadResult);
    if (uploadResult.status === 200) {
      message.success("Assignment Submitted successfully!");
      setUploadedFiles([]);
    } else {
      message.error("uploading Error!");
      setDissableSubmitButton(false);
    }
  };

  const panelClose = () => {
    setSubmissionModelOpen(false);
    setdeleteConfirmation(false);
    console.log("closing clicked");
  };

  useEffect(() => {
    console.log("submission Data ", submission);
    console.log("mainMaterials ", mainMaterial);
  }, []);

  const handledeleteUploadedSubmission = async () => {
    try {
        setSubmissionDeleteLoading(true);
        const assignmentData = {
            panelID: submission.panelID,
            studentID: user?.result?.UserID,
            assignmentLocation: submittedAssignment[0].submisionDoc
        };

        console.log("clicked deleing assignment ", assignmentData);
        const deleteResult = await deleteSubmissionAssignment(assignmentData);
        if (deleteResult.status === 200) {
            message.success("submission deleted successfully");
            setDissableSubmitButton(false);
        } else {
            message.error("error deleting submission");
        }
        setSubmissionDeleteLoading(false);
        setUploadedFiles([]);
        handleClosingDeletingSubmitted();
    } catch (error) {
        console.log("error deleting submission", error);
    }
  };

  const handleClickedNote = async () => {
    console.log("Submitted assignment data  ", submittedAssignment[0]);
    const download = await getnotes(submittedAssignment[0].submisionDoc);

    if (download.status === 200) {
      fileDownload(download.data, ((submittedAssignment[0].submisionDoc).split("/"))[1]);
    }
  };

  const handleClosingDeletingSubmitted = () => {
    setdeleteConfirmation(false);
  };



  const items = [
    {
      key: "1",
      label: "Submission Name",
      children: submission.subPanelName,
    },
    {
      key: "2",
      label: "Submission Open Day",
      children: `${dayjs(submission.subOpenDate).format("YYYY-MM-DD")} `,
    },
    {
      key: "3",
      label: "Submission Open Time",
      children: submission.subOpenTime,
    },
    {
      key: "4",
      label: "Submission close Date",
      children: `${dayjs(submission.subCloseDate).format("YYYY-MM-DD")} `,
    },
    {
      key: "5",
      label: "Submission Close Time",
      children: submission.subCloseTime,
    },
    user?.result?.role === "student" ? {
      key: "6",
      label: "Submission Status",
      span: 3,
      children: submittedAssignment !== false ? (
        <Badge status="success" text="Submitted" />
      ) : (
        <Badge status="processing" text="Not Submitted" />
      ),
    } : {},
    {
      key: "7",
      label: "Additional Infomation",
      span: 2,
      children: <div>{parse(submission.additionalInfo)}</div>,
    },
    {
      key: "8",
      label: "Time Remaining",
      span: 2,
      children: (
        <p>
          <ClockCircleOutlined className="text-green-600" />
          <Countdown
            targetDate={
              new Date(
                `${dayjs(submission.subCloseDate).format("YYYY-MM-DD")}T${submission.subCloseTime}`
              )
            }
          />{" "}
        </p>
      ),
    },
  ];

  return (
    <Modal
      title={
        <h1 className="text-2xl font-bold">
          {submission.subPanelName} - Submission Panel
        </h1>
      }
      centered
      open={submissionModelOpen}
      closeIcon={null}
      width={"85%"}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={panelClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className={`bg-blue-500 hover:bg-blue-600 ${user?.result?.role === "teacher" ? "hidden" : ""}`}
          disabled={dissableSubmitButton || !checkSubmissionClosedOrNot()}
          onClick={handleSubmissionSave}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Descriptions
          className="w-full"
          labelStyle={{ fontWeight: "bold" }}
          title="Submission Info"
          layout="horizontal"
          bordered
          items={items}
        />
        {user?.result?.role === "teacher" ? (
          <SubmissionsShowingTeacherPanel allSubmissions={allSubmissions} submissionModelOpen={submissionModelOpen} submissionData={submission} />
        ) : (
          <>
            {!submittedAssignment && checkSubmissionClosedOrNot() ? (
              <div className="w-[90%] mt-5">
                <SubmissionsUploadingcard setUploadedFiles={setUploadedFiles} />
              </div>
            ) : (
              <div className="w-full flex flex-col">
                <div className="mt-3 flex flex-col justify-center">
                  {submittedAssignment !== false &&
                    submittedAssignment.map((file, index) => (
                      <Tag
                        color="green"
                        className="flex flex-row hover:bg-green-500 hover:text-white items-center p-2"
                        key={index}
                      >
                        <div className="h-full mr-2 flex flex-col items-center justify-center ">
                          <FileOutlined className="text-[35px]" />
                        </div>
                        <div onClick={handleClickedNote}>
                          <p className="text-[16px] font-semibold">
                            {file.submisionDoc.split("/")[1]}
                          </p>
                          <p>{dayjs(file.submissionDate).format("YYYY-MM-DD")}</p>
                          <p>{file.submissionTime}</p>
                        </div>
                        <div className="w-full flex flex-col items-end mr-4">
                          <Popconfirm
                            placement="topRight"
                            title="Delete"
                            description="Are you sure you want to delete Submitted one"
                            open={opendeleteConfirmation}
                            onConfirm={handledeleteUploadedSubmission}
                            okButtonProps={{
                              loading: submissionDeleteLoading,
                              className: "bg-blue-500 hover:bg-blue-600",
                            }}
                            onCancel={handleClosingDeletingSubmitted}
                          >
                            <button onClick={() => setdeleteConfirmation(true)}>
                              <DeleteOutlined className="text-[15px] p-1 hover:bg-red-500 rounded-md" />
                            </button>
                          </Popconfirm>
                        </div>
                      </Tag>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default SubmissionModel;
