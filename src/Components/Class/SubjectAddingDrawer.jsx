import { Modal, Button, Row, Col, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { subjectMedium } from "../../Utils/defaultValues";
import { stringValidation, stringValidationWithLenght } from "../../Utils/Validations";

const SubjectAddingDrawer = ({ subjectAddingDrawerOpen, setSubjectAddingDrawerOpen }) => {
  const [validationChecker,setValidationChecker]=useState(null);
  const [subjectData,setSubjectData]=useState(null);
  const handleCloseDrawer = () => {
    setSubjectAddingDrawerOpen(false);
  };

  const handleSaveSubject=async()=>{
    try {
      
    } catch (error) {
      console.log("error ",error);
      message.error("New Subject adding error!")
    }
  }


  const handleInputChange=(e)=>{
    setSubjectData({...subjectData,[e.target.name]:e.target.value});
    handleValidationError(e);
  }


  const handleValidationError=(e)=>{
    if (e.target.name=="subjectDescription") {
      setValidationChecker({...validationChecker,subjectDescription:stringValidation(e.target.value)})
    }else if(e.target.name=="subjectName"){
      setValidationChecker({...validationChecker,subjectName:stringValidationWithLenght(e.target.value,39)});
    }
  }

  const handleMediumSelect=(value)=>{
    setSubjectData({...subjectData,medium:value})
  }

  return (
    <Modal
      open={subjectAddingDrawerOpen}
      onCancel={handleCloseDrawer}
      title="Add New Subject"
      footer={[
        <Button key="cancel" onClick={handleCloseDrawer}>
          Cancel
        </Button>,
        <Button key="submit" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleCloseDrawer}>
          OK
        </Button>,
      ]}
    >
      <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          
            <Form.Item
              label="Subject Name"
              validateStatus={validationChecker?.subjectName?"error":"success"}
              help={validationChecker?.subjectName || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="subjectName" onChange={handleInputChange} value={subjectData?.subjectName} placeholder="Please enter a Subject Name" />
            </Form.Item>

        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>

            <Form.Item
             
              label="Subject Medium"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select  name="medium" onChange={handleMediumSelect} value={subjectData?.medium}  options={subjectMedium} />
            </Form.Item>

        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>

            <Form.Item
              validateStatus={validationChecker?.subjectDescription?"error":"success"}
              help={validationChecker?.subjectDescription || ""}
              label="Subject Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea   name="subjectDescription" placeholder="Please enter subject description" />
            </Form.Item>

        </Col>
      </Row>
      </Form>
    </Modal>
  );
};

export default SubjectAddingDrawer;
