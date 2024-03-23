import React, { useState } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  ConfigProvider,
  Switch,
  Tag,
} from "antd";
import HallCard from "./HallCard";

const ClassAddingModel = ({ addingCompOpen, setAddingCompOpen }) => {
  const [onlineMode, setOnlineMode] = useState(false);
  return (
    <Modal
      title="Add New Class"
      centered
      width={"90%"}
      visible={addingCompOpen} // Changed 'open' to 'visible'
      onOk={() => setAddingCompOpen(false)}
      onCancel={() => setAddingCompOpen(false)}
    >
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
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
            </Col>{" "}
            {/* Closed the Col tag */}
            <Col span={12}>
              <Form.Item name="subject" label="Subject">
                <Row gutter={24}>
                  <Col span={16}>
                    <Select />
                  </Col>
                  <Col>
                    <button className="bg-blue-600 p-2 rounded-md text-white">
                      Add new Subject
                    </button>
                  </Col>
                </Row>
              </Form.Item>
              <div></div>
            </Col>{" "}
            {/* Closed the Col tag */}
          </Row>
          <Row gutter={16}>
            {" "}
            {/* Corrected the closing tag */}
            <Col span={12}>
              <Form.Item
                name="grade"
                label="Select Grade"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mode"
                label="Class Mode"
                rules={[
                  {
                    required: true,
                    message: "Please enter class mode",
                  },
                ]}
              >
                <div className="flex flex-row w-full ">
                  <Tag
                    onClick={() => setOnlineMode(true)}
                    className={`${
                      onlineMode ? "bg-green-500 text-white" : ""
                    } p-1 w-[20%] text-center font-medium text-[13px] hover:bg-green-500 hover:text-white`}
                    color="green"
                  >
                    Online
                  </Tag>
                  <Tag
                    onClick={() => setOnlineMode(false)}
                    className={`${
                      !onlineMode ? "bg-blue-500 text-white" : ""
                    } p-1 w-[20%] text-center font-medium text-[13px] hover:bg-blue-500 hover:text-white'`}
                    color="blue"
                  >
                    Physical
                  </Tag>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="day"
                label="Select Day"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          {!onlineMode ? (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="day"
                  label="Select Hall"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Hall",
                    },
                  ]}
                >
                  <div className="grid grid-cols-2 md:grid-cols-6 place-content-center">
                    <HallCard />
                    <HallCard />
                    <HallCard />
                    <HallCard />
                    <HallCard />
                    <HallCard />
                    <HallCard />
                    <HallCard />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="day"
                label="Select Suitable time"
                help="Some Students are attending multiple classes please consider the time frames that student can be able to attend classes"
                rules={[
                  {
                    required: true,
                    message: "Please Select Hall",
                  },
                ]}
              >
                <div className="grid grid-cols-3 grid-rows-8"></div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ClassAddingModel;
