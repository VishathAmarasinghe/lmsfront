import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
const { Option } = Select;
const { Panel } = Collapse;
const SubmissionAddingPanel = ({ submissionaddingpanelOpen, setSubmissionAddingPanelOpen}) => {
  
    useState(false);
  const showDrawer = () => {
    setSubmissionAddingPanelOpen(true);
  };
  const onClose = () => {
    setSubmissionAddingPanelOpen(false)
  };

  return (
    <>
      <Drawer
        getContainer={false}
        title="Add Class"
        //   width={720}
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
              onClick={onClose}
              className="bg-blue-700 px-2 py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              Open
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="submittitle"
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
              <Form.Item
                name="StartDate"
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
              <Form.Item
                name="StartDate"
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
              <Form.Item
                name="startTime"
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
              <Form.Item
                name="addiinfo"
                label="Additional Infomation"
                rules={[
                  {
                    required: true,
                    message: "Please enter information",
                  },
                ]}
              >
                <Input placeholder="Please enter additional info if you have " />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default SubmissionAddingPanel;
