import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  ConfigProvider,
  Switch,
  Tag,
  message,
  notification,
} from "antd";
import HallCard from "./HallCard";
import SubjectAddingDrawer from "./SubjectAddingDrawer";
import { daysOfTheWeek } from "../../Utils/defaultValues";
import {
  get_all_grades,
  get_all_halls,
  get_all_subjects,
  get_classs_with_halls_and_days,
  newClass,
} from "../../Actions/class";
import { useForm } from "antd/es/form/Form";
import ClassTimeSlotcard from "./ClassTimeSlotcard";
import { getActivatedAllHalls, updateClass } from "../../API";

const ClassAddingModel = ({ addingCompOpen, setAddingCompOpen,classEditingData }) => {
  const teacherID = JSON.parse(localStorage.getItem("profile"))?.result?.UserID;
  const [form] = Form.useForm();
  const [onlineMode, setOnlineMode] = useState(false);
  const [subjectAddingDrawerOpen, setSubjectAddingDrawerOpen] = useState(false);
  const [halls, setHalls] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [allgrades, setAllgrades] = useState([]);
  const [loading, setloading] = useState(true);
  const [classAvailability, setClassAvailability] = useState([]);
  const [selectedtimeSlots, setSelectedTimeSlots] = useState(["", ""]);
  const [classData, setClassData] = useState(null);
    // className: "",
    // startTime: "",
    // endTime: "",
    // classMode: "physical",
    // classDay: "monday",
    // gradeID: "",
    // subjectID: "",
    // hallID: "",
    // teacherID: "",
 
  const [classtimeslot, setClassTimeSlot] = useState({
    StartTime: "",
    endTime: "",
    timeArray: [],
  });


  useEffect(()=>{
    if (addingCompOpen==true) {
      if (classEditingData!=null) {
        const {ClassDay,ClassMode,ClassName, StartTime,classFee,classID,endTime,gradeID,hallID,medium,subjectID}=classEditingData;
        setClassData({
          ClassDay,ClassMode,ClassName, StartTime,classFee,classID,endTime,gradeID,hallID,medium,subjectID
        })
        // handleOnlinePhysicalMode(classEditingData?.classMode=="physical"?true:false);
      }
    }
   
  },[addingCompOpen,classEditingData])

  const handleCleaningSelectedTimeslots = () => {
    setClassTimeSlot({
      StartTime: "",
      endTime: "",
      timeArray: [],
    });
  };

  useEffect(() => {
   if (classtimeslot.StartTime!="") {
      setClassData({
        ...classData,
        StartTime: classtimeslot.StartTime + ":00",
        endTime: classtimeslot.endTime + ":00",
        teacherID: teacherID,
      });
   }
   

  }, [classtimeslot,addingCompOpen]);

  useEffect(() => {
    console.log("class data", classData);
  }, [classData]);

  const handleFormValuesChange = (e) => {
    setClassData({ ...classData, [e.target.name]:e.target.value});
  };

  const handleAddingNewSubject = () => {
    setSubjectAddingDrawerOpen(true);
  };

  useEffect(() => {
    fetch_grades_subjects_halls();
  }, []);

  useEffect(() => {
    setloading(true);
    fetch_avalableTimes();
    setloading(false);
  }, [classData?.hallID, classData?.ClassDay]);


  const handleSubmitClassDetails=()=>{
   
    if (classEditingData!=null) {
      handleSubmitUpdateClass();
    }else{
      handleSubmitNewClassAccount();
    }
  }

  const handleSubmitNewClassAccount = async () => {
    console.log("final class ", classData);
    if (
      classtimeslot.StartTime != "" &&
      classtimeslot.endTime != "" &&
      classData.className != "" &&
      classData.gradeID != ""
    ) {
      const creatinResult = await newClass(classData);
      console.log("class creation result ", creatinResult);
      if (creatinResult.status==200) {
        notification.success("class Created successfully")
      }else{
        notification.error("Class Creation Error")
      }
      handleClose();

    } else {
      message.error("please complete all relevent details");
    }
  };




  const handleSubmitUpdateClass = async () => {
    console.log("final class ", classData);
    if (
      classtimeslot.StartTime != "" &&
      classtimeslot.endTime != "" &&
      classData.className != "" &&
      classData.gradeID != ""
    ) {
      const updateResult = await updateClass(classData);
      console.log("class creation result ", updateResult);
      if (updateResult.status==200) {
        message.success("class updated successfully")
      }else{
        message.error("Class Creation Error")
      }
      handleClose();

    } else {
      message.error("please complete all relevent details");
    }
  };





  const handleClose = () => {
    setAddingCompOpen(false);
    resetClassData();
  };

  const resetClassData = () => {
    setClassData(null);
    setClassTimeSlot({...classtimeslot,endTime:"",StartTime:"",timeArray:[]})
  };


  const fetch_avalableTimes = async () => {
    console.log("fetch comming here");
    const avalableData = await get_classs_with_halls_and_days(
      classData?.ClassDay,
      classData?.hallID
    );
    if (classEditingData!=null) {
      const updatedAvailability = avalableData.map(item => {
        if (item.class && item.class.classID === classData?.classID) {
          return { ...item, availability: false };
        }
        return item;
      });
      setClassAvailability(updatedAvailability);
    }else{
      setClassAvailability(avalableData);
    }
    
  };

  const fetch_grades_subjects_halls = async () => {
    const grades = await get_all_grades();

    const gradeWithOptions = grades.map((grade) => ({
      value: grade.gradeID,
      label: grade.gradeName,
    }));

    setAllgrades(gradeWithOptions);

    const subjects = await get_all_subjects();
    const subjectWithOptions = subjects.map((subject) => ({
      value: subject.subjectID,
      label: `${subject.subjectName} (${subject.medium})`,
    }));
    setSubjects(subjectWithOptions);

    const halls = await getActivatedAllHalls();
    console.log("hall data  ",halls);
    setHalls(halls.data);
  };

  const handleOnlinePhysicalMode = (mode) => {
    setOnlineMode(mode);
    setClassData({ ...classData, classMode: mode ? "online" : "physical" });
  };

  return (
    <Modal
      title="Add New Class"
      centered
      width={"90%"}
      open={addingCompOpen}
      onCancel={handleClose}
      footer={[
        <button
          key="cancel"
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg mr-2"
          onClick={handleClose}
        >
          Cancel
        </button>,
        <button
          key="ok"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmitClassDetails}
        >
          {classEditingData?"Update":"Create New"}
        </button>,
      ]}
    >
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <SubjectAddingDrawer
          subjectAddingDrawerOpen={subjectAddingDrawerOpen}
          setSubjectAddingDrawerOpen={setSubjectAddingDrawerOpen}
        />
        <Form
          layout="vertical"
          //   onFinish={handleSubmitNewClassAccount}
          hideRequiredMark
        >
          <Row gutter={16} >
            <Col span={12} >
              <Form.Item
                
                label="Class Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Class Name",
                  },
                ]}
              >
                <Input name="ClassName" onChange={handleFormValuesChange} value={classData?.ClassName}  placeholder="Please enter a Class Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item  label="Subject">
                <Row gutter={24}>
                  <Col span={16}>
                    <Select
                    name="subjectID"
                    value={classData?.subjectID}
                      onChange={(value) =>
                        setClassData({ ...classData, subjectID: value })
                      }
                      options={subjects}
                    />
                  </Col>
                  <Col>
                    <button
                      onClick={handleAddingNewSubject}
                      className="bg-blue-600 p-2 rounded-md text-white"
                    >
                      Add new Subject
                    </button>
                  </Col>
                </Row>
              </Form.Item>
              <div></div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                
                label="Select Grade"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Select
                name="gradeID"
                value={classData?.gradeID}
                  onChange={(value) =>
                    setClassData({ ...classData, gradeID: value })
                  }
                  options={allgrades}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                // name="classMode"
                label="Class Mode"
                rules={[
                  {
                    required: true,
                    message: "Please enter class mode",
                  },
                ]}
              >
                <div className="flex flex-row w-full ">
                  <Tag
                    onClick={() => handleOnlinePhysicalMode(true)}
                    className={`${
                      onlineMode ? "bg-green-500 text-white" : ""
                    } p-1 w-[20%] text-center font-medium text-[13px] hover:bg-green-500 hover:text-white`}
                    color="green"
                  >
                    Online
                  </Tag>
                  <Tag
                    onClick={() => handleOnlinePhysicalMode(false)}
                    className={`${
                      !onlineMode ? "bg-blue-500 text-white" : ""
                    } p-1 w-[20%] text-center font-medium text-[13px] hover:bg-blue-500 hover:text-white'`}
                    color="blue"
                  >
                    Physical
                  </Tag>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                
                label="Select Day"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Select name="classDay"
                 onChange={(value) =>
                  setClassData({ ...classData, ClassDay: value })
                }
                value={classData?.ClassDay}
                options={daysOfTheWeek} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                
                label="Class Fee"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Fee",
                  },
                ]}
              >
               <Input name="ClassFee" onChange={handleFormValuesChange} value={classData?.classFee}  placeholder="Please enter class fee" />
              </Form.Item>
            </Col>
          </Row>
          {!onlineMode ? (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="day"
                  label="Select Hall"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Hall",
                    },
                  ]}
                >
                  <div className="grid grid-cols-2 md:grid-cols-6 place-content-center">
                    {halls?.map((hall) => (
                      <HallCard
                        key={hall?.hallID}
                        classData={classData}
                        setClassData={setClassData}
                        hall={hall}
                      />
                    ))}
                  </div>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="day"
                label="Select Suitable time"
                help="Some Students are attending multiple classes please consider the time frames that student can be able to attend classes"
                rules={[
                  {
                    required: true,
                    message: "Please Select Hall",
                  },
                ]}
              >
                <div className="grid md:grid-cols-5 grid-cols-1 ">
                  {classAvailability === "" ||
                  classAvailability === undefined ? (
                    <></>
                  ) : (
                    classAvailability.map((timeslot) => (
                      <ClassTimeSlotcard
                      classID={classData?.classID}
                        key={timeslot.startTime}
                        timeslot={classtimeslot}
                        setTimeSlot={setClassTimeSlot}
                        availableData={timeslot}
                      />
                    ))
                  )}
                </div>
                <div>
                  {classtimeslot.timeArray.length != 0 ? (
                    <button
                      onClick={handleCleaningSelectedTimeslots}
                      className="p-1 bg-red-400 rounded-lg w-[90px] hover:bg-red-500 m-1 text-white"
                    >
                      Clear
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ClassAddingModel;
