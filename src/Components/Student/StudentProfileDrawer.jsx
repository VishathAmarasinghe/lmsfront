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
import {
  getClassesForSelectedStudent,
  getFullUserInformation,
  updateFullUserInformation,
} from "../../API";
import {
  addressValidation,
  emailValidation,
  firstNameLastNameValidation,
  phoneNumberValidation,
  stringValidation,
  validateNIC,
} from "../../Utils/Validations";
import { useDispatch } from "react-redux";
import { updateLoginUser } from "../../Actions/auth";

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
  const [overallValidateError, setOverallValidateError] = useState({});
  const defaultStudent=JSON.parse(localStorage.getItem("profile"))?.result;
  const dispatch=useDispatch();

  const showDrawer = () => {
    setProfileOpeneditingDrawer(true);
  };
  const onClose = () => {
    setProfileOpeneditingDrawer(false);
  };

  useEffect(() => {
    if (openprofileeditingDrawer?.status==true) {
      if (selectedStudent==null) {
        fetchStudentDetails();
     }else{
       setUserDetails(selectedStudent);
       fetchStudentClasses(selectedStudent?.UserID);
       console.log("selected student is ", selectedStudent);
     }
    }
   
   
  }, [selectedStudent,openprofileeditingDrawer?.status]);



  useEffect(() => {
    setUserDetails({
      ...userDetails,
      profilePicture: ProfilePic,
      oldpassword: null,
      newPassword: null,
      confirmPassword: null,
    });
  }, [editing]);


  const fetchStudentDetails=async()=>{
    try {
      const studentDetails=await getFullUserInformation(defaultStudent?.UserID);
      console.log("incomng student result ",studentDetails);
      setUserDetails(studentDetails.data);

      fetchStudentClasses(defaultStudent?.UserID);
    } catch (error) {
      console.log("error!");
      message.error("Student Details Fetching Error!")
    }
  }


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
    handleValidations(e);
  };

  const handleChangeAdditionalInfo = (e) => {
    setUserDetails({
      ...userDetails,
      additionalInfo: {
        ...userDetails.additionalInfo,
        [e.target.name]: e.target.value,
      },
    });
    handleValidations(e);
  };

  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };

  const handleUpdateProfile = async () => {
    try {
      if (checkValidationStatusToSubmit()) {
        const updationResult = await updateFullUserInformation(userDetails);
        console.log("user updation Result ", updationResult);
        if (updationResult.status == 200) {
          message.success("User Successfully Updated!");
          setEditing(false);
          setUserDetails(null);
          setProfileOpeneditingDrawer(false);
          if (selectedStudent==null) {
            dispatch(updateLoginUser(defaultStudent?.UserID));
          }
        } else {
          message.error(updationResult.data);
        }
      }else{
        message.error("please check input errors andn empty columns!")
      }
    } catch (error) {
      console.log("error ", error);
      message.error("User Details Updation Error!");
    }
  };

  const handleValidations = (e) => {
    if (e.target.name == "firstName") {
      setOverallValidateError({
        ...overallValidateError,
        firstName: firstNameLastNameValidation(e.target.value),
      });
    } else if (e.target.name == "lastName") {
      setOverallValidateError({
        ...overallValidateError,
        lastName: firstNameLastNameValidation(e.target.value),
      });
    } else if (e.target.name == "address") {
      setOverallValidateError({
        ...overallValidateError,
        address: addressValidation(e.target.value),
      });
    } else if (e.target.name == "email") {
      setOverallValidateError({
        ...overallValidateError,
        email: emailValidation(e.target.value),
      });
    } else if (e.target.name == "phoneNo") {
      setOverallValidateError({
        ...overallValidateError,
        phoneNo: phoneNumberValidation(e.target.value),
      });
    } else if (e.target.name == "NIC") {
      setOverallValidateError({
        ...overallValidateError,
        NIC: validateNIC(e.target.value),
      });
    } else if (e.target.name == "school") {
      setOverallValidateError({
        ...overallValidateError,
        school: stringValidation(e.target.value),
      });
    }
  };

  const checkValidationStatusToSubmit = () => {
    let errorStatus = true;
    for (const key in overallValidateError) {
      if (overallValidateError[key] !== "") {
        return false;
      }
    }
    const requiredcolumns = [
      "firstName",
      "lastName",
      "address",
      "email",
      "phoneNo",
      "gender",
    ];
    for (const value of requiredcolumns) {
      if (
        userDetails[value] == "" ||
        userDetails[value] == null ||
        userDetails[value] == undefined
      ) {
        message.error("please fill mandatory columns");
        errorStatus = false;
      }
    }
    return errorStatus;
  };

  const genderSelectionChange = (value) => {
    setUserDetails({ ...userDetails, gender: value });

  };

  return (
    <>
      <Drawer
        getContainer={false}
        title="Update Account"
        width={720}
        onClose={onClose}
        open={openprofileeditingDrawer?.status}
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
                validateStatus={
                  overallValidateError?.firstName ? "error" : "success"
                }
                help={overallValidateError?.firstName || ""}
                rules={[
                  {
                    required: true,
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
                validateStatus={
                  overallValidateError?.lastName ? "error" : "success"
                }
                help={overallValidateError?.lastName || ""}
                rules={[
                  {
                    required: true,
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
                validateStatus={
                  overallValidateError?.address ? "error" : "success"
                }
                help={overallValidateError?.address || ""}
                rules={[
                  {
                    required: true,
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
                validateStatus={
                  overallValidateError?.email ? "error" : "success"
                }
                help={overallValidateError?.email || ""}
                rules={[
                  {
                    required: true,
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
                validateStatus={
                  overallValidateError?.phoneNo
                    ? "error"
                    : "success"
                }
                help={overallValidateError?.phoneNo || ""}
                rules={[
                  {
                    required: true,
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
                validateStatus={overallValidateError?.NIC ? "error" : "success"}
                help={overallValidateError?.NIC || ""}
                rules={[
                  {
                    required: true,
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
                validateStatus={
                  overallValidateError?.school ? "error" : "success"
                }
                help={overallValidateError?.school || ""}
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
            <Col span={12}>
              <Form.Item label="card Status">
                <Input
                  readOnly
                  name="cardStatus"
                  value={userDetails?.additionalInfo?.cardStatus}
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
                  <div className="w-full  grid grid-cols-3">
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
                    <Form.Item label="User Name">
                      <Input
                        readOnly
                        name="username"
                        value={userDetails?.username}
                        placeholder="Please enter your Old Password"
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
                        readOnly={!editing}
                        value={userDetails?.oldpassword}
                        name="oldpassword"
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
