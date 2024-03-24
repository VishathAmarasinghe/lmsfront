import { Drawer, Space, Button, Row, Col, Form,Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { subjectMedium } from "../../Utils/defaultValues";

const SubjectAddingDrawer = ({subjectAddingDrawerOpen,setSubjectAddingDrawerOpen}) => {
    const handleCloseDrawer=()=>{
        setSubjectAddingDrawerOpen(false)
    }

   
  return (
    <Modal
    open={subjectAddingDrawerOpen}
    onOk={handleCloseDrawer}
    onCancel={handleCloseDrawer}
   
      title="Add New Subject"
      extra={
        <Space>
          <Button onClick={handleCloseDrawer}>Cancel</Button>
          <Button type="primary" onClick={handleCloseDrawer}>
            OK
          </Button>
        </Space>
      }
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form layout="vertical" hideRequiredMark>
            <Form.Item
              name="subjectname"
              label="Subject Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Class Name",
                },
              ]}
            >
              <Input  placeholder="Please enter a Subject Name" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form  layout="vertical" hideRequiredMark>
            <Form.Item
              name="media"
              label="Subject Media"
              rules={[
                {
                  required: true,
                  message: "Please enter subject Media",
                },
              ]}
            >
              <Select defaultValue="sinhala" options={subjectMedium}/>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form  layout="vertical" hideRequiredMark>
            <Form.Item
              name="subdesc"
              label="Subject Description"
              rules={[
                {
                  required: true,
                  message: "Please enter subject Description",
                },
              ]}
            >
              <TextArea placeholder="Please enter subject description" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default SubjectAddingDrawer;
