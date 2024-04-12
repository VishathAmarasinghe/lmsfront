import React, { useEffect, useState } from "react";
import DropdownSelector from "../Components/AppointmentComp/DropdownSelector";
import DatePickerComp from "../Components/AppointmentComp/DatePicker";
import TimePickercomp from "../Components/AppointmentComp/TimePicker";
import { Col, ConfigProvider, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";
import AppointmentTeacherCard from "../Components/AppointmentComp/AppointmentTeacherCard";
import { getAllTeachers, getAllchildsOfParent } from "../API";
import AppointmentConfirmationPopup from "../Components/AppointmentComp/AppointmentConfirmationPopup";

const NewAppointment = () => {
  const parentID=JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [studentArray,setStudentArray]=useState([]);
  const [teacherArray,setTeacherArray]=useState([]);
  const [clickedTeacher,setClickedTeacher]=useState(null);
  const [confirmationOpen,setConfirmationOpen]=useState(false);
  const [appointmentData,setAppointmentData]=useState({
    studentID:"",
    parentID:"",
    teacherID:"",
    title:"",
    description:""
  })

  useEffect(()=>{
    setAppointmentData({...appointmentData,parentID:parentID})
    fetchChildren();
    fetchTeachers();

  },[])


  useEffect(()=>{
    setAppointmentData({...appointmentData,teacherID:clickedTeacher?.UserID});
  },[clickedTeacher])



  const fetchChildren = async () => {
    const childResult = await getAllchildsOfParent(parentID);
    console.log("child Result ", childResult.data);
    const valueArray = childResult?.data.map((student) => ({
      label: student?.firstName + " " + student?.lastName,
      value: student?.UserID
    }));

    console.log("re created studentsx ",valueArray);
    setStudentArray(valueArray);
  };


  const fetchTeachers=async()=>{
    const teacherResult=await getAllTeachers();
    
    setTeacherArray(teacherResult.data);
  }

  const handleStudentSelectionChange=(studentID)=>{
    setAppointmentData({...appointmentData,studentID:studentID});
  }


  const handleTextInputChange=(e)=>{
    setAppointmentData({...appointmentData,[e.target.name]:e.target.value})
  }


  const handleSubmit=()=>{
    if (appointmentData.description!="" && appointmentData.studentID!="" && appointmentData.teacherID!="" && appointmentData.title!="") {
      setConfirmationOpen(true);
    }else{
      message.error("Please fill all data to confirm the Appointment")
    }
    

  }
  

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Attendance Marking
        </h1>
      </div>

      <div className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className="w-full h-[100%]  flex flex-col items-center  bg-white  rounded-2xl">
          <AppointmentConfirmationPopup appointmentData={appointmentData} confirmationOpen={confirmationOpen} setConfirmationOpen={setConfirmationOpen} />
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: "#EBEEFF",
                },
              },
            }}
          >
            <Form
              layout="vertical"
              className=" font-medium w-[90%] h-[85%] mt-4 overflow-y-hidden overflow-x-hidden"
              hideRequiredMark
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="student"
                    label="Select Student"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Student ",
                      },
                    ]}
                  >
                    <Select
                    onChange={handleStudentSelectionChange}
                      placeholder="Please select a Student"
                      options={studentArray}
                      dropdownStyle={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                </Col>
               
              </Row>
              <div className=" w-full max-h-[53%] lg:max-h-[43%] overflow-y-auto mb-2 ">
                <div className="w-full grid grid-cols-1 lg:grid-cols-4">
                  {teacherArray.map((teacher, index) => (
                    <AppointmentTeacherCard key={index} clickedTeacher={clickedTeacher} setClickedTeacher={setClickedTeacher} teacher={teacher} />
                  ))}
                </div>
              </div>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                   
                    label="Title(Reason)"
                    rules={[
                      {
                        required: true,
                        message: "Please add a Title ",
                      },
                    ]}
                  >
                    <Input
                     name="title"
                     onChange={(e)=>handleTextInputChange(e)}
                      placeholder="Please enter a title"
                      style={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                  <Form.Item
                   
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please add a Description ",
                      },
                    ]}
                  >
                    <TextArea
                     onChange={(e)=>handleTextInputChange(e)}
                      rows={2}
                      name="description"
                      placeholder="Please enter a small description mentioning about what to discuss"
                      style={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </ConfigProvider>
          <div className="flex flex-col w-[90%] mt-1 items-end">
            <button  onClick={()=>handleSubmit()} className="w-full lg:w-[30%] bg-blue-500 hover:bg-blue-600 font-medium text-white p-2 rounded-md">
              Submit Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
