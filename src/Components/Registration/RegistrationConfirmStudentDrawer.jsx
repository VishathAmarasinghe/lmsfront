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
  Tag,
  message,
} from "antd";
import ProfilePicUploading from "../TeacherComp/TeacherProfilePicUploading";
import {
  get_parents_byStudents,
  get_pending_confirmed_students,
  updateUserData,
} from "../../Actions/user";
import { useDispatch } from "react-redux";
import CameraCaptureModal from "./CameraCaptureModal";
import { addressValidation, emailValidation, firstNameLastNameValidation, phoneNumberValidation, stringValidationWithLenght, validateNIC } from "../../Utils/Validations";

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
  const [verifyLoading,setVerifyLoading]=useState(false);
  const [editing, setEditing] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [studentValidationError,setStudentValidationError]=useState(null);
  const [camaraModelVisibile, setCamaraModelVisible]=useState(false);
  const [camaraPhoto,SetCamaraPhoto]=useState(null);
  const [parentValidationError,setParentValidationError]=useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // form.setFieldsValue(selectedStudent);
    setStudentData(selectedStudent);
  }, [selectedStudent]);

  useEffect(()=>{
    if (camaraPhoto!=null) {
      if (profilePicture!=null) {
        message.error("Please delete selected photo from device")
      }else{
        setProfilePicture(camaraPhoto);
      }
    }
  },[camaraPhoto,profilePicture])

  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };

  useEffect(() => {
    setStudentData({ ...studentData, profilePic: profilePicture });
  }, [profilePicture]);

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
    if (checkValidationStatusToSubmit()) {
      try {
        const data =await updateUserData(values);
        console.log("updated outcome ", data);
        dispatch(get_pending_confirmed_students());
        onClose();
        setVerifyLoading(false);
      } catch (error) {
        console.log("error ",error);
        message.error("Data Updating Error!");
      }
      setVerifyLoading(false);
      
    }
    
  };




  const checkValidationStatusToSubmit=()=>{
    let errorStatus=true;
    for (const key in studentValidationError) {
      if (studentValidationError[key] !== "") {
        return false;
      }
    }
    const requiredcolumns=["firstName","lastName","address","email","phoneNo","school"]
    for(const value of requiredcolumns){
      if (studentData[value]=="" || studentData[value]==null || studentData[value]==undefined) {
        message.error("please fill mandatory columns")
        errorStatus=false;
      }
    }
    for(const parent of parentValidationError){
      for (const key in parent) {
        if (parent[key] !== "") {
          return false;
        }
      }
    }
    const requiredcolumnsParents=["firstName","lastName","address","email","phoneNo","NIC"]
    for(const parent of parentData){
      for(const value of requiredcolumnsParents){
        if (parent[value]=="" || parent[value]==null || parent[value]==undefined) {
          message.error("please fill mandatory columns")
          errorStatus=false;
        }
      }
    }
    
    return errorStatus;
  }









  const onClose = () => {
    setSelectedStudent(null);
    setOpeneditingDrawer(false);
  };

  const onFinish = () => {
    const combinedParentstudent = { studentData: studentData, parentData };
    console.log("parent Data and student Data ", combinedParentstudent);
    setVerifyLoading(true);
    updatedDataSaving(combinedParentstudent);
    // Handle form submission here
  };

  const handleStudentFieldChange = (e) => {
    setSelectedStudent({ ...studentData, [e.target.name]: e.target.value });
    studentValidationChecker(e);
  };

  const handleParentFieldChange = (parentIndex, field, value) => {
    // Update the parent data in state with the new value
    const updatedParentData = parentData.map((parent, index) =>
      index === parentIndex ? { ...parent, [field]: value } : parent
    );
    setParentData(updatedParentData);
    parentValidationChecker(parentIndex,field,value)
  };

  const handleCaptureModelOpen=()=>{
    console.log("btton cluckedn  ",camaraModelVisibile);
    if (camaraPhoto!=null) {
      if (camaraPhoto==profilePicture) {
        SetCamaraPhoto(null);
        setProfilePicture(null);
      }
      
    }else{
      setCamaraModelVisible(true);
    }
    
  }


  const studentValidationChecker=(e)=>{
    if (e.target.name=="firstName" || e.target.name=="lastName" ) {
      setStudentValidationError({...studentValidationError,[e.target.name]:firstNameLastNameValidation(e.target.value)})
    }else if(e.target.name=="address"){
      setStudentValidationError({...studentValidationError,[e.target.name]:addressValidation(e.target.value)})
    }else if(e.target.name=="email"){
      setStudentValidationError({...studentValidationError,[e.target.name]:emailValidation(e.target.value)})
    }else if(e.target.name=="School"){
      setStudentValidationError({...studentValidationError,[e.target.name]:stringValidationWithLenght(e.target.value,39)})
    }else if(e.target.name=="phoneNo"){
      setStudentValidationError({...studentValidationError,[e.target.name]:phoneNumberValidation(e.target.value,39)})
    }
  }

  const parentValidationChecker=(parentIndex,field,value)=>{
    const updatedParentValidationError = [...parentValidationError];
    if (field === "firstName" || field === "lastName") {
      updatedParentValidationError[parentIndex] = {
        ...updatedParentValidationError[parentIndex],
        [field]: firstNameLastNameValidation(value),
      };
      
    }else if(field=="address"){
      updatedParentValidationError[parentIndex] = {
        ...updatedParentValidationError[parentIndex],
        [field]: addressValidation(value),
      };
    }else if(field=="NIC"){
      updatedParentValidationError[parentIndex] = {
        ...updatedParentValidationError[parentIndex],
        [field]: validateNIC(value),
      };
    }else if(field=="phoneNo"){
      updatedParentValidationError[parentIndex] = {
        ...updatedParentValidationError[parentIndex],
        [field]: phoneNumberValidation(value),
      };
    }else if(field=="email"){
      updatedParentValidationError[parentIndex] = {
        ...updatedParentValidationError[parentIndex],
        [field]: emailValidation(value),
      };
    }
    setParentValidationError(updatedParentValidationError);
  }


  return (
    <>
      <Drawer
        // getContainer={false}
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
            <Button
            loading={verifyLoading}
              onClick={() => onFinish()}
              className="bg-blue-700 px-2 py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              Verify
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
        >
          <div>
            <p className="text-[15px] font-inter font-medium text-gray-500">
              Student Information
            </p>
            <CameraCaptureModal setuploadingImage={SetCamaraPhoto} camaraModelVisibile={camaraModelVisibile} setCamaraModelVisible={setCamaraModelVisible}/>
          </div>
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
                <div className="flex flex-row justify-start">
                  <ProfilePicUploading
                    setProfilePicture={setProfilePicture}
                    existingImageUrl={
                      selectedStudent?.photo != null
                        ? profilePicture!=null?profilePicture:`http://localhost:5000/${selectedStudent?.photo}`
                        : null
                    }
                  />
                  <Tag
                    onClick={handleCaptureModelOpen}
                    className="flex flex-row  justify-center items-center"
                    color={camaraPhoto==null?"cyan":"red"}
                  >
                    {camaraPhoto==null?"Take Photo Now":"Delete Camara Photo"}
                  </Tag>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                
                label="First Name"
                validateStatus={studentValidationError?.firstName?"error":"success"}
                help={studentValidationError?.firstName || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter First Name",
                  },
                ]}
              >
                <Input
                name="firstName"
                  readOnly={!editing}
                  onChange={handleStudentFieldChange}
                  value={studentData?.firstName}
                  placeholder="Please enter your First Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                
                label="Last Name"
                validateStatus={studentValidationError?.lastName?"error":"success"}
                help={studentValidationError?.lastName || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter last name",
                  },
                ]}
              >
                <Input
                name="lastName"
                  readOnly={!editing}
                  onChange={handleStudentFieldChange}
                  value={studentData?.lastName}
                  placeholder="Please enter your last name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Address"
                validateStatus={studentValidationError?.address?"error":"success"}
                help={studentValidationError?.address || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter Address",
                  },
                ]}
              >
                <Input
                  name="address"
                  readOnly={!editing}
                  onChange={handleStudentFieldChange}
                  value={studentData?.address}
                  placeholder="Please enter your address"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                validateStatus={studentValidationError?.email?"error":"success"}
                help={studentValidationError?.email || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter Email",
                  },
                ]}
              >
                <Input
                  name="email"
                  readOnly={!editing}
                  onChange={handleStudentFieldChange}
                  value={studentData?.email}
                  placeholder="Please enter your email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                
                label="School"
                validateStatus={studentValidationError?.school?"error":"success"}
                help={studentValidationError?.school || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter Lecturing School",
                  },
                ]}
              >
                <Input
                name="school"
                  readOnly={!editing}
                  onChange={handleStudentFieldChange}
                  value={studentData?.school}
                  placeholder="Please enter your school"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                
                label="Phone No"
                validateStatus={studentValidationError?.phoneNo?"error":"success"}
                help={studentValidationError?.phoneNo || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone No",
                  },
                ]}
              >
                <Input
                  name="phoneNo"
                  readOnly={!editing}
                  onChange={handleStudentFieldChange}
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
                      layout="vertical"
                      hideRequiredMark
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="First Name"
                            validateStatus={parentValidationError[index]?.firstName ? "error" : "success"}
                            help={parentValidationError[index]?.firstName || ""}
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
                          <Form.Item label="Last Name"
                          validateStatus={parentValidationError[index]?.lastName ? "error" : "success"}
                          help={parentValidationError[index]?.lastName || ""}
                          >
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
                          <Form.Item label="Address"
                          validateStatus={parentValidationError[index]?.address ? "error" : "success"}
                          help={parentValidationError[index]?.address || ""}
                          >
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
                          <Form.Item label="Phone No"
                          validateStatus={parentValidationError[index]?.phoneNo ? "error" : "success"}
                          help={parentValidationError[index]?.phoneNo || ""}
                          >
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
                          <Form.Item label="Email"
                          validateStatus={parentValidationError[index]?.email ? "error" : "success"}
                          help={parentValidationError[index]?.email || ""}
                          >
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
                          <Form.Item label="NIC"
                          validateStatus={parentValidationError[index]?.NIC ? "error" : "success"}
                          help={parentValidationError[index]?.NIC || ""}
                          >
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
