import { Modal, Button, Row, Col, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { subjectMedium } from "../../Utils/defaultValues";
import { stringEmptyValidation, stringLengthValidation, stringValidation, stringValidationWithLenght } from "../../Utils/Validations";
import { addNewGrade, addNewSubject } from "../../API";

const GradeAddingModel = ({gradeAddingDrawerOpen, setGradeAddingDrawer,fetch_grades_subjects_halls }) => {
  const [validationChecker,setValidationChecker]=useState(null);
  const [gradeData,setGradeData]=useState(null);
  const [loading,setLoading]=useState(false);


  const handleCloseDrawer = () => {
    setGradeAddingDrawer(false);
    setGradeData(null);
  };

  const handleSaveSubject=async()=>{
    try {
      if (checkValidationStatusToSubmit()) {
        try {
          setLoading(true);
          const gradeCreationResult=await addNewGrade(gradeData);
          if (gradeCreationResult.status==200) {
            message.success("Grade Added Successfully")
          }
          
        } catch (error) {
          message.error("Grade Adding Error!")
          console.log("error ",error);
        }finally{
          fetch_grades_subjects_halls();
          setLoading(false);
          handleCloseDrawer();
        }
      }
    } catch (error) {
      console.log("error ",error);
      message.error("New Grade adding error!")
    }
  }


  const handleInputChange=(e)=>{
    setGradeData({...gradeData,[e.target.name]:e.target.value});
    handleValidationError(e);
  }


  const checkValidationStatusToSubmit = () => {
    let errorStatus = true;
    console.log("overall validate error ",validationChecker);
    console.log("Grade data ",gradeData);
    for (const key in validationChecker) {
      if (validationChecker[key] !== "") {
        return false;
      }
    }
    const requiredcolumns = [
      "gradeDescription",
      "gradeName",

    ];
    for (const value of requiredcolumns) {
      if (
        gradeData[value] == "" ||
        gradeData[value] == null ||
        gradeData[value] == undefined
      ) {
          message.error("please fill mandatory columns ");
          errorStatus = false;
        }
    }
    return errorStatus;
  };





  const handleValidationError=(e)=>{
    if (e.target.name=="gradeDescription") {
      setValidationChecker({...validationChecker,subjectDescription:stringLengthValidation(e.target.value,49)})
    }else if(e.target.name=="gradeName"){
      setValidationChecker({...validationChecker,gradeName:stringLengthValidation(e.target.value,39)});
    }
  }

  return (
    <Modal
      open={gradeAddingDrawerOpen}
      onCancel={handleCloseDrawer}
      title="Add New Grade"
      footer={[
        <Button key="cancel" onClick={handleCloseDrawer}>
          Cancel
        </Button>,
        <Button key="submit" loading={loading} className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSaveSubject}>
          Add Grade
        </Button>,
      ]}
    >
      <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          
            <Form.Item
              label="Grade Name"
              validateStatus={validationChecker?.gradeName?"error":"success"}
              help={validationChecker?.gradeName || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="gradeName" onChange={handleInputChange} value={gradeData?.gradeName} placeholder="Please enter a Grade Name" />
            </Form.Item>

        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>

            <Form.Item
              validateStatus={validationChecker?.gradeDescription?"error":"success"}
              help={validationChecker?.gradeDescription || ""}
              label="Grade Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea value={gradeData?.gradeDescription} onChange={handleInputChange}   name="gradeDescription" placeholder="Please enter grade description" />
            </Form.Item>

        </Col>
      </Row>
      </Form>
    </Modal>
  );
};


export default GradeAddingModel