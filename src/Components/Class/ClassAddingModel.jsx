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
  get_classes_by_teacher,
  get_classs_with_halls_and_days,
  newClass,
  selectedClass,
} from "../../Actions/class";
import { useForm } from "antd/es/form/Form";
import ClassTimeSlotcard from "./ClassTimeSlotcard";
import { getActivatedAllHalls, getClassesByTeacher, getCreatedZoomMeeting, getSpecificClass, updateClass } from "../../API";
import { salaryValidation, stringValidationWithLenght } from "../../Utils/Validations";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import GradeAddingModel from "./GradeAddingModel";

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
  const [errorValidator,setErrorValidator]=useState(null);
  const [meetingLink,setMeetingLink]=useState(null);
  const [gradeAddingModelOpen,setGradeAddingModelOpen]=useState(false);
  const {classID}=useParams();
  const dispatch=useDispatch();

 
  const [classtimeslot, setClassTimeSlot] = useState({
    StartTime: "",
    endTime: "",
    timeArray: [],
  });


  useEffect(()=>{
    if (addingCompOpen==true) {
      if (classEditingData!=null) {
        const {ClassDay,ClassMode,ClassName, StartTime,classFee,classID,endTime,gradeID,hallID,medium,subjectID,meetingLink}=classEditingData;
        setClassData({
          ClassDay,ClassMode,ClassName, StartTime,classFee,classID,endTime,gradeID,hallID,medium,subjectID,meetingLink
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
    handleValidations(e);
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


  const handleValidations=(e)=>{
    if (e.target.name=="ClassFee") {
      setErrorValidator({...errorValidator,ClassFee:salaryValidation(e.target.value)});
    }else if(e.target.name=="ClassName"){
      setErrorValidator({...errorValidator,ClassName:stringValidationWithLenght(e.target.value,49)})
    }
  }


  const handleAddingZoom=async()=>{
    try {
      
      if (classData?.ClassName!="" && classData?.ClassName!=null && classData?.gradeID!="" && classData?.gradeID!=null && classData?.subjectID!="" && classData?.subjectID!=null &&  classData?.ClassDay!="" && classData?.ClassDay!=null) {
        const meetingInfo={
          className:classData?.ClassName, 
          gradeName:classData?.gradeName, 
          subjectName:classData?.subjectName,
          classDay:classData?.ClassDay
        }
          const meetingFetchingResult=await getCreatedZoomMeeting(meetingInfo);
          if (meetingFetchingResult.status==200) {
            setClassData({...classData,meetingLink:meetingFetchingResult.data?.meetingLink})
          }
          console.log("meeting fetch result ",meetingFetchingResult);
      }else{
        message.error("Please complete ClassName,Grade, subject and class Day to proceed with meeting link!")
      }
      
    } catch (error) {
      console.log("error ",error);
      message.error("Zoom meeting fetching  error")
    }
  }


  const checkValidationStatusToSubmit = () => {
    let errorStatus = true;
    console.log("overall validate error ",errorValidator);
    for (const key in errorValidator) {
      if (errorValidator[key] !== "") {
        return false;
      }
    }
    const requiredcolumns = [
      "ClassDay",
      "ClassMode",
      "ClassName",
      "StartTime",
      "classFee",
      "endTime",
      "gradeID",
      "hallID",
      "subjectID"

    ];
    for (const value of requiredcolumns) {
      if (
        classData[value] == "" ||
        classData[value] == null ||
        classData[value] == undefined
      ) {
        // if (classData?.additionalInfo[value] == "" ||
        // classData?.additionalInfo[value] == null ||
        // classData?.additionalInfo[value] == undefined) {
          
        // }
        message.error(`please fill mandatory columns (${value}) `);
        errorStatus = false;
        
      }
    }
    return errorStatus;
  };


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
     checkValidationStatusToSubmit()
    ) {
      const creatinResult = await newClass(classData);
      console.log("class creation result ", creatinResult);
      if (creatinResult.status==200) {
        notification.success({message:"class Created successfully",description:"Your class Created staff can add new students now!"})
        dispatch(get_classes_by_teacher(teacherID))
      }else{
        notification.error("Class Creation Error")
      }
      handleClose();

    } else {
      message.error("please complete all relevent details");
    }
  };


  const handleOpenGradeAddingModel=()=>{
    setGradeAddingModelOpen(true);
  }




  const handleSubmitUpdateClass = async () => {
    console.log("final class ", classData);
    if (
      checkValidationStatusToSubmit()
    ) {
      const updateResult = await updateClass(classData);
      console.log("class creation result ", updateResult);
      if (updateResult.status==200) {
        message.success("class updated successfully")
        const classDataResult=await getSpecificClass(classID);
        if (classDataResult?.status==200) {
          console.log("class result is ",classDataResult);
          dispatch(selectedClass(classDataResult.data[0]));
        }
      }else{
        message.error("Class Creation Error")
      }
      handleClose();

    } else {
      message.error("please complete all relevent To Update details");
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
    setClassData({ ...classData, ClassMode: mode ? "online" : "physical" });
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
          fetch_grades_subjects_halls={fetch_grades_subjects_halls}
        />
        <GradeAddingModel fetch_grades_subjects_halls={fetch_grades_subjects_halls} gradeAddingDrawerOpen={gradeAddingModelOpen} setGradeAddingDrawer={setGradeAddingModelOpen}/>
        <Form
          layout="vertical"
          //   onFinish={handleSubmitNewClassAccount}
          hideRequiredMark
        >
          <Row gutter={16} >
            <Col span={12} >
              <Form.Item

                validateStatus={errorValidator?.ClassName ? "error" : "success"}
                help={errorValidator?.ClassName || ""}
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
            <Col span={12} >
              <Form.Item
                
                label="Select Grade"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Row gutter={16}>
                <Col span={16}>
                <Select
                name="gradeID"
                value={classData?.gradeID}
                  onChange={(value) =>
                    setClassData({ ...classData, gradeID: value })
                  }
                  options={allgrades}
                />
                </Col>
                <Col span={8}>
                <button
                      onClick={handleOpenGradeAddingModel}
                      className="bg-blue-600 p-2 rounded-md text-white"
                    >
                      Add new Grade
                </button>
                </Col>
                </Row>
              </Form.Item>
              
            </Col>
            <Col span={12}>
              <Form.Item
                // name="classMode"
                label="Class Mode"
                help={<a target="_blank">{classData?.meetingLink}</a>}
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
                  <Tag onClick={handleAddingZoom} className="text-center p-1 bg-purple-500 text-white px-2 font-medium hover:bg-purple-600">
                    Add Zoom Meeting
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
                 validateStatus={errorValidator?.ClassFee ? "error" : "success"}
                 help={errorValidator?.ClassFee || ""}
                label="Class Fee"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Fee",
                  },
                ]}
              >
               <Input name="classFee" onChange={handleFormValuesChange} value={classData?.classFee}  placeholder="Please enter class fee" />
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
