import React, { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
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
const { Option } = Select;
const { Panel } = Collapse;
const SubmissionAddingPanel = ({ submissionaddingpanelOpen, setSubmissionAddingPanelOpen}) => {
  
    useState(false);
  const showDrawer = () => {
    setSubmissionAddingPanelOpen(true);
  };
  const onClose = () => {
    setSubmissionAddingPanelOpen(false)
    form.resetFields();
  };

  const [form]=Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submissionPanelData,setSubmissionPanelData]=useState({
    title:"",
    startDate:"",
    startTime:"",
    closeDate:"",
    closeTime:"",
    additionInfo:"",

  });

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmissionPanelSubmit = async() => {

    const formValues = form.getFieldsValue();
    

    const formattedSubmissionPanelData = {
      ...formValues,
      startDate: formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : null,
      startTime: formValues.startTime ? formValues.startTime.format('HH:mm:ss') : null,
      closeDate: formValues.closeDate ? formValues.closeDate.format('YYYY-MM-DD') : null,
      closeTime: formValues.closeTime ? formValues.closeTime.format('HH:mm:ss') : null,
    };

    setSubmissionPanelData(formattedSubmissionPanelData);

    console.log("submiting Data submissions ",submissionPanelData);

    const formData = new FormData();
    formData.append("submissionPanelData", JSON.stringify(submissionPanelData));
    fileList.forEach((file) => {
      console.log("file object ",file.originFileObj);
      formData.append("files", file.originFileObj);
    });
  
    const submissioResult=await uploadSubmissionPanel(formData);
    if (submissioResult.status===200) {
      message.success("submission panel Uploaded");
    }else{
      message.error("Error creating submission panel")
    }

    onClose();
  };
  


  const handleFormValuesChange = (changedValues, allValues) => {
    setSubmissionPanelData({ ...submissionPanelData, ...changedValues });
  };
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
                <DatePicker className="w-full"/>
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
                <TimePicker className="w-full"/>
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
                <DatePicker className="w-full"/>
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
                <TimePicker className="w-full"/>
              </Form.Item>
              </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
              <Form.Item
                name="additionInfo"
                label="Additional Infomation"
                rules={[
                  {
                    required: true,
                    message: "Please enter information",
                  },
                ]}
              >
                <ReactQuill  theme="snow"/>
              </Form.Item>
              <Form.Item
                name="addiinfo"
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
