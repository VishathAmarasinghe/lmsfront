import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  DatePicker,
  Descriptions,
  Form,
  Modal,
  Tag,
  Row,
  Col,
  TimePicker,
  message,
  notification,
} from "antd";
import {
  getClassesWithTeacherAndStudent,
  updateAppointmentTOApporived,
} from "../../API";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setPendingAppointments } from "../../Actions/appointments";

const TeacherAppointmentUpdateModel = ({
  selectedAppointment,
  setSelectedAppointment,
  openeditingDrawer,
  setOpeneditingDrawer,
}) => {
  const [classes, setClasses] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updateState,setUpddateState]=useState(false);
  const dispatch=useDispatch();

  const [appoinmentConfirmData, setAppointmentConfirmData] = useState({
    date: "",
    time: "",
    additionalInfo: "",
    appointmentID: selectedAppointment?.appointmentID,
  });

  useEffect(() => {
    if (openeditingDrawer == true) {
      console.log("came here opend");
      setUpddateState(false);
      setAppointmentConfirmData({...appoinmentConfirmData,appointmentID:selectedAppointment?.appointmentID})
      fetchClassesRelatedToBothTeacherAndStudent();
    }
  }, [openeditingDrawer]);

  const fetchClassesRelatedToBothTeacherAndStudent = async () => {
    const classResult = await getClassesWithTeacherAndStudent(
      selectedAppointment.teacherID,
      selectedAppointment.studentID
    );
    console.log("class result ", classResult);
    setClasses(classResult.data);
  };

  const handleOk = async () => {
    setConfirmLoading(true)
    if (
      appoinmentConfirmData.additionalInfo != "" &&
      appoinmentConfirmData.date != "" &&
      appoinmentConfirmData.time != ""
    ) {
        console.log("appointment confirmData ",appoinmentConfirmData);
      const updationResult = await updateAppointmentTOApporived(
        appoinmentConfirmData
      );
      if (updationResult.status == 200) {
        notification.success({
          message: "Appointment Approved Succesfully!",
          description: "Date and time sent to the parent",
        });
      }else{
        notification.error({
            message:"Appointment Updation Failed!",
            description:"please try again later."
        })
      }
      handleCancel();
    } else {
      message.error("please set Date and time with additional info");
      setConfirmLoading(false)
    }
    dispatch(setPendingAppointments(selectedAppointment?.teacherID));
  };

  const handleDataChange = (date, dateString) => {
    setAppointmentConfirmData({
      ...appoinmentConfirmData,
      date: dayjs(dateString).format("YYYY-MM-DD"),
    });
  };

  const handleTimeChange = (time, timeString) => {
    console.log("Time String us ", timeString);
    setAppointmentConfirmData({ ...appoinmentConfirmData, time: timeString });
  };

  const handleAdditionalInfoChange = (e) => {
    setAppointmentConfirmData({
      ...appoinmentConfirmData,
      additionalInfo: e.target.value,
    });
  };

  const handleCancel = () => {
    setOpeneditingDrawer(false);
    setConfirmLoading(false);
    setAppointmentConfirmData({
        date: "",
        time: "",
        additionalInfo: "",
        appointmentID: "",
    })
  };

  const ClassDisplay = () => {
    return (
      <div className="grid grid-cols-4">
        {classes.map((classres, index) => (
          <Tag
            color="blue"
            className="p-1 hover:bg-blue-400 hover:text-white"
            key={index}
          >
            <p className="font-medium">
              {classres.classID} - {classres.ClassName}
            </p>
            <div className="w-full flex flex-col">
              <p>Subject-{classres.subjectName} </p>
              <p>Grade-{classres.gradeName} </p>
            </div>
          </Tag>
        ))}
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Appointment ID",
      children: selectedAppointment?.appointmentID,
    },
    {
      key: "2",
      label: "Publish Date",
      children: selectedAppointment?.publishdate,
    },
    {
      key: "3",
      label: "Status",
      children: (
        <div>
          <Badge status="processing" text={selectedAppointment?.status} />
        </div>
      ),
    },
    {
      key: "4",
      label: "Parent ID",
      children: selectedAppointment?.parentID,
    },
    {
      key: "5",
      label: "Parent Name",
      children: selectedAppointment?.parentName,
      span: 2,
    },
    {
      key: "6",
      label: "Student ID",
      children: selectedAppointment?.studentID,
    },
    {
      key: "7",
      label: "Student Name",
      children: selectedAppointment?.studentName,
      span: 2,
    },
    {
      key: "8",
      label: "Student Attending Classes",
      children: <ClassDisplay />,
    },
  ];

  return (
    <Modal
      title="Appointment Confirmation"
      open={openeditingDrawer}
      width={"80%"}
      centered
      maskClosable={false}
      onCancel={handleCancel}
      footer={
        <div className="flex justify-end">
          <Button className="mr-2" onClick={handleCancel}>
            Cancel
          </Button>
          {
            selectedAppointment?.userStatus!="Created" && updateState==false?<Button className="mr-2 bg-slate-300 hover:bg-slate-400 hover:text-white" onClick={()=>setUpddateState(true)}>
            Update Again
          </Button>:<></>
          }
         
          <Button
            loading={confirmLoading}
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleOk}
          >
            Confirm
          </Button>
        </div>
      }
    >
      <div className="">
        <Descriptions
          labelStyle={{ fontWeight: "bold" }}
          bordered
          items={items}
        />
        <div className=" mt-2 border-t-2 border-dashed border-slate-400">
          <div className="w-full bg-slate-100 p-2 mt-2 flex flex-row items-center justify-between">
            <div className="flex flex-row w-[50%] whitespace-normal break-words ">
              <p className="text-[15px] font-semibold mr-4">Title:</p>
              <p className="text-[15px]">{selectedAppointment?.title}</p>
            </div>
            {selectedAppointment?.date != null ? (
              <div className="flex flex-row  w-[50%] whitespace-normal break-words">
                <p className="text-[15px] font-semibold mr-4">Approved Date:</p>
                <p className="text-[15px]">{selectedAppointment?.date.substring(0,10)}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="w-full bg-slate-100 p-2 mt-2 flex flex-row items-center justify-between">
            <div className="flex flex-row w-[50%] whitespace-normal break-words ">
              <p className="text-[15px] font-semibold mr-4">Description:</p>
              <p className="text-[15px]">{selectedAppointment?.description}</p>
            </div>
            {selectedAppointment?.time != null ? (
              <div className="flex flex-row  w-[50%] whitespace-normal break-words">
                <p className="text-[15px] font-semibold mr-4">Approved Time:</p>
                <p className="text-[15px]">{selectedAppointment?.time}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {
            selectedAppointment?.teacherNote!=null?
            <div className="w-full bg-slate-100 p-2 mt-2 flex flex-row items-center ">
                <p className="text-[15px] font-semibold mr-4">Teacher Note:</p>
                <p className="text-[15px]">{selectedAppointment?.teacherNote}</p>
            </div>:<></>

          }
        </div>
        {
            updateState  || selectedAppointment?.userStatus=="Created" ?<div className="w-full  p-2 pt-4 mt-3 border-t-2 border-dashed border-slate-400">
            <Form className="font-medium">
              <Row gutter={16}>
                <Col span={12}>
                  <FormItem label="Appointment Date">
                    <DatePicker
                    value={appoinmentConfirmData.date!=""?dayjs(appoinmentConfirmData.date):dayjs()}
                      onChange={handleDataChange}
                      format="YYYY-MM-DD"
                      minDate={dayjs()}
                      className="w-full bg-[#EBEEFF]"
                      picker="date"
                    />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Appointment Time">
                    <TimePicker
                    // value={appoinmentConfirmData.time!=""?dayjs(appoinmentConfirmData.time):dayjs()}
                      onChange={handleTimeChange}
                      format="HH:mm:ss"
                      defaultPickerValue={dayjs()}
                      minDate={dayjs()}
                      className="w-full bg-[#EBEEFF]"
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <FormItem label="Teacher Necessary Details">
                    <TextArea
                    value={appoinmentConfirmData.additionalInfo}
                      onChange={handleAdditionalInfoChange}
                      name="additionalInfo"
                      className="w-full bg-[#EBEEFF]"
                    />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>:<>
          
          </>

        }
        
      </div>
    </Modal>
  );
};

export default TeacherAppointmentUpdateModel;
