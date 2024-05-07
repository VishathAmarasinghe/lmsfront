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
import {
  createNewUser,
  getFullUserInformation,
  updateFullUserInformation,
} from "../../API";
import LoadingPage from "../../Pages/CommonPages/LoadingPage";
import TextArea from "antd/es/input/TextArea";
import TeacherProfilePicUploading from "./TeacherProfilePicUploading";
import { addressValidation, emailValidation, firstNameLastNameValidation, phoneNumberValidation, stringValidation, validateNIC } from "../../Utils/Validations";

const { Option } = Select;
const { Panel } = Collapse;

const TeacherDetaileditingDrawer = ({
  openeditingDrawer,
  setOpeneditingDrawer,
  teacherStatus,
  selectedTeacherData,
}) => {
  const teacherID = JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [newpasswordVisible, setnewPasswordVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newConfirmPasswordVisible, setNewConfirmPasswordVisible] =
    useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [overallValidateError,setOverallValidateError]=useState({});
  

  useEffect(() => {
    if (openeditingDrawer?.status == true && teacherStatus != "owner") {
      fetchUserInformation(teacherID);
      setEditing(false);
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        profilePicture: profilePicture,
        oldpassword: null,
        newPassword: null,
        confirmPassword: null,
      }));
    } else if (openeditingDrawer.status == true && teacherStatus == "owner") {
      setEditing(false);
      if (openeditingDrawer.task == "Create") {
        setEditing(true);
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          profilePicture: profilePicture,
          oldpassword: null,
          newPassword: null,
          confirmPassword: null,
          role: "teacher",
        }));
      } else {
        setUserDetails({
          ...selectedTeacherData,
          profilePicture: profilePicture,
          oldpassword: null,
          newPassword: null,
          confirmPassword: null,
        });
      }
    }
    setProfilePicture(null);
  }, [openeditingDrawer.status]);




  const handlingOverallValidateError = (errorStatus) => {
    if (errorStatus === "error" && !overallValidateError) {
      console.log("came here here");
      setOverallValidateError(true);
    } else if (errorStatus !== "error" && overallValidateError) {
      console.log("came here sometimes");
      setOverallValidateError(false);
    }
    return errorStatus;
  };



  useEffect(()=>{
    console.log("overall validate error ",overallValidateError);
  },[overallValidateError])



  useEffect(() => {
    setUserDetails({ ...userDetails, profilePicture: profilePicture });
  }, [profilePicture]);

  useEffect(() => {
    console.log("teacher details are ", userDetails);
    if (userDetails?.role == null || userDetails?.role == undefined) {
      setUserDetails({ ...userDetails, role: "teacher" });
    }
  }, [userDetails]);




  const fetchUserInformation = async (teacherIDNo) => {
    try {
      setLoading(true);
      const userInfoResult = await getFullUserInformation(teacherIDNo);
      console.log("fetched user details ", userInfoResult.data);
      setUserDetails({
        ...userInfoResult.data,
        profilePicture: profilePicture,
        oldpassword: null,
        newPassword: null,
        confirmPassword: null,
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
    setOpeneditingDrawer({
      ...openeditingDrawer,
      status: true,
      task: "Update",
    });
  };
  const onClose = () => {
    setLoading(false);
    setOpeneditingDrawer({
      ...openeditingDrawer,
      status: false,
      task: "Update",
    });
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    handleValidations(e);
  };

  const handleAdditionalInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      additionalInfo: {
        ...userDetails.additionalInfo,
        [e.target.name]: e.target.value,
      },
    });
    handleValidations(e);
  };


  const handleValidations=(e)=>{
    if (e.target.name=="firstName") {
      setOverallValidateError({...overallValidateError,firstName:firstNameLastNameValidation(e.target.value)})
    }else if(e.target.name=="lastName"){
      setOverallValidateError({...overallValidateError,lastName:firstNameLastNameValidation(e.target.value)})
    }else if(e.target.name=="address"){
      setOverallValidateError({...overallValidateError,address:addressValidation(e.target.value)})
    }else if(e.target.name=="email"){
      setOverallValidateError({...overallValidateError,email:emailValidation(e.target.value)})
    }else if(e.target.name=="phoneNo"){
      setOverallValidateError({...overallValidateError,phoneNo:phoneNumberValidation(e.target.value)})
    }else if(e.target.name=="NIC"){
      setOverallValidateError({...overallValidateError,NIC:validateNIC(e.target.value)})
    }else if(e.target.name=="teacherSchool"){
      setOverallValidateError({...overallValidateError,teacherSchool:stringValidation(e.target.value)})
    }
  }

  const checkValidationStatusToSubmit=()=>{
    let errorStatus=true;
    for (const key in overallValidateError) {
      if (overallValidateError[key] !== "") {
        return false;
      }
    }
    const requiredcolumns=["firstName","lastName","address","email","phoneNo","gender","NIC"]
    for(const value of requiredcolumns){
      if (userDetails[value]=="" || userDetails[value]==null || userDetails[value]==undefined) {
        message.error("please fill mandatory columns")
        errorStatus=false;
      }
    }
    return errorStatus;
  }




  const genderSelectionChange=(value)=>{
    setUserDetails({...userDetails,gender:value})
  }

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      if (checkValidationStatusToSubmit()) {
        const updationResult = await updateFullUserInformation(userDetails);
      console.log("user updation Result ", updationResult);
      if (updationResult.status == 200) {
        message.success("User Successfully Updated!");
        setEditing(false);
        setLoading(false);
        if (teacherStatus == "owner") {
          fetchUserInformation(selectedTeacherData.UserID);
        } else {
          fetchUserInformation(teacherID);
        }
        onClose();
      } else {
        setLoading(false);
        message.error(updationResult.data);
      }
      }else{
        setLoading(false);
        message.error("please check input errors andn empty columns!")
      }
      
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
      message.error("User Details Updation Error!");
    }
  };

  const createNewProfile = async () => {
    try {
      setLoading(true);
      console.log("user Details ", userDetails);
      if (checkValidationStatusToSubmit()) {
        const createResult = await createNewUser(userDetails);
      console.log("user creation Result ", createResult);
      if (createResult.status == 200) {
        setLoading(false);
        message.success("User Successfully Created!");
        setEditing(false);
        onClose();
      } else {
        setLoading(false);
        message.error(createResult.data);
      }
      }else{
        setLoading(false);
        message.error("please check input errors andn empty columns!")
      }
      
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
      message.error("New User Creation Error!");
    }
  };

  

  return (
    <>
      <Drawer
        getContainer={false}
        title={`${openeditingDrawer?.task} Account`}
        width={720}
        onClose={onClose}
        open={openeditingDrawer.status}
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
                {openeditingDrawer.task != "Create" ? (
                  <Switch
                    checked={editing}
                    className={editing ? "bg-green-500" : "bg-slate-400"}
                    size="30px"
                    onChange={handleSwitchChange}
                    checkedChildren="Editing"
                    unCheckedChildren="Edit"
                  />
                ) : (
                  <></>
                )}
              </ConfigProvider>
            </div>
            {editing && openeditingDrawer.task == "Update" ? (
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
            {openeditingDrawer.task == "Verify" ? (
              <Button
              loading={loading}
                data-aos="fade-left"
                data-aos-duration="1000"
                onClick={handleUpdateProfile}
                className="bg-blue-700 px-3  py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
              >
                Verify Profile
              </Button>
            ) : (
              <></>
            )}
            {openeditingDrawer.task == "Create" ? (
              <button
                data-aos="fade-left"
                data-aos-duration="1000"
                onClick={createNewProfile}
                className="bg-blue-700 px-3  py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
              >
                Create Profile
              </button>
            ) : (
              <></>
            )}
          </Space>
        }
      >
        {loading ? (
          <LoadingPage />
        ) : (
          <Form   layout="vertical" hideRequiredMark>
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
                  validateStatus={overallValidateError?.firstName?"error":"success"}
                  help={overallValidateError?.firstName || ""}
                  rules={[
                    {
                      required: true,
                      
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="firstName"
                    onChange={handleInputChange}
                    value={userDetails?.firstName}
                    placeholder="Please enter your First Name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  validateStatus={overallValidateError?.lastName?"error":"success"}
                  help={overallValidateError?.lastName || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="lastName"
                    onChange={handleInputChange}
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
                  validateStatus={overallValidateError?.address?"error":"success"}
                  help={overallValidateError?.address || ""}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Address",
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="address"
                    onChange={handleInputChange}
                    value={userDetails?.address}
                    placeholder="Please enter your address"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  validateStatus={overallValidateError?.email?"error":"success"}
                  help={overallValidateError?.email || ""}
                  rules={[
                    {
                      required: true,
                     
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="email"
                    onChange={handleInputChange}
                    value={userDetails?.email}
                    placeholder="Please enter your email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Lecturing School"
                  validateStatus={overallValidateError?.teacherSchool?"error":"success"}
                  help={overallValidateError?.teacherSchool || ""}
                 
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="teacherSchool"
                    onChange={handleAdditionalInputChange}
                    value={userDetails?.additionalInfo?.teacherSchool}
                    placeholder="Please enter your school"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone No"
                  validateStatus={overallValidateError?.phoneNo?"error":"success"}
                  help={overallValidateError?.phoneNo || ""}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="phoneNo"
                    onChange={handleInputChange}
                    value={userDetails?.phoneNo}
                    placeholder="Please enter your Phone No"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="NIC Number"
                  validateStatus={overallValidateError?.NIC?"error":"success"}
                  help={overallValidateError?.NIC || ""}
                 
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="NIC"
                    onChange={handleInputChange}
                    value={userDetails?.NIC}
                    placeholder="Please enter your NIC"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Gender",
                    },
                  ]}
                >
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          selectorBg: "bg-[#EBEEFF]",
                        },
                      },
                    }}
                  >
                    <Select
                     disabled={!editing}
                    onChange={genderSelectionChange}
                    className="bg-[#EBEEFF]"
                    placeholder="Please select gender"
                    value={userDetails?.gender}
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                      ]}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label="Additional Info"
                  rules={[
                    {
                      required: true,
                      message: "Please enter additional information",
                    },
                  ]}
                >
                  <TextArea
                    className="bg-[#EBEEFF]"
                    readOnly={!editing}
                    name="teacherDescription"
                    onChange={handleAdditionalInputChange}
                    value={userDetails?.additionalInfo?.teacherDescription}
                    placeholder="Please enter your additional information"
                  />
                </Form.Item>
              </Col>
            </Row>
            {teacherStatus != "owner" ? (
              <Row gutter={16}>
                <div className="w-full ">
                  <Collapse>
                    <Panel header="Change Password" key="1">
                      <Col span={24}>
                        <Form.Item
                          hasFeedback="You cannot change userName"
                          label="User Name"
                        >
                          <Input
                            className="bg-[#EBEEFF]"
                            readOnly
                            name="username"
                            value={userDetails?.username}
                          />
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
                          <Input
                            className="bg-[#EBEEFF]"
                            readOnly={!editing}
                            name="oldpassword"
                            value={userDetails?.oldpassword}
                            onChange={handleInputChange}
                            placeholder="Please enter your Old Password"
                          />
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
                            value={userDetails?.newPasword}
                            onChange={handleInputChange}
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
                            value={userDetails?.confirmPassword}
                            onChange={handleInputChange}
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
            ) : (
              <></>
            )}
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default TeacherDetaileditingDrawer;
