import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import ProfilePicUploading from "../TeacherComp/ProfilePicUploading";
import {
  get_parents_byStudents,
  get_pending_confirmed_students,
  updateUserData,
} from "../../Actions/user";
import { useDispatch } from "react-redux";

const { Option } = Select;
const { Panel } = Collapse;

const RegistrationConfirmStudentDrawer = ({
  selectedStudent,
  openeditingDrawer,
  setOpeneditingDrawer,
  setSelectedStudent,
}) => {
  const [parentData, setParentData] = useState([]);
  const [form] = Form.useForm(); // Initialize form instance
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [studentData, setStudentData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // form.setFieldsValue(selectedStudent);
    setStudentData(selectedStudent);
  }, [selectedStudent, form]);

  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStudent?.studentID) {
        const parents = await get_parents_byStudents(selectedStudent.studentID);
        console.log("parent Data is here ", parents);
        if (parents) {
          setParentData(parents);
        } else {
          setParentData([]);
        }
      } else {
        setParentData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedStudent, form]);

  const saveUpdatedDetails = (values) => {
    console.log("finalized values ", values);
  };

  const updatedDataSaving = async (values) => {
    const data = updateUserData(values);
    console.log("updated outcome ", data);
    dispatch(get_pending_confirmed_students());
    onClose();
  };

  const showDrawer = () => {
    setOpeneditingDrawer(true);
  };

  const onClose = () => {
    setSelectedStudent(null);
    setOpeneditingDrawer(false);
  };

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    const combinedParentstudent = { studentData: studentData, parentData };
    console.log("parent Data and student Data ", combinedParentstudent);
    updatedDataSaving(combinedParentstudent);
    // Handle form submission here
  };

  const handleStudentFieldChange = (value, field) => {
    setSelectedStudent({ ...studentData, [field]: value });
  };

  const handleParentFieldChange = (parentIndex, field, value) => {
    // Update the parent data in state with the new value
    const updatedParentData = parentData.map((parent, index) =>
      index === parentIndex ? { ...parent, [field]: value } : parent
    );
    setParentData(updatedParentData);
  };

  return (
    <>
      <Drawer
        getContainer={false}
        title="Verify Student"
        width={720}
        onClose={onClose}
        open={openeditingDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Switch: {
                      base: {
                        "&:hover": {
                          backgroundColor: "transparent", 
                        },
                        "&:not(:hover)": {
                          color: "initial", 
                          backgroundColor: "#C5C5C5", 
                        },
                      },
                    },
                  },
                }}
              >
                <Switch
                  checked={editing}
                  className={editing ? "bg-green-500" : "bg-slate-400"}
                  size="30px"
                  onChange={handleSwitchChange}
                  checkedChildren="Editing"
                  unCheckedChildren="Edit"
                />
              </ConfigProvider>
            </div>
            <button
              onClick={() => form.submit()}
              className="bg-blue-700 px-2 py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              Verify
            </button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedStudent}
          onFinish={saveUpdatedDetails}
          hideRequiredMark
        >
          <div>
            <p className="text-[15px] font-inter font-medium text-gray-500">
              Student Information
            </p>
          </div>
          <Row gutter={16}>
            <Col span={24}>
              {/* <Form.Item
                name="Profile Picture"
                label="Profile Picture"
                rules={[
                  {
                    required: true,
                    message: "Please add your profile pic",
                  },
                ]}
              > */}
              {/* <ProfilePicUploading /> */}
              {/* </Form.Item> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter First Name",
                  },
                ]}
              >
                <Input
                  readOnly={!editing}
                  onChange={(e) =>
                    handleStudentFieldChange(e.target.value, "firstName")
                  }
                  value={studentData?.firstName}
                  placeholder="Please enter your First Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter last name",
                  },
                ]}
              >
                <Input
                  readOnly={!editing}
                  onChange={(e) =>
                    handleStudentFieldChange(e.target.value, "lastName")
                  }
                  value={studentData?.lastName}
                  placeholder="Please enter your last name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter Address",
                  },
                ]}
              >
                <Input
                  readOnly={!editing}
                  onChange={(e) =>
                    handleStudentFieldChange(e.target.value, "address")
                  }
                  value={studentData?.address}
                  placeholder="Please enter your address"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter Email",
                  },
                ]}
              >
                <Input
                  readOnly={!editing}
                  onChange={(e) =>
                    handleStudentFieldChange(e.target.value, "email")
                  }
                  value={studentData?.email}
                  placeholder="Please enter your email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="school"
                label="School"
                rules={[
                  {
                    required: true,
                    message: "Please enter Lecturing School",
                  },
                ]}
              >
                <Input
                  readOnly={!editing}
                  onChange={(e) =>
                    handleStudentFieldChange(e.target.value, "school")
                  }
                  value={studentData?.school}
                  placeholder="Please enter your school"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNo"
                label="Phone No"
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone No",
                  },
                ]}
              >
                <Input
                  readOnly={!editing}
                  onChange={(e) =>
                    handleStudentFieldChange(e.target.value, "phoneNo")
                  }
                  value={studentData?.phoneNo}
                  placeholder="Please enter your phoneNo"
                />
              </Form.Item>
            </Col>
          </Row>
          <div>
            <p className="text-[15px] font-inter font-medium">
              Parent Information
            </p>
          </div>
        </Form>
        <Row gutter={16}>
          {loading ? (
            <>
              <p>Loading</p>
            </>
          ) : (
            <div className="w-full">
              <Collapse accordion>
                {parentData.map((parent, index) => (
                  <Panel header={`Parent ${index + 1}`} key={parent.UserID}>
                    <Form
                      form={form}
                      layout="vertical"
                      initialValues={selectedStudent}
                      onFinish={onFinish}
                      hideRequiredMark
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="First Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter Phone No",
                              },
                            ]}
                          >
                            <Input
                              readOnly={!editing}
                              onChange={(e) =>
                                handleParentFieldChange(
                                  index,
                                  "firstName",
                                  e.target.value
                                )
                              }
                              value={parent.firstName}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Last Name">
                            <Input
                              readOnly={!editing}
                              onChange={(e) =>
                                handleParentFieldChange(
                                  index,
                                  "lastName",
                                  e.target.value
                                )
                              }
                              value={parent.lastName}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Address">
                            <Input
                              readOnly={!editing}
                              onChange={(e) =>
                                handleParentFieldChange(
                                  index,
                                  "address",
                                  e.target.value
                                )
                              }
                              value={parent.address}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Phone No">
                            <Input
                              readOnly={!editing}
                              onChange={(e) =>
                                handleParentFieldChange(
                                  index,
                                  "phoneNo",
                                  e.target.value
                                )
                              }
                              value={parent.phoneNo}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Email">
                            <Input
                              readOnly={!editing}
                              onChange={(e) =>
                                handleParentFieldChange(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                              value={parent.email}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="NIC">
                            <Input
                              readOnly={!editing}
                              onChange={(e) =>
                                handleParentFieldChange(
                                  index,
                                  "NIC",
                                  e.target.value
                                )
                              }
                              value={parent.NIC}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>

                  </Panel>
                ))}
              </Collapse>
            </div>
          )}
        </Row>
      </Drawer>
    </>
  );
};

export default RegistrationConfirmStudentDrawer;
