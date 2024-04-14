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
  message,
  notification,
} from "antd";
import ProfilePicUploading from "./ProfilePicUploading";
import { getFullUserInformation, updateFullUserInformation } from "../../API";
import LoadingPage from "../../Pages/CommonPages/LoadingPage";
import TextArea from "antd/es/input/TextArea";
import TeacherProfilePicUploading from "./TeacherProfilePicUploading";

const { Option } = Select;
const { Panel } = Collapse;

const TeacherDetaileditingDrawer = ({
  openeditingDrawer,
  setOpeneditingDrawer,
}) => {
  const teacherID = JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newConfirmPasswordVisible, setNewConfirmPasswordVisible] =useState(false);
  const [profilePicture,setProfilePicture]=useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (openeditingDrawer == true) {
      fetchUserInformation();
      setEditing(false);
      setUserDetails({...userDetails,profilePicture:profilePicture,oldpassword:null,newPassword:null,confirmPassword:null})
    }
  }, [openeditingDrawer]);


  useEffect(()=>{
    setUserDetails({...userDetails,profilePicture:profilePicture})
  },[profilePicture])



  useEffect(()=>{
    console.log("teacher details are ",userDetails);
  },[userDetails])

  const fetchUserInformation = async () => {
    try {
      setLoading(true);
      const userInfoResult = await getFullUserInformation(teacherID);
      console.log("fetched user details ", userInfoResult.data);
      setUserDetails({
        ...userInfoResult.data,
        profilePicture: profilePicture,
        oldpassword: null,
        newPassword: null,
        confirmPassword: null
      });
      
      
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
      message.error("user Information Fetching Error!");
      onclose();
    }
  };

  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };

  const showDrawer = () => {
    setOpeneditingDrawer(true);
  };
  const onClose = () => {
    setLoading(false);
    setOpeneditingDrawer(false);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleAdditionalInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      additionalInfo: {
        ...userDetails.additionalInfo,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleUpdateProfile=async()=>{
    try {
      const updationResult=await updateFullUserInformation(userDetails);
      console.log("user updation Result ",updationResult);
      if (updationResult.status==200) {
        message.success("User Successfully Updated!")
        setEditing(false);
        fetchUserInformation();
      }else{
        message.error(updationResult.data);
      }
    } catch (error) {
      console.log("error ",error);
      message.error("User Details Updation Error!")
      
    }
  }

  return (
    <>
      <Drawer
        getContainer={false}
        title="Update Account"
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
            {
              editing?
              <button
              data-aos="fade-left"
              data-aos-duration="2000"
              onClick={handleUpdateProfile}
              className="bg-blue-700 px-3  py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              Update Profile
            </button>:<></>
            }
            
          </Space>
        }
      >
        {loading ? (
          <LoadingPage />
        ) : (
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
                  <TeacherProfilePicUploading setProfilePicture={setProfilePicture} existingImageUrl={`http://localhost:5000/${userDetails?.photo}`}/>
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
                  <Input className="bg-[#EBEEFF]" readOnly={!editing} name="firstName" onChange={handleInputChange} value={userDetails?.firstName} placeholder="Please enter your First Name" />
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
                  <Input className="bg-[#EBEEFF]" readOnly={!editing} name="lastName" onChange={handleInputChange} value={userDetails?.lastName} placeholder="Please enter your last name" />
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
                  <Input className="bg-[#EBEEFF]" readOnly={!editing}  name="address" onChange={handleInputChange} value={userDetails?.address} placeholder="Please enter your address" />
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
                  <Input className="bg-[#EBEEFF]" readOnly={!editing}  name="email" onChange={handleInputChange} value={userDetails?.email} placeholder="Please enter your email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  
                  label="Lecturing School"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Lecturing School",
                    },
                  ]}
                >
                  <Input className="bg-[#EBEEFF]" readOnly={!editing} name="teacherSchool" onChange={handleAdditionalInputChange} value={userDetails?.additionalInfo?.teacherSchool} placeholder="Please enter your school" />
                </Form.Item>
              </Col>
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
                  <Input className="bg-[#EBEEFF]" readOnly={!editing}  name="phoneNo" onChange={handleInputChange} value={userDetails?.phoneNo} placeholder="Please enter your Phone No" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                 
                  label="NIC Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your teaching subject",
                    },
                  ]}
                >
                  <Input className="bg-[#EBEEFF]" readOnly={!editing}  name="NIC" onChange={handleInputChange} value={userDetails?.NIC} placeholder="Please enter your NIC" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Additional Info"
                  rules={[
                    {
                      required: true,
                      message: "Please enter additional information",
                    },
                  ]}
                >
                  <TextArea className="bg-[#EBEEFF]" readOnly={!editing} name="teacherDescription" onChange={handleAdditionalInputChange} value={userDetails?.additionalInfo?.teacherDescription} placeholder="Please enter your additional information" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <div className="w-full ">
                <Collapse>
                  <Panel header="Change Password" key="1">
                    <Col span={24}>
                    <Form.Item
                       hasFeedback="You cannot change userName"
                        label="User Name"
                      >
                        <Input className="bg-[#EBEEFF]" readOnly name="username" value={userDetails?.username} />
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
                        <Input className="bg-[#EBEEFF]" readOnly={!editing} name="oldpassword" value={userDetails?.oldpassword} onChange={handleInputChange} placeholder="Please enter your Old Password" />
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
                        className="bg-[#EBEEFF]"
                        readOnly={!editing}
                        name="newPassword"
                        value={userDetails?.newPasword} onChange={handleInputChange}
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
                        className="bg-[#EBEEFF]"
                        readOnly={!editing}
                         name="confirmPassword"
                         value={userDetails?.confirmPassword} onChange={handleInputChange}
                          placeholder="Please Re enter New Password"
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
        )}
      </Drawer>
    </>
  );
};

export default TeacherDetaileditingDrawer;
