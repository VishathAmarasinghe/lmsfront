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
import KanbanBoard from "./KanbanBoard";

const { Option } = Select;
const { Panel } = Collapse;

const NewAccordianAdder = ({ openeditingDrawer, setOpeneditingDrawer }) => {
  const [changingboardvalue,setchangingboardvalue]=useState("");
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
        title="New Accordian"
        width={310}
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
              Add
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="boardName"
                label="Accordian Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Name to create accordian",
                  },
                ]}
              >
                <Input onChange={(e)=>setchangingboardvalue(e.target.value)} placeholder="Please enter suitable name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div>
            <p>Sample</p>
            <Collapse
            items={[
                {
                    key:"1",
                    label:changingboardvalue,
                    children:<p>Content Here</p>
                }
            ]}
            />
        </div>
      </Drawer>
    </>
  );
};

export default NewAccordianAdder;
