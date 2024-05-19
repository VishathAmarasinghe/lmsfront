import React from "react";
import { IconButton, InputAdornment, TextField, Checkbox, MenuItem } from "@mui/material";
import { Col, Form, Input, Row,Select } from "antd";

const RegistrationFormOne = ({
  handleChangingFormData,
  formData,
  errorValidator,
  setFormData
}) => {

  const handleSelectStudentGenderSelector=(value)=>{
    console.log("selected student gender is ",value);
    setFormData((prevState)=>({
      ...formData,
      "student": {
        ...prevState["student"],
        gender: value,
      },
    }))
  }
  return (
    <div className="w-full ">
      <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  validateStatus={
                    errorValidator.studentFirstName ? "error" : "success"
                  }
                  help={errorValidator.studentFirstName || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="student.firstName"
                    value={formData.student.firstName}
                    onChange={(e) => handleChangingFormData(e)}
                    placeholder="Please enter your First Name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  validateStatus={
                    errorValidator.studentLastName ? "error" : "success"
                  }
                  help={errorValidator.studentLastName || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="student.lastName"
                    value={formData.student.lastName}
                    onChange={(e) => handleChangingFormData(e)}

                    placeholder="Please enter your last name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Home Address"
                  validateStatus={
                    errorValidator.address ? "error" : "success"
                  }
                  help={errorValidator.address || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="student.address"
                    value={formData.student.address}
                    onChange={(e) => handleChangingFormData(e)}          
                    placeholder="Please enter your First Name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  validateStatus={
                    errorValidator.stuEmail ? "error" : "success"
                  }
                  help={errorValidator.stuEmail || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="student.email"
                    value={formData.student.email}
                    onChange={(e) => handleChangingFormData(e)}
                    placeholder="Please enter your First Name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Gender"
                  // validateStatus={
                  //   errorValidator.studentLastName ? "error" : "success"
                  // }
                  // help={errorValidator.studentLastName || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select onChange={handleSelectStudentGenderSelector} value={formData.student.gender} options={[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="School"
                  validateStatus={
                    errorValidator.school ? "error" : "success"
                  }
                  help={errorValidator.school || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="student.school"
                    value={formData.student.school}
                    onChange={(e) => handleChangingFormData(e)}
                    placeholder="Please enter your School"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone No"
                  validateStatus={
                    errorValidator.stuPhoneNo ? "error" : "success"
                  }
                  help={errorValidator.stuPhoneNo|| "If you do not have please enter parents one"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="student.phoneNo"
                    value={formData.student.phoneNo}
                    onChange={(e) => handleChangingFormData(e)}      
                    placeholder="Please enter your Phone No"
                  />
                </Form.Item>
              </Col>
            </Row>
      </Form>
    </div>
  );
};

export default RegistrationFormOne;
