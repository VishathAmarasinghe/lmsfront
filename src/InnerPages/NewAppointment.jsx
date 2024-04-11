import React from "react";
import DropdownSelector from "../Components/AppointmentComp/DropdownSelector";
import DatePickerComp from "../Components/AppointmentComp/DatePicker";
import TimePickercomp from "../Components/AppointmentComp/TimePicker";
import { Col, ConfigProvider, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";
import AppointmentTeacherCard from "../Components/AppointmentComp/AppointmentTeacherCard";

const NewAppointment = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Attendance Marking
        </h1>
      </div>
      <div className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className="w-full h-[100%]  flex flex-col items-center  bg-white  rounded-2xl">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: "#EBEEFF",
                },
              },
            }}
          >
            <Form
              layout="vertical"
              className=" font-medium w-[90%] h-[85%] mt-4 overflow-y-hidden overflow-x-hidden"
              hideRequiredMark
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="student"
                    label="Select Student"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Student ",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Please select a Student"
                      options={""}
                      dropdownStyle={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                </Col>
               
              </Row>
              <div className=" w-full h-[53%] lg:h-[43%] overflow-y-auto mb-2 ">
                <div className="w-full grid grid-cols-1 lg:grid-cols-4">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <AppointmentTeacherCard key={index} />
                  ))}
                </div>
              </div>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="title"
                    label="Title(Reason)"
                    rules={[
                      {
                        required: true,
                        message: "Please add a Title ",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Please enter a title"
                      style={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please add a Description ",
                      },
                    ]}
                  >
                    <TextArea
                      rows={2}
                      placeholder="Please enter a small description mentioning about what to discuss"
                      style={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </ConfigProvider>
          <div className="flex flex-col w-[90%] mt-1 items-end">
            <button className="w-full lg:w-[30%] bg-blue-500 hover:bg-blue-600 font-medium text-white p-2 rounded-md">
              Submit Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
