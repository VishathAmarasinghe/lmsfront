import React, { useEffect, useState } from "react";
import { Button, Col, Descriptions, Form, Modal, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { email_SMS_CredentialtemplateValidation, stringEmptyValidation } from "../../Utils/Validations";
import { updateSMSTemplate } from "../../API";

const EmailTemplateEditingModel = ({
  selectedSMSTemplate,
  smsTempEditingModelOpen,
  setSmsTempEditingModelOpen,
}) => {
    const [SMStemplateData,setSMStemplateData]=useState(null);
    const [validationErrors,SetValidationErrors]=useState(null);

  useEffect(()=>{
    if (smsTempEditingModelOpen) {
        setSMStemplateData({...selectedSMSTemplate});
    }
  },[smsTempEditingModelOpen])


  const handleOk = () => {
    setSmsTempEditingModelOpen(false);
  };

  const handleCancel = () => {
    setSmsTempEditingModelOpen(false);
  };

  const items = [
    {
      key: "1",
      label: "SMS Template ID",
      children: selectedSMSTemplate?.SMStempID,
    },
    {
      key: "2",
      label: "Title Name",
      children: selectedSMSTemplate?.name,
    },
    {
      key: "3",
      label: "Last Update Date",
      children: selectedSMSTemplate?.updateDate,
    },
    {
      key: "4",
      label: "Last Update Time",
      children: selectedSMSTemplate?.updateTime,
    },
  ];

  const validationChecker=(e)=>{
    if (e.target.name=="message") {
        SetValidationErrors({...validationErrors,message:email_SMS_CredentialtemplateValidation(e.target.value)});
    }else if (e.target.name=="subject") {
        SetValidationErrors({...validationErrors,subject:stringEmptyValidation(e.target.value)});
    }
  }


  const handleUpdateTemplate=async()=>{
    if (validationErrors?.message!="") {
        message.error("please add mandatory parameters in the message")
    }else{
        try {
            const updateResult=await updateSMSTemplate(SMStemplateData);
            if (updateResult.status==200) {
                message.success("SMS template Updated")
            }
        } catch (error) {
            message.error("SMS template Updating Error!")
            console.log("Error ",error);
        }
    }
  }



  const handleChange=(e)=>{
        setSMStemplateData({...SMStemplateData,[e.target.name]:e.target.value});
        validationChecker(e);
  }

  return (
    <Modal
      title="SMS Template Editing Model"
      width={"60%"}
      open={smsTempEditingModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <Descriptions bordered items={items} column={2} />
      <Form layout="vertical" className="mt-2">
        <Row gutter={16}>
        <Col span={24}>
        <Form.Item
          label="Enter Subject"
          validateStatus={validationErrors?.subject ? "error" : "success"}
          help={validationErrors?.subject || "You cannot remove `{{username}}` `{{password}}` `{{URL}}`"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea
            className="bg-[#EBEEFF]"
            rows={2}
            name="subject"
            onChange={handleChange}
            value={SMStemplateData?.subject}
            placeholder="Please enter your Message"
          />
        </Form.Item>
        </Col>

        </Row>
        <Row gutter={16}>
            <Col span={24}>
        <Form.Item
          label="Enter Message"
          validateStatus={validationErrors?.message ? "error" : "success"}
          help={validationErrors?.message || "You cannot remove `{{username}}` `{{password}}` `{{URL}}`"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea
            className="bg-[#EBEEFF]"
            rows={5}
            
            name="message"
            onChange={handleChange}
            value={SMStemplateData?.message}
            placeholder="Please enter your Message"
          />
        </Form.Item>
        </Col>
        </Row>
      </Form>
    </Modal>
  );
};




export default EmailTemplateEditingModel