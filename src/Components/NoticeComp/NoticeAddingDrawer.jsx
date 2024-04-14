import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  message,
  notification,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { createNewAnnouncement, getClassesByTeacher } from "../../API";
import { TeamOutlined } from "@ant-design/icons";

const NoticeAddingDrawer = ({noticeAddingDrawerOpen, setNoticeAddingDrawerOpen}) => {
  const teacherID = JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classShower, setClassShower] = useState(false);
  const [selectedModes,setSelectedModes]=useState([]);
  const [submitLoading,setSubmitloading]=useState(false);
  const [announcementData,setAnnouncementData]=useState({
    userID:teacherID,
    title:"",
    description:"",
    audience:"",
    modes:"",
    classGroup:""

  })

  useEffect(() => {
    if (noticeAddingDrawerOpen == true) {
      setAnnouncementData({...announcementData,userID:teacherID});
      fetchClassesRelatedToTeacher();
      setClassShower(false);
    }
  }, [noticeAddingDrawerOpen]);


  useEffect(()=>{
    console.log("notice drawer open ",noticeAddingDrawerOpen);
  },[noticeAddingDrawerOpen])


  useEffect(()=>{
    setAnnouncementData({...announcementData,classGroup:selectedClasses,modes:selectedModes});
  },[selectedClasses,selectedModes])


  useEffect(()=>{
    console.log("announcement data is ",announcementData);
    console.log("notice adding drawer Oepn ",noticeAddingDrawerOpen);
  },[announcementData])

  const fetchClassesRelatedToTeacher = async () => {
    try {
      const classResult = await getClassesByTeacher(teacherID);
      console.log("claases ", classResult.data[0]);
      setTeacherClasses(classResult.data[0]);
    } catch (error) {
      console.log("error",error);
      message.error("classes fetching Error!")
    }
   
  };

  const showDrawer = () => {
    setNoticeAddingDrawerOpen(true);
  };
  const onClose = () => {
    console.log("camer hereee");
    setNoticeAddingDrawerOpen(false);
    setAnnouncementData({

    userID:teacherID,
    title:"",
    description:"",
    audience:"",
    modes:"",
    classGroup:""
    })
    setSelectedClasses([])
    setSelectedModes([])
    setSubmitloading(false);
    
  };

  const closeDrawer=()=>{
    console.log("xlose detected");
    setNoticeAddingDrawerOpen(false);
    console.log("cloed");
  }


  const handleSubmitAnnouncement=async()=>{
    setSubmitloading(true);
    try {    
    if (announcementData.title!="" && announcementData.description!="" && announcementData.userID!="") {
        const announcementResult=await createNewAnnouncement(announcementData);
        console.log("annoucment Result  ",announcementResult);
        if (announcementResult.status==200) {
            notification.success({
                message:"Announcement Created successfully!",
                description:"Announcement will be appear in others interfaces"
            })
        }else{
            notification.error({
                message:"Announcement Creation Error!",
                description:"Please try again later."
            })
        }
        onClose();
    }else{
        message.error("please fill below details to proceed!")
        setSubmitloading(false);
    }
  } catch (error) {
      message.error("Announcement creating error!")
  }
   
  }


  const handleValueChange=(e)=>{
    setAnnouncementData({...announcementData,[e.target.name]:e.target.value});
  }

  const target_audiance = [
    {
      label: "All Students",
      value: "all",
    },
    {
      label: "All Students + All Parents",
      value: "AllstudentParents",
    },
    {
      label: "Class Students",
      value: "classStudents",
    },
    {
      label: "Class Students + Parents",
      value: "classStudentsParents",
    },
    {
      label: "All Parents",
      value: "allParents",
    },
    {
      label: "Class Parents",
      value: "ClassParents",
    },
  ];

  const sending_Mode=["Email","SMS"]

  const handleAudienceSelection = (value) => {
    setSelectedClasses([]);
    setAnnouncementData({...announcementData,audience:value});
    console.log("selected values is ", value);
    if (
      value == "classStudents" ||
      value == "classStudentsParents" ||
      value == "ClassParents"
    ) {
      setClassShower(true);
    } else {
      setClassShower(false);
    }
  };

  const handleAddingClassToList = (classID) => {
    const checkAlreadyAddedOrNot = selectedClasses.find(
      (classdata) => classdata == classID
    );
    if (checkAlreadyAddedOrNot) {
      const updatedClassArray = selectedClasses.filter(
        (classData) => classData != classID
      );
      setSelectedClasses(updatedClassArray);
    } else {
      setSelectedClasses([...selectedClasses, classID]);
    }
  };


  const handleAddingModelsToList = (modeName) => {
    const checkAlreadyAddedOrNot = selectedModes.find(
      (modeData) => modeData == modeName
    );
    if (checkAlreadyAddedOrNot) {
      const updatedClassArray = selectedModes.filter(
        (modeData) => modeData != modeName
      );
      setSelectedModes(updatedClassArray);
    } else {
      setSelectedModes([...selectedModes, modeName]);
    }
  };

  const ClassTag = () => {
    return teacherClasses.map((classData) => (
      <Tag
        key={classData.classID}
        onClick={() => handleAddingClassToList(classData.classID)}
        color="blue"
        className={`m-1 hover:bg-blue-500 hover:text-white ${
          selectedClasses.includes(classData.classID) ? "bg-blue-500 text-white" : ""
        }`}
      >
        <p className="font-medium">{classData?.ClassName}</p>
        <p>
          {classData?.subjectName}-({classData?.medium})-
          {classData?.gradeName}
        </p>
      </Tag>
    ));
  };

  return (
    <Drawer
      title="New Announcement"
      width={"40%"}
      onClose={onClose}
      
      open={noticeAddingDrawerOpen}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
          loading={submitLoading}
            onClick={handleSubmitAnnouncement}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Send Announcement
          </Button>
        </Space>
      }
    >
      <div className="">
      <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: "#EBEEFF",
                },
              },
            }}
          >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <FormItem label="Title">
                <Input onChange={handleValueChange} name="title" value={announcementData.title} className="bg-[#EBEEFF]" placeholder="Enter suitable Title here" />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="Description">
                <TextArea onChange={handleValueChange} name="description"value={announcementData.description} className="bg-[#EBEEFF]" rows={2} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="Target Audience">
                <Select
                className="bg-[#EBEEFF]"
                  onChange={handleAudienceSelection}
                  placeholder="Select Target Audiance"
                  options={target_audiance}
                />
              </FormItem>
            </Col>
          </Row>
          <div className="w-full">
            {classShower ? (
              <div>
                <p className="text-gray-400 my-2">
                  Please select class/classes to send announcement
                </p>
                <div className="grid grid-cols-2">
                  <ClassTag />
                </div>
              </div>
            ) : null}
          </div>
          <Row gutter={16}>
            <Col span={24}>
                <FormItem
                label="Select Mode"
                >
                    <div className="border-2 border-green-500 grid grid-cols-2">
                        {
                            sending_Mode.map((modes,index)=>
                            <Tag key={index} onClick={()=>handleAddingModelsToList(modes)} 
                            className={`m-1 p-2 hover:bg-blue-500 hover:text-white ${
                                selectedModes.includes(modes) ? "bg-blue-500 text-white" : ""
                              }`}
                            color="blue">
                                <p>{modes}</p>
                            </Tag>
                            )
                        }
                    </div>
                </FormItem>
            </Col>
          </Row>
        </Form>
        </ConfigProvider>
      </div>
    </Drawer>
  );
};

export default NoticeAddingDrawer;
