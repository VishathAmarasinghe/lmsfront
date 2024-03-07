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
const { Option } = Select;
const { Panel } = Collapse;

const ProfileEditingDrawer = ({ open, setOpen }) => {
    const [newpasswordVisible,setnewPasswordVisible]=useState(false);
    const [newConfirmPasswordVisible,setNewConfirmPasswordVisible]=useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  
  return (
    <>
      <Drawer
        getContainer={false}
        title="Update Account"
        //   width={720}
        onClose={onClose}
        open={open}
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
              Update
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter Email",
                  },
                ]}
              >
                <Input placeholder="Please enter your new email" />
              </Form.Item>
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
                <Input placeholder="Please enter your new Phone No" />
              </Form.Item>
              <Form.Item
                name="Address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter new Address",
                  },
                ]}
              >
                <Input placeholder="Please enter your new address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <div className="w-full border-2 border-blue-600">
              <Collapse>
                <Panel header="Change Password" key="1">
                  <Col span={24}>
                    <Form.Item
                      name="password"
                      label="Old Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Old Password",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter your Old Password" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter New Password",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Please enter New Password"
                        visibilityToggle={{
                          visible: newpasswordVisible,
                          onVisibleChange: setnewPasswordVisible,
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Confirm Password"
                      label="Confirm New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter New Password again",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Please enter New Password"
                        visibilityToggle={{
                          visible: newConfirmPasswordVisible,
                          onVisibleChange: setNewConfirmPasswordVisible,
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Panel>
              </Collapse>
              
            </div>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ProfileEditingDrawer;
