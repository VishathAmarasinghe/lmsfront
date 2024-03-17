import { Col, ConfigProvider, Form, Input, Row } from "antd";
import React from "react";
import StudentCard from "../Components/Registration/StudentCard";
import RegistationBill from "../Components/Registration/RegistationBill";

const RegistrationPaymentProceeder = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center   shadow-2xl  overflow-y-auto  ">
       <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">Registration Billing</h1>
      </div>
      <div className="w-[95%]   flex flex-row justify-around rounded-xl bg-white p-2 shadow-xl ring-1 ring-gray-300">
        <div className="w-1/2  flex flex-col justify-around items-center p-1 mt-1  rounded-lg">
          <div className=" w-[95%]">
            <ConfigProvider
            theme={{
              token: {
                colorBgContainer:"#EBEEFF",
                
                // fontSize:"15px",
                


                
              },
            }}
            >
            <div>
              <p className="text-[19px] mb-2 font-medium">Billing info</p>
            </div>
            <Form
            className="font-medium text-[14px]"
              layout="horizontal"
              hideRequiredMark
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              labelAlign="left"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                  className="font-medium"
                    name="regNo"
                    label="Register No"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Registration No",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter registration no" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="studentName"
                    label="Student Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter student name",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter student name" />
                  </Form.Item>
                  <Form.Item
                    name="regfee"
                    label="RegistrationFee"
                    rules={[
                      {
                        required: true,
                        message: "Please enter registrationFee",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter registration fee" />
                  </Form.Item>
                  <Form.Item
                    name="additionalCharges"
                    label="Additional Charges"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Additional Charges",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter Additional Charges" />
                  </Form.Item>
                  <Form.Item
                    name="payment"
                    label="Payment"
                    rules={[
                      {
                        required: true,
                        message: "Please enter payment",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter payment" />
                  </Form.Item>
                  <Form.Item
                    name="balance"
                    label="Balance"
                    rules={[
                      {
                        required: true,
                        message: "Please enter balance",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter  Balance" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
                          
            </ConfigProvider>
          </div>

          <div className="flex flex-col  w-full items-center mt-1">
            <button className="bg-blue-500 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-blue-600 rounded-lg scalar-card">
              Print Card
            </button>
            <button className="bg-green-700 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-green-800 rounded-lg scalar-card">
              Proceed Payment
            </button>
            <button className=" p-2 w-[96%] mb-2  text-red-700 border-2 border-red-700 font-bold hover:bg-red-700 hover:text-white rounded-lg scalar-card">
              Cancle
            </button>
          </div>
        </div>
        <div className="w-[40%]  mt-2 bg-white flex flex-col items-center p-2 rounded-xl">
          <div className="w-[75%] mt-4  flex ">
            <StudentCard />
          </div>
          
             <RegistationBill />
      
          
        </div>
      </div>
    </div>
  );
};

export default RegistrationPaymentProceeder;

{
  /* <div className="flex flex-row w-[80%] border-2 border-green-500 justify-between items-center my-2">
            <p className="text-[16px] font-inter font-semibold">Student Number</p>
            <Input value={"sd233301"}  className="w-[50%]" />
          </div> */
}
