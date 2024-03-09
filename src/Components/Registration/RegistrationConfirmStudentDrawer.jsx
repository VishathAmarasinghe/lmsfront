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
  Row,
  Select,
  Space,
} from "antd";
import ProfilePicUploading from "../TeacherComp/ProfilePicUploading";

const { Option } = Select;
const { Panel } = Collapse;

const RegistrationConfirmStudentDrawer = ({
  openeditingDrawer,
  setOpeneditingDrawer,
}) => {
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [newConfirmPasswordVisible, setNewConfirmPasswordVisible] =
    useState(false);
  const showDrawer = () => {
    setOpeneditingDrawer(true);
  };
  const onClose = () => {
    setOpeneditingDrawer(false);
  };

  return (
    <>
      <Drawer
        getContainer={false}
        title="Verify Student"
        width={720}
        onClose={onClose}
        open={openeditingDrawer}
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
              Verify
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Profile Picture"
                label="Profile Picture"
                rules={[
                  {
                    required: true,
                    message: "Please add your profile pic",
                  },
                ]}
              >
                <ProfilePicUploading />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="FirstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter First Name",
                  },
                ]}
              >
                <Input placeholder="Please enter your First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter last name",
                  },
                ]}
              >
                <Input placeholder="Please enter your last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter Address",
                  },
                ]}
              >
                <Input placeholder="Please enter your address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter Email",
                  },
                ]}
              >
                <Input placeholder="Please enter your email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="school"
                label="School"
                rules={[
                  {
                    required: true,
                    message: "Please enter Lecturing School",
                  },
                ]}
              >
                <Input placeholder="Please enter your school" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Phone No"
                label="Phone No"
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone No",
                  },
                ]}
              >
                <Input placeholder="Please enter your Phone No" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gardientName"
                label="Gardient Name"
                rules={[
                  {
                    required: true,
                    message: "Gardient Name",
                  },
                ]}
              >
                <Input placeholder="Please enter your Gardient Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="GardientPhoneNo"
                label="Gardient Phone No"
                rules={[
                  {
                    required: true,
                    message: "Please enter gardient phone No",
                  },
                ]}
              >
                <Input placeholder="Please enter your gardient phone No" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default RegistrationConfirmStudentDrawer;
