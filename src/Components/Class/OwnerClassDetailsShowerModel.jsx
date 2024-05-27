import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Modal, Segmented, message } from "antd";
import OwnerClassDetailDescription from "./OwnerClassDetailDescription";
import ClassPanelTeacherInfoTable from "./ClassPanelTeacherInfoTable";
import ClassPanelStudentInfoTable from "./ClassPanelStudentInfoTable";
import {
  getAllStudentsByClass,
  getAllTeachersByClass,
  getStudentAndTeacherDetails,
} from "../../API";

const OwnerClassDetailsShowerModel = ({
  selectedClass,
  classDetailedPanelOpen,
  setClassDetailedPanelOpen,
}) => {
  const [selectedSegment, setSelectedSegment] = useState("General Info");
  const [teachers, setTeachers] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    if (classDetailedPanelOpen) {
      fetchStudentAndTeacherDetails();
    }
  }, [classDetailedPanelOpen]);

  const fetchStudentAndTeacherDetails = async () => {
    try {
      try {
        const studentIDArray = await getAllStudentsByClass(
          selectedClass?.classID
        );
        try {
          const teacherIDArray = await getAllTeachersByClass(
            selectedClass?.classID
          );
          console.log("student id Array ",studentIDArray);
          console.log("teacher id Array ",teacherIDArray);
          if (studentIDArray.status == 200 && teacherIDArray.status == 200) {
            const allPeople = {
              teacher: teacherIDArray.data?.map((teacher)=>(teacher?.teacherID)),
              student: studentIDArray.data?.map((student=>(student?.studentID))),
            };
            const peopleResult = await getStudentAndTeacherDetails(allPeople);
            const studentArray = peopleResult?.data?.student?.map(
              (student) => ({
                ...student,
                photoName: student?.photo + ")" + student?.firstName,
              })
            );

            const teacherArray = peopleResult?.data?.teacher?.map(
              (teacher) => ({
                ...teacher,
                photoName: teacher?.photo + ")" + teacher?.firstName,
              })
            );
            setStudents(studentArray);
            setTeachers(teacherArray);
          }

        } catch (error) {
          message.error("Teacher Data fetching Error!");
          console.log(error);
        }
      } catch (error) {
        message.error("Student Data fetching Error!");
        console.log(error);
      }
    } catch (error) {
      console.log("error ", error);
      message.error("student and parent details fetching error!");
    }
  };

  const handleOk = () => {
    setClassDetailedPanelOpen(false);
  };

  const handleCancel = () => {
    setClassDetailedPanelOpen(false);
  };

  const handleSegmentChanging = (value) => {
    console.log("segment Value is ", value);
    setSelectedSegment(value);
  };

  return (
    <Modal
      title="Class Details"
      width={"70%"}
      centered
      open={classDetailedPanelOpen}
      onOk={handleOk}
      closable={false}
      onCancel={handleCancel}
      footer={[
        <Button
          key="ok"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <div className="w-full border-2 border-red-500 ">
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                itemSelectedBg: "rgb(59 130 246)",
                itemSelectedColor: "white",
                trackBg: "rgb(229 231 235)",
              },
            },
          }}
        >
          <Segmented
            options={["General Info", "Teacher Info", "Student Info"]}
            onChange={(value) => handleSegmentChanging(value)}
          />
        </ConfigProvider>
        <div className="w-full border-blue-500 border-2">
          {selectedSegment == "General Info" ? (
            <div className="w-full h-[]">
              <OwnerClassDetailDescription selectedClass={selectedClass} />
            </div>
          ) : selectedSegment == "Teacher Info" ? (
            <div>
              <ClassPanelTeacherInfoTable
                fetchStudentAndTeacherDetails={fetchStudentAndTeacherDetails}
                classID={selectedClass?.classID}
                teachers={teachers}
                setTeachers={setTeachers}
              />
            </div>
          ) : selectedSegment == "Student Info" ? (
            <div>
              <ClassPanelStudentInfoTable
                fetchStudentAndTeacherDetails={fetchStudentAndTeacherDetails}
                classID={selectedClass?.classID}
                students={students}
                setStudents={setStudents}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OwnerClassDetailsShowerModel;
