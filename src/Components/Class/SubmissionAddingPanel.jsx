import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import moment from "moment";
import dayjs from "dayjs";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  TimePicker,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  UpdateUploadSubmissionPanel,
  getnotes,
  uploadSubmissionPanel,
} from "../../API";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAccordianByClassID } from "../../Actions/class";
import {
  stringEmptyValidation,
  stringValidationWithLenght,
} from "../../Utils/Validations";
import NoteCard from "../UploadMaterials/NoteCard";
import SubmissionPanelUploadingCard from "../UploadMaterials/SubmissionPanelUploadingCard";
const { Option } = Select;
const { Panel } = Collapse;
const SubmissionAddingPanel = ({
  accID,
  submissionaddingpanelOpen,
  setSubmissionAddingPanelOpen,
  submissionInfo,
}) => {
  const showDrawer = () => {
    setSubmissionAddingPanelOpen(true);
  };

  const onClose = () => {
    setSubmissionAddingPanelOpen(false);
    setSubmissionPanelData(null);
    setDeleteActionedFiles([]);
    setPreviousUploadedFiles([]);
    setFileList([]);

    // form.resetFields();
    // form.
  };

  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const { classID } = useParams();
  const [submissionPanelData, setSubmissionPanelData] = useState({});
  const [overallValidateError, setOverallValidateError] = useState(null);
  const [previousUploadedFiles, setPreviousUploadedFiles] = useState(null);
  const [deleteActionedFiles, setDeleteActionedFiles] = useState([]);

  useEffect(() => {
    if (submissionaddingpanelOpen == true && submissionInfo != null) {
      console.log("submission data ", submissionInfo);
      setSubmissionPanelData({ ...submissionInfo }, deleteActionedFiles);
      setPreviousUploadedFiles(submissionInfo?.notes);
    } else {
      //put accordianID
      setSubmissionPanelData({ ...submissionInfo, accordianID: accID });
    }
  }, [submissionaddingpanelOpen]);

  useEffect(() => {
    setSubmissionPanelData({
      ...submissionPanelData,
      deleteActionedFiles: deleteActionedFiles,
    });
  }, [deleteActionedFiles]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const fetchFiles = async (fileList) => {
    for (const file of fileList) {
      try {
        const notes = await getnotes(file.noteLocation);
        console.log("notes ", notes.data);
        setFileList([...fileList, notes.data]);
      } catch (error) {
        console.log("file fetching error!");
        message.error("file fetching error!");
      }
    }
  };

  const checkValidationStatusToSubmit = () => {
    let errorStatus = true;
    console.log("overall validate error ", overallValidateError);
    for (const key in overallValidateError) {
      if (overallValidateError[key] !== "") {
        return false;
      }
    }
    const requiredcolumns = ["subPanelName", "subOpenDate", "subOpenTime"];
    for (const value of requiredcolumns) {
      if (
        submissionPanelData[value] == "" ||
        submissionPanelData[value] == null ||
        submissionPanelData[value] == undefined
      ) {
        if (
          submissionPanelData?.additionalInfo[value] == "" ||
          submissionPanelData?.additionalInfo[value] == null ||
          submissionPanelData?.additionalInfo[value] == undefined
        ) {
          message.error(`please fill mandatory columns (${value}) `);
          errorStatus = false;
        }
      }
    }
    const firstDateTime = `${dayjs(submissionPanelData["subOpenDate"]).format("YYYY-MM-DD")} ${submissionPanelData["subOpenTime"]}`;
    const secondDateTime = `${dayjs(submissionPanelData["subCloseDate"]).format("YYYY-MM-DD")} ${submissionPanelData["subCloseTime"]}`;

    // Compare the dates

    console.log("first data ",firstDateTime);
    console.log("last data ",secondDateTime);

    if (moment(firstDateTime).isBefore(secondDateTime)) {
      // First date-time is before the second one
    } else if (moment(firstDateTime).isSame(secondDateTime)) {
      console.log("Both date-times are the same.");
      message.error("Both start and end date-times are the same.");
      errorStatus = false;
    } else {
      console.log("First date-time is after the second one.");
      message.error("start date-time is after the end date time.");
      errorStatus = false;
    }

    return errorStatus;
  };

  const handleSubmissionPanelSubmit = async () => {
    if (submissionInfo != null) {
      handleUpdateSubmissionPanelSubmit();
    } else {
      handleNewSubmissionPanelSubmit();
    }
  };

  const handleNewSubmissionPanelSubmit = async () => {
    console.log("submitting Data submissions ");

    if (checkValidationStatusToSubmit()) {
      const formData = new FormData();
      formData.append(
        "submissionPanelData",
        JSON.stringify(submissionPanelData)
      );
      fileList.forEach((file) => {
        console.log("file object ", file.originFileObj);
        formData.append("files", file.originFileObj);
      });

      const submissionResult = await uploadSubmissionPanel(formData);
      if (submissionResult.status === 200) {
        message.success("Submission panel Uploaded");
      }

      dispatch(getAllAccordianByClassID(classID));
      onClose();
    }
  };

  const handleUpdateSubmissionPanelSubmit = async () => {
    console.log("submitting Data submissions ");

    if (checkValidationStatusToSubmit()) {
      const formData = new FormData();
      formData.append(
        "submissionPanelData",
        JSON.stringify(submissionPanelData)
      );
      fileList.forEach((file) => {
        console.log("file object ", file.originFileObj);
        formData.append("files", file.originFileObj);
      });

      const submissionResult = await UpdateUploadSubmissionPanel(formData);
      if (submissionResult.status === 200) {
        message.success("Submission panel Uploaded");
      }

      dispatch(getAllAccordianByClassID(classID));
      onClose();
    } else {
      message.error("Please fill mandatory columns");
    }
  };

  useEffect(() => {
    console.log("submission data ", submissionPanelData);
  }, [submissionPanelData]);

  const handleFormValuesChange = (e) => {
    setSubmissionPanelData({
      ...submissionPanelData,
      [e.target.name]: e.target.value,
    });
    setOverallValidateError({
      ...overallValidateError,
      [e.target.name]: stringValidationWithLenght(e.target.value, 29),
    });
  };

  const handleAdditionalInfo = (value) => {
    setSubmissionPanelData({ ...submissionPanelData, additionalInfo: value });
    setOverallValidateError({
      ...overallValidateError,
      additionalInfo: stringEmptyValidation(value),
    });
  };

  const handleDataChange = (date, dateString, type) => {
    if (type == "subOpenDate") {
      setSubmissionPanelData({
        ...submissionPanelData,
        subOpenDate: dateString,
      });
    } else if (type == "subCloseDate") {
      setSubmissionPanelData({
        ...submissionPanelData,
        subCloseDate: dateString,
      });
    }
  };

  const handleTimeChange = (time, timeString, type) => {
    if (type == "subOpenTime") {
      setSubmissionPanelData({
        ...submissionPanelData,
        subOpenTime: timeString,
      });
    } else if (type == "subCloseTime") {
      setSubmissionPanelData({
        ...submissionPanelData,
        subCloseTime: timeString,
      });
    }
  };

  const suffixIcon = (
    <Button type="primary" className="bg-blue-700 hover:bg-blue-800">
      OK
    </Button>
  );

  return (
    <>
      <Drawer
        // getContainer={false}
        title={`${submissionInfo ? "Update Submission" : "New Submission"}`}
        width={720}
        onClose={onClose}
        open={submissionaddingpanelOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={handleSubmissionPanelSubmit}
              className="bg-blue-700 px-2 py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              {submissionInfo ? "Update " : "Open"}
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                validateStatus={
                  overallValidateError?.subPanelName ? "error" : "success"
                }
                help={overallValidateError?.subPanelName || ""}
                label="Submission Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="subPanelName"
                  value={submissionPanelData?.subPanelName}
                  onChange={handleFormValuesChange}
                  placeholder="Please enter name for submission"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Submission Starting date"
                rules={[
                  {
                    required: true,
                    message: "Please enter submission starting date",
                  },
                ]}
              >
                {/* onChange={(date,dateString)=>setSubmissionPanelData({...submissionPanelData,startDate:dateString})} */}
                <DatePicker
                  value={dayjs(submissionPanelData?.subOpenDate) || dayjs()}
                  onChange={(date, dataString) =>
                    handleDataChange(date, dataString, "subOpenDate")
                  }
                  name="subOpenDate"
                  format="YYYY-MM-DD"
                  defaultValue={dayjs()}
                  minDate={dayjs()}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Submission Starting Time"
                rules={[
                  {
                    required: true,
                    message: "Please enter Time",
                  },
                ]}
              >
                <TimePicker
                  name="subOpenTime"
                  value={
                    submissionPanelData?.subOpenTime === "00:00:00"
                      ? null
                      : moment(submissionPanelData?.subOpenTime, "HH:mm:ss")
                  }
                  onChange={(time, timeString) =>
                    handleTimeChange(time, timeString, "subOpenTime")
                  }
                  format="HH:mm:ss"
                  defaultValue={moment()}
                  defaultPickerValue={moment()}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Submission Closing date"
                rules={[
                  {
                    required: true,
                    message: "Please enter submission Closing date",
                  },
                ]}
              >
                <DatePicker
                  name="subCloseDate"
                  value={dayjs(submissionPanelData?.subCloseDate) || dayjs()}
                  onChange={(date, dateString) =>
                    handleDataChange(date, dateString, "subCloseDate")
                  }
                  defaultValue={dayjs()}
                  minDate={dayjs()}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Submission Closing Time"
                rules={[
                  {
                    required: true,
                    message: "Please enter Closing Time",
                  },
                ]}
              >
                <TimePicker
                  name="subCloseTime"
                  value={
                    submissionPanelData?.subCloseTime === "00:00:00"
                      ? null
                      : moment(submissionPanelData?.subCloseTime, "HH:mm:ss")
                  }
                  onChange={(time, timeString) =>
                    handleTimeChange(time, timeString, "subCloseTime")
                  }
                  format="HH:mm:ss"
                  defaultValue={moment()}
                  defaultPickerValue={moment()}
                  minDate={moment()}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                // name="additionInfo"
                validateStatus={
                  overallValidateError?.additionInfo ? "error" : "success"
                }
                help={overallValidateError?.additionInfo || ""}
                label="Additional Infomation"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <ReactQuill
                  name="additionInfo"
                  value={submissionPanelData?.additionalInfo}
                  onChange={(info) => handleAdditionalInfo(info)}
                  theme="snow"
                />
              </Form.Item>

              {previousUploadedFiles?.map((file) => (
                <SubmissionPanelUploadingCard
                  previousUploadedFiles={previousUploadedFiles}
                  setPreviousUploadedFiles={setPreviousUploadedFiles}
                  setDeleteActionedFiles={setDeleteActionedFiles}
                  deleteActionedFiles={deleteActionedFiles}
                  note={file}
                />
              ))}
              <Form.Item label="Additional materials">
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  fileList={fileList}
                  multiple
                  onChange={handleFileChange}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default SubmissionAddingPanel;
