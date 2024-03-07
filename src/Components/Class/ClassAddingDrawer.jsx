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
} from "antd";
const { Option } = Select;
const { Panel } = Collapse;
const ClassAddingDrawer = ({ addingCompOpen, setAddingCompOpen }) => {
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [newConfirmPasswordVisible, setNewConfirmPasswordVisible] =
    useState(false);
  const showDrawer = () => {
    setAddingCompOpen(true);
  };
  const onClose = () => {
    setAddingCompOpen(false);
  };

  return (
    <>
      <Drawer
        getContainer={false}
        title="Add Class"
        //   width={720}
        onClose={onClose}
        open={addingCompOpen}
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
              Add
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="classname"
                label="Class Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Class Name",
                  },
                ]}
              >
                <Input placeholder="Please enter a Class Name" />
              </Form.Item>
              <Form.Item
                name="classday"
                label="Class Conducting Day"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Conducting day",
                  },
                ]}
              >
                <Input placeholder="Please enter class day" />
              </Form.Item>
              <Form.Item
                name="classtime"
                label="Class Conducting Time"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Input placeholder="Please enter class time" />
              </Form.Item>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[
                  {
                    required: true,
                    message: "Please enter grade",
                  },
                ]}
              >
                <InputNumber placeholder="Please enter the grade"  width=""/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ClassAddingDrawer;
