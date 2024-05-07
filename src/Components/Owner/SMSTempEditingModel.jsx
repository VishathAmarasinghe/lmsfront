import React, { useEffect, useState } from "react";
import { Button, Descriptions, Form, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { email_SMS_CredentialtemplateValidation } from "../../Utils/Validations";
import { updateSMSTemplate } from "../../API";

const SMSTempEditingModel = ({
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
    SetValidationErrors({...validationErrors,message:email_SMS_CredentialtemplateValidation(e.target.value)});
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
    setSMStemplateData({...SMStemplateData,message:e.target.value});
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
            
            name="firstName"
            onChange={handleChange}
            value={SMStemplateData?.message}
            placeholder="Please enter your Message"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SMSTempEditingModel;
