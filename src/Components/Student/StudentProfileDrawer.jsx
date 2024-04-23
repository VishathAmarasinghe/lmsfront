import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Drawer,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  message,
} from "antd";
import TeacherProfilePicUploading from "../TeacherComp/TeacherProfilePicUploading";
import { getClassesForSelectedStudent, updateFullUserInformation } from "../../API";

const { Option } = Select;
const { Panel } = Collapse;

const StudentProfileDrawer = ({
  openprofileeditingDrawer,
  setProfileOpeneditingDrawer,
  selectedStudent,
  setSelectedStudent,
}) => {
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [newConfirmPasswordVisible, setNewConfirmPasswordVisible] =
    useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [classList, setClassList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [ProfilePic, setProfilePicture] = useState(null);
  const showDrawer = () => {
    setProfileOpeneditingDrawer(true);
  };
  const onClose = () => {
    setProfileOpeneditingDrawer(false);
  };

  useEffect(() => {
    setUserDetails(selectedStudent);
    fetchStudentClasses(selectedStudent?.UserID);
    console.log("selected student is ", selectedStudent);
  }, [selectedStudent]);


  useEffect(()=>{
    setUserDetails({...userDetails,profilePicture:ProfilePic, oldpassword: null,newPassword: null,confirmPassword: null})
  },[editing])

  const fetchStudentClasses = async (studentID) => {
    try {
      const classList = await getClassesForSelectedStudent(studentID);
      console.log("class list ", classList);
      setClassList(classList.data);
    } catch (error) {
      console.log("student Classes Fetching Error!", error);
      message.error("student Classes Fetching Error!");
    }
  };

  const handleChangeInputs = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleChangeAdditionalInfo = (e) => {
    setUserDetails({
      ...userDetails,
      additionalInfo: {
        ...userDetails.additionalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };

  const handleUpdateProfile =async () => {
    try {
      const updationResult=await updateFullUserInformation(userDetails);
      console.log("user updation Result ",updationResult);
      if (updationResult.status==200) {
        message.success("User Successfully Updated!")
        setEditing(false);
        setUserDetails(null);
        setProfileOpeneditingDrawer(false)
        
        
        
      }else{
        message.error(updationResult.data);
      }
    } catch (error) {
      console.log("error ",error);
      message.error("User Details Updation Error!")
      
    }
  };

  return (
    <>
      <Drawer
        getContainer={false}
        title="Update Account"
        width={720}
        onClose={onClose}
        open={openprofileeditingDrawer}
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
            {editing ? (
              <button
                data-aos="fade-left"
                data-aos-duration="1000"
                onClick={handleUpdateProfile}
                className="bg-blue-700 px-3  py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
              >
                Update Profile
              </button>
            ) : (
              <></>
            )}
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Profile Picture"
                label="Profile Picture"
                rules={[
                  {
                    required: true,
                    message: "Please add your profile pic",
                  },
                ]}
              >
                <TeacherProfilePicUploading
                  setProfilePicture={setProfilePicture}
                  existingImageUrl={
                    userDetails?.photo != null && userDetails?.photo != ""
                      ? `http://localhost:5000/${userDetails?.photo}`
                      : null
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
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
                  onChange={handleChangeInputs}
                  name="firstName"
                  value={userDetails?.firstName}
                  placeholder="Please enter your First Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
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
                  onChange={handleChangeInputs}
                  name="lastName"
                  value={userDetails?.lastName}
                  placeholder="Please enter your last name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
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
                  onChange={handleChangeInputs}
                  name="address"
                  value={userDetails?.address}
                  placeholder="Please enter your address"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
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
                  onChange={handleChangeInputs}
                  name="email"
                  value={userDetails?.email}
                  placeholder="Please enter your email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
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
                  onChange={handleChangeInputs}
                  name="phoneNo"
                  value={userDetails?.phoneNo}
                  placeholder="Please enter phone Number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="NIC"
                rules={[
                  {
                    required: true,
                    message: "Please enter NIC",
                  },
                ]}
              >
                <Input
                readOnly={!editing}
                  onChange={handleChangeInputs}
                  name="NIC"
                  value={userDetails?.NIC}
                  placeholder="Please enter your NIC"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="School"
                rules={[
                  {
                    required: true,
                    message: "Please enter your school",
                  },
                ]}
              >
                <Input
                readOnly={!editing}
                  onChange={handleChangeAdditionalInfo}
                  name="school"
                  value={userDetails?.additionalInfo?.school}
                  placeholder="Please enter your school"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Barcode Number">
                <Input
                  name="barcode"
                  value={userDetails?.additionalInfo?.barcode}
                  readOnly
                  placeholder="Please enter your barcode"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="card Status">
                <Input
                  readOnly
                  name="cardStatus"
                  value={userDetails?.additionalInfo?.cardStatus}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="StudentCard">
                <div className="w-full flex flex-col justify-center items-center ">
                  {userDetails?.additionalInfo?.studentcard != null &&
                  userDetails?.additionalInfo?.studentcard != "" ? (
                    <img
                    className="w-[60%]"
                      src={`http://localhost:5000/${userDetails?.additionalInfo?.studentcard}`}
                    />
                  ) : (
                    <p>No Student Card Yet</p>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Student Classes">
                {classList.length != 0 ? (
                  <div className="w-full border-2 border-red-500 grid grid-cols-3">
                    {classList?.map((classData) => (
                      <Tag
                        key={classData?.classID}
                        color="blue"
                        className="p-2 hover:bg-blue-500"
                      >
                        <div className="w-full flex flex-row justify-between">
                          <p>{classData?.classID}</p>
                          <p>{classData?.ClassName}</p>
                        </div>
                      </Tag>
                    ))}
                  </div>
                ) : (
                  <div className="w-full">
                    <Empty description="No classes yet" />
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <div className="w-full border-2 border-blue-600">
              <Collapse>
                <Panel header="Change Password" key="1">
                  <Col span={24}>
                  <Form.Item
                     
                     label="User Name"

                   >
                     <Input readOnly name="username" value={userDetails?.username} placeholder="Please enter your Old Password" />
                   </Form.Item>
                    <Form.Item
                     
                      label="Old Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Old Password",
                        },
                      ]}
                    >
                      <Input readOnly={!editing} value={userDetails?.oldpassword}  name="oldpassword" placeholder="Please enter your Old Password" />
                    </Form.Item>

                    <Form.Item
                     
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter New Password",
                        },
                      ]}
                    >
                      <Input.Password
                       name="newPassword"
                       value={userDetails?.newPassword}
                      readOnly={!editing}
                        placeholder="Please enter New Password"
                        visibilityToggle={{
                          visible: newpasswordVisible,
                          onVisibleChange: setnewPasswordVisible,
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      
                      label="Confirm New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter New Password again",
                        },
                      ]}
                    >
                      <Input.Password
                      name="confirmPassword"
                      value={userDetails?.confirmPassword}
                      readOnly={!editing}
                        placeholder="Please enter New Password"
                        visibilityToggle={{
                          visible: newConfirmPasswordVisible,
                          onVisibleChange: setNewConfirmPasswordVisible,
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Panel>
              </Collapse>
            </div>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default StudentProfileDrawer;
