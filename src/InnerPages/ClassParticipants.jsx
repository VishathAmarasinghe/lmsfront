import React, { useEffect, useState } from "react";
import ClassParticipantCard from "./ClassParticipantCard";
import { Collapse, Tooltip, message } from "antd";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useSelector } from "react-redux";
import { getStudentAndTeacherDetails, getStudentListAsExcel } from "../API";
import LoadingInnerPage from "./LoadingInnerPage";

const ClassParticipants = () => {
  const classInside = useSelector((state) => state.classes.selectedClass);
  const [loading, setLoading] = useState(true);
  const [participantData, setPaticipantData] = useState({
    student: [],
    teacher: [],
  });

  useEffect(() => {
    if (classInside != null) {
      fetchStudentDetails();
    }
  }, [classInside]);

  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const teacherData = classInside?.teachers?.map(
        (teacher) => teacher.teacherID
      );
      const studentData = classInside?.students?.map(
        (student) => student.studentID
      );
      const allPeople = {
        teacher: teacherData,
        student: studentData,
      };
      const peopleResult = await getStudentAndTeacherDetails(allPeople);
      console.log("all people fetching reulst ", peopleResult.data);
      setPaticipantData(peopleResult.data);
      setLoading(false);
    } catch (error) {
      message.error("participant data fetching error!");
      console.log("participant data fetching error ", error);
    }
  };

  const handleDownloadStudentSheet = async () => {
    try {
      const studentList = participantData?.student;
      const studentSheetResult = await getStudentListAsExcel(studentList);
      console.log("studenr sheet result ", studentSheetResult);

      const blob = new Blob([studentSheetResult.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      
      const url = window.URL.createObjectURL(blob);

      
      const link = document.createElement("a");
      link.href = url;
      link.download = "students.xlsx";

    
      document.body.appendChild(link);
      link.click();

     
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("student sheet downloading error", error);
      message.error("student sheet downloading error!");
    }
  };

  return (
    <div className="w-full border-2 border-black flex flex-col items-center">
      <div className="w-[95%] border-2 border-green-600 mt-2 flex flex-col">
        <h1 className="text-[17px] font-inter font-semibold mb-1">
          Course Participants
        </h1>
        <div className="w-full">
          <Collapse
            items={[
              {
                key: "1",
                label: (
                  <div className="font-inter font-medium text-[15px] flex flex-row justify-between items-center">
                    <p>Instructors</p>
                    <p className="mr-8 text-[13px]">
                      Teacher Count:{participantData?.teacher.length}
                    </p>
                  </div>
                ),
                children: (
                  <div>
                    {loading ? (
                      <LoadingInnerPage />
                    ) : (
                      participantData?.teacher?.map((teacher) => (
                        <ClassParticipantCard
                          key={teacher.UserID}
                          userData={teacher}
                        />
                      ))
                    )}
                  </div>
                ),
              },
              {
                key: "2",
                label: (
                  <div className="flex flex-row justify-between items-center">
                    <div className="font-inter font-medium text-[15px] w-full flex flex-row justify-between items-center">
                      <p>Students</p>
                      <p className="mr-2 text-[13px]">
                        Student Count:{participantData?.student.length}
                      </p>
                    </div>
                    <Tooltip title="Download Student List">
                      <button onClick={handleDownloadStudentSheet}>
                        <DownloadRoundedIcon className="text-green-700 hover:text-black" />
                      </button>
                    </Tooltip>
                  </div>
                ),
                children: (
                  <div>
                    {loading ? (
                      <LoadingInnerPage />
                    ) : (
                      participantData?.student?.map((student) => (
                        <ClassParticipantCard
                          key={student.UserID}
                          userData={student}
                        />
                      ))
                    )}
                  </div>
                ),
              },
            ]}
          />
          {/* <ClassParticipantCard/> */}
        </div>
      </div>
    </div>
  );
};

export default ClassParticipants;
