import React, { useEffect, useState } from "react";
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
  message,
} from "antd";
import KanbanBoard from "./KanbanBoard";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

import { createNewAccordian, getAllAccordianByClassID } from "../../Actions/class";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const { Option } = Select;
const { Panel } = Collapse;

const NewAccordianAdder = ({ openeditingDrawer, setOpeneditingDrawer,subAccID,setSubAccID }) => {
  const {selectedClass}=useSelector((state)=>state.classes);
  const [form] = Form.useForm();
  const dispatch=useDispatch();
  const {classID} =useParams();
  const [accordianData, setAccordianData] = useState({
    accName: "",
    accDescription: "",
    classID: classID,
    accType: "accordian",
    subAccID:subAccID
  });


  useEffect(()=>{
    setAccordianData({...accordianData,classID:classID})
  },[classID])


  useEffect(()=>{
    setAccordianData({...accordianData,subAccID:subAccID})
  },[subAccID])


  const showDrawer = () => {
    setOpeneditingDrawer(true);
  };

  const onClose = () => {
    setOpeneditingDrawer(false);
    setAccordianData({
      accName: "",
      accDescription: "",
      classID: "",
      accType: "accordian",
      subAccID:subAccID
    })
    form.resetFields();
    dispatch(getAllAccordianByClassID(classID));
    
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setAccordianData({ ...accordianData, ...changedValues });
  };

  const handleSubmitAccordiant=async()=>{
    console.log("all acc details",accordianData);
   const result= await createNewAccordian(accordianData);
   if (result.status==200) {
    message.success("Accordian Created Successfully")
   }else{
    message.error("Error in creating accordian")
   }
   onClose()
  }

  return (
    <>
      <Drawer
        getContainer={false}
        title="New Accordian"
        width={350}
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
              onClick={handleSubmitAccordiant}
              className="bg-blue-700 px-2 py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              Add
            </button>
          </Space>
        }
      >
        <Form
          form={form}
          onValuesChange={handleFormValuesChange}
          layout="vertical"
          initialValues={accordianData}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="accName"
                label="Accordian Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Name to create accordian",
                  },
                ]}
              >
                <Input placeholder="Please enter suitable name" />
              </Form.Item>
              <Form.Item
                name="accDescription"
                label="Accordian Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter Description",
                  },
                ]}
              >
                <TextArea placeholder="description (Not Mandatory)" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div>
          <p>Sample</p>
          <Collapse
            items={[
              {
                key: "1",
                label: accordianData.accName,
                children: (
                  <div className="flex flex-col">
                    <p>{accordianData.accDescription}</p>
                    <p className="text-slate-300">
                      notes,quizzes,uploading go here
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Drawer>
    </>
  );
};

export default NewAccordianAdder;
