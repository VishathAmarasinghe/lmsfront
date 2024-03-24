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
} from "antd";
import HallCard from "./HallCard";
import SubjectAddingDrawer from "./SubjectAddingDrawer";
import { daysOfTheWeek } from "../../Utils/defaultValues";
import { get_all_grades, get_all_halls, get_all_subjects } from "../../Actions/class";
import { getAvailableClassesOneDay } from "../../Utils/getAvailableClasses";

const ClassAddingModel = ({ addingCompOpen, setAddingCompOpen }) => {
  const [onlineMode, setOnlineMode] = useState(false);
  const [subjectAddingDrawerOpen,setSubjectAddingDrawerOpen]=useState(false);
  const [halls,setHalls]=useState([]);
  const [subjects,setSubjects]=useState([]);
  const [allgrades,setAllgrades]=useState([])

  const handleAddingNewSubject=()=>{
    setSubjectAddingDrawerOpen(true);
  }

  useEffect(()=>{
    fetch_grades_subjects_halls();

  },[])


  const fetch_grades_subjects_halls=async()=>{
    const grades=await get_all_grades();

    const gradeWithOptions=grades.map(grade=>({
        value: grade.gradeID,
        label: grade.gradeName,
    }))

    setAllgrades(gradeWithOptions);

    const subjects=await get_all_subjects();
    const subjectWithOptions=subjects.map(subject=>({
        value: subject.subjectID,
        label: `${subject.subjectName} (${subject.medium})`,
    }))
    setSubjects(subjectWithOptions);

    const halls =await get_all_halls();
    setHalls(halls);

    getAvailableClassesOneDay("monday","HA1");

  }


  return (
    <Modal
      title="Add New Class"
      centered
      width={"90%"}
      visible={addingCompOpen} // Changed 'open' to 'visible'
      onOk={() => setAddingCompOpen(false)}
      onCancel={() => setAddingCompOpen(false)}
    >
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <SubjectAddingDrawer  subjectAddingDrawerOpen={subjectAddingDrawerOpen} setSubjectAddingDrawerOpen={setSubjectAddingDrawerOpen}/>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="classname"
                label="Class Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Class Name",
                  },
                ]}
              >
                <Input placeholder="Please enter a Class Name" />
              </Form.Item>
            </Col>{" "}
            {/* Closed the Col tag */}
            <Col span={12}>
              <Form.Item name="subject" label="Subject">
                <Row gutter={24}>
                  <Col span={16}>
                    <Select options={subjects} />
                  </Col>
                  <Col>
                    <button onClick={handleAddingNewSubject} className="bg-blue-600 p-2 rounded-md text-white">
                      Add new Subject
                    </button>
                  </Col>
                </Row>
              </Form.Item>
              <div></div>
            </Col>{" "}
            {/* Closed the Col tag */}
          </Row>
          <Row gutter={16}>
            {" "}
            {/* Corrected the closing tag */}
            <Col span={12}>
              <Form.Item
                name="grade"
                label="Select Grade"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Select options={allgrades} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mode"
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
                    onClick={() => setOnlineMode(true)}
                    className={`${
                      onlineMode ? "bg-green-500 text-white" : ""
                    } p-1 w-[20%] text-center font-medium text-[13px] hover:bg-green-500 hover:text-white`}
                    color="green"
                  >
                    Online
                  </Tag>
                  <Tag
                    onClick={() => setOnlineMode(false)}
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
                name="day"
                label="Select Day"
                rules={[
                  {
                    required: true,
                    message: "Please enter class Time",
                  },
                ]}
              >
                <Select options={daysOfTheWeek} defaultValue="monday" />
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
                    {
                        halls.map((hall)=>(<HallCard hall={hall}/>))
                    }
                    
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
                <div className="grid grid-cols-3 grid-rows-8"></div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ClassAddingModel;
