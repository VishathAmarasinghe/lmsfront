import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import ProfilePicUploading from "./TeacherComp/ProfilePicUploading";
import { Col, Form, Input, Row, Select, Tag } from "antd";
import CameraCaptureModal from "./Registration/CameraCaptureModal";

const RegistrationFormTwo = ({
  handleChangingFormData,
  formData,
  errorValidator,
  setuploadingImage,
  setFormData,
  uploadedImage
}) => {

  const [camaraModelVisibile, setCamaraModelVisible]=useState(false);

 


  const handleSelectStudentGenderSelector=(value)=>{
    console.log("selected Parent gender is ",value);
    setFormData((prevState)=>({
      ...formData,
      "parent": {
        ...prevState["parent"],
        gender: value,
      },
    }))
  }


  const handleCaptureModelOpen=()=>{
    console.log("btton cluckedn  ",camaraModelVisibile);
    setCamaraModelVisible(true);
  }





  return (
    <div className="w-full  ">
      
      <div className="flex flex-col mb-1 ">
        <label className="font-inter text-[14px] font-medium text-black">
          Student Profile Picture
        </label>
        <div className="flex flex-row justify-start">
        <ProfilePicUploading  existingImageUrl={uploadedImage} setuploadingImage={setuploadingImage} />
        
        <Tag onClick={handleCaptureModelOpen} className="flex flex-row  justify-center items-center" color="cyan">Take Photo Now</Tag>
        </div>
        {/* <p className="text-red-700 text-[12px]">Error text</p> */}
      </div>
      <Form layout="vertical" hideRequiredMark>
      <CameraCaptureModal setuploadingImage={setuploadingImage} camaraModelVisibile={camaraModelVisibile} setCamaraModelVisible={setCamaraModelVisible}/>
        <Row gutter={16}>
          <Col span={12}  >
            <Form.Item
            
              label="Gardiant First Name"
              
              validateStatus={
                errorValidator.gardientName ? "error" : "success"
              }
              help={errorValidator.gardientName || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="bg-[#EBEEFF]"
                name="parent.firstName"
                value={formData.parent.firstName}
                onChange={(e) => handleChangingFormData(e)}    
                placeholder="Please enter gardiant First Name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Gardiant Last Name"
              validateStatus={
                errorValidator.gardientName? "error" : "success"
              }
              help={errorValidator.gardientName || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="bg-[#EBEEFF]"
                name="parent.lastName"
                value={formData.parent.lastName}
                onChange={(e) => handleChangingFormData(e)}    
                placeholder="Please enter gardiant last name"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gardiant NIC"
              validateStatus={errorValidator.gardientNIC ? "error" : "success"}
              help={errorValidator.gardientNIC || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="bg-[#EBEEFF]"
                name="parent.NIC"
                value={formData.parent.NIC}
                onChange={(e) => handleChangingFormData(e)}    
                placeholder="Please enter gardiant NIC"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                onChange={handleSelectStudentGenderSelector}
                value={formData.student.gender}
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Email"
              validateStatus={errorValidator.gardientEmail ? "error" : "success"}
              help={errorValidator.gardientEmail || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="bg-[#EBEEFF]"
                name="parent.email"
                value={formData.parent.email}
                onChange={(e) => handleChangingFormData(e)}
                placeholder="Please enter gardiant Email"
              />
            </Form.Item>
          </Col>
          
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gardiant Contact Number"
              validateStatus={errorValidator.gardientPhoneNo ? "error" : "success"}
              help={errorValidator.gardientPhoneNo || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="bg-[#EBEEFF]"
                name="parent.phoneNo"
                value={formData.parent.phoneNo}
                onChange={(e) => handleChangingFormData(e)}
                placeholder="Please enter gardiant Phone No"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Occupation"
              validateStatus={errorValidator.occupation ? "error" : "success"}
              help={
                errorValidator.occupation ||
                ""
              }
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="bg-[#EBEEFF]"
                name="parent.occupation"
                value={formData.parent.occupation}
                onChange={(e) => handleChangingFormData(e)}
                placeholder="Please enter gardiant Occupation"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegistrationFormTwo;
