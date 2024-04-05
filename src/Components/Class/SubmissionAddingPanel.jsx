import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import moment from 'moment';
import dayjs from 'dayjs';
import 'react-quill/dist/quill.snow.css';
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
  TimePicker,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { uploadSubmissionPanel } from "../../API";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAccordianByClassID } from "../../Actions/class";
const { Option } = Select;
const { Panel } = Collapse;
const SubmissionAddingPanel = ({ accID,submissionaddingpanelOpen, setSubmissionAddingPanelOpen}) => {
  
    useState(false);
  const showDrawer = () => {
    setSubmissionAddingPanelOpen(true);
  };
  const onClose = () => {
    setSubmissionAddingPanelOpen(false)
    // form.resetFields();
    // form.
  };

  const [form]=Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [additionalinfo,setAdditionalInfo]=useState("");
  const dispatch=useDispatch();
  const {classID}=useParams();
  const [submissionPanelData,setSubmissionPanelData]=useState({
    title:"",
    startDate:"",
    startTime:"",
    closeDate:"",
    closeTime:"",
    accID:accID,
    additionInfo:"",

  });

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmissionPanelSubmit = async() => {
    const formValues = form.getFieldsValue();

    console.log("get selected data ",formValues);
  
    const formattedStartDate = formValues.startDate ? dayjs(formValues.startDate).format('YYYY-MM-DD') : null;
    const formattedStartTime = formValues.startTime ? dayjs(formValues.startTime).format('HH:mm:ss') : null;
    const formattedCloseDate = formValues.closeDate ? dayjs(formValues.closeDate).format('YYYY-MM-DD') : null;
    const formattedCloseTime = formValues.closeTime ? dayjs(formValues.closeTime).format('HH:mm:ss') : null;

  const formattedSubmissionPanelData = {
    ...formValues,
    accID: accID,
    additionInfo: String(additionalinfo),
    startDate: formattedStartDate,
    startTime: formattedStartTime,
    closeDate: formattedCloseDate,
    closeTime: formattedCloseTime,
  };
  
    setSubmissionPanelData(formattedSubmissionPanelData);
  
    console.log("submitting Data submissions ", formattedSubmissionPanelData);
  
    const formData = new FormData();
    formData.append("submissionPanelData", JSON.stringify(formattedSubmissionPanelData));
    fileList.forEach((file) => {
      console.log("file object ", file.originFileObj);
      formData.append("files", file.originFileObj);
    });
  
    const submissionResult = await uploadSubmissionPanel(formData);
    if (submissionResult.status === 200) {
      message.success("Submission panel Uploaded");
    } else {
      message.error("Error creating submission panel")
    }
  
    dispatch(getAllAccordianByClassID(classID));
    onClose();
  };


  useEffect(()=>{
    console.log("submission time ",submissionPanelData);
  },[submissionPanelData])


  const handleFormValuesChange = (changedValues, allValues) => {
    setSubmissionPanelData({ ...submissionPanelData, ...changedValues });
  };

  const suffixIcon = (
    <Button type="primary" className="bg-blue-700 hover:bg-blue-800">
      OK
    </Button>
  );


  return (
    <>
      <Drawer
        getContainer={false}
        title="Add Class"
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
              Open
            </button>
          </Space>
        }
      >
        <Form 
        initialValues={submissionPanelData}
        form={form}
        onChange={handleFormValuesChange}
        layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Submission Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter Submission Title",
                  },
                ]}
              >
                <Input placeholder="Please enter name for submission" />
              </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
              <Form.Item
               name="startDate"
                label="Submission Starting date"
                rules={[
                  {
                    required: true,
                    message: "Please enter submission starting date",
                  },
                ]}
              >
              {/* onChange={(date,dateString)=>setSubmissionPanelData({...submissionPanelData,startDate:dateString})} */}
                <DatePicker format="YYYY-MM-DD" defaultValue={dayjs()} minDate={dayjs()}    className="w-full"/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name="startTime"
                label="Submission Starting Time"
                rules={[
                  {
                    required: true,
                    message: "Please enter Time",
                  },
                ]}
              >
                <TimePicker   format="HH:mm:ss" defaultValue={dayjs()} defaultPickerValue={dayjs()} minDate={dayjs()} className="w-full"/>
              </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                name="closeDate"
                label="Submission Closing date"
                rules={[
                  {
                    required: true,
                    message: "Please enter submission Closing date",
                  },
                ]}
              >
                <DatePicker defaultValue={dayjs()} minDate={dayjs()}  className="w-full"/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name="closeTime"
                label="Submission Closing Time"
                rules={[
                  {
                    required: true,
                    message: "Please enter Closing Time",
                  },
                ]}
              >
                <TimePicker format="HH:mm:ss"  defaultValue={dayjs()} defaultPickerValue={dayjs()} minDate={dayjs()} className="w-full"/>
              </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
              <Form.Item
                // name="additionInfo"
                label="Additional Infomation"
                rules={[
                  {
                    required: true,
                    message: "Please enter information",
                  },
                ]}
              >
                <ReactQuill value={additionalinfo} onChange={setAdditionalInfo}   theme="snow"/>
              </Form.Item>
              <Form.Item
                
                label="Additional materials"
              >
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
