import React, { useEffect, useState } from "react";
import { Badge, ConfigProvider, Descriptions, Empty, message } from "antd";
import AddStudentClassCard from "./AddStudentClassCard";
import { getClassesForSelectedStudent } from "../../API";
import { useDispatch } from "react-redux";
import { getClassesforSpecificStudent } from "../../Actions/class";
import { useSelector } from "react-redux";

const StudentMiniProfile = ({ selectedStudent }) => {
  const [assignedClasses, SetAssignedClasses] = useState([]);
  const [assignedClassArray, setAssignedClassArray] = useState([]);
  const [miniClassCardConfig,setMiniClassCardConfig] = useState({
    assignType:"assign",
    color:"blue"
  });
  const studentAssignedClasses = useSelector(
    (state) => state.classes.studentAssignedClasses
  );
  const currentPage=useSelector((state) => state.page.pageNumber);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchStudentAssignedClasses();
  }, [selectedStudent]);


  useEffect(()=>{
    if (currentPage=="21") {
      setMiniClassCardConfig({
        assignType:"assign",
        color:"green"
      })
    }else if(currentPage=="18"){
      setMiniClassCardConfig({
        assignType:"payment",
        color:"blue"
      })
    }
  },[currentPage])


  useEffect(() => {
    if (studentAssignedClasses != null) {
      SetAssignedClasses(studentAssignedClasses);
    }
  }, [studentAssignedClasses]);

  const fetchStudentAssignedClasses = async () => {
    dispatch(
      getClassesforSpecificStudent(selectedStudent?.data?.UserID, message)
    );
    const classes = studentAssignedClasses || [];
    SetAssignedClasses(classes);
  };



  const innerItems = [
    {
      key: "2",
      label: "User ID",
      span: 2,
      children: `${selectedStudent?.data?.UserID}`,
    },
    {
      key: "3",
      label: "Student ID",
      span: 2,
      children: `${selectedStudent?.data?.studentID ||  selectedStudent?.data?.additionalInfo?.studentID}`,
    },
    {
      key: "4",
      label: "First Name",
      span: 2,
      children: `${selectedStudent?.data?.firstName }`,
    },
    {
      key: "5",
      label: "Last Name",
      span: 2,
      children: `${selectedStudent?.data?.lastName}`,
    },
  ];

  const InnerDescription = () => {
    return (
      <div>
        <Descriptions
          labelStyle={{ fontWeight: "bold" }}
          // title="User Info"
          layout="horizontal"
          bordered
          items={innerItems}
        />
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: (
        <img
          src={`http://localhost:5000/${selectedStudent?.data?.photo}`}
          alt="student"
          className="w-[100px] rounded-md"
        />
      ),
      span: 4,
      children: <InnerDescription />,
    },
  ];
  return (
    <div>
      <ConfigProvider
  theme={{
    components: {
      Descriptions: {
        labelBg:"#EBEEFF",
        controlItemBgActive:"#EBEEFF",
        contentBg:"#EBEEFF",
      },
    },
  }}
>
      <Descriptions
      className="shadow-md bg-slate-50 p-2"
        labelStyle={{ fontWeight: "bold" }}
        title="User Info"
        layout="horizontal"
        bordered
        items={items}
      />
      </ConfigProvider>
      <div className="w-full mt-2 ">
        <p className="text-[16px] font-medium">Assigned Classes</p>
        <div className="grid grid-cols-3">
          {assignedClasses.length === 0 || assignedClasses === null ? (
            <Empty
              description="Class Data not available"
              className="text-slate-400"
            />
          ) : (
            assignedClasses.map((classItem, index) => (
              <AddStudentClassCard
                key={classItem?.classID}
                assignType={miniClassCardConfig.assignType}
                classItem={classItem}
                color={miniClassCardConfig.color}
                newSelectedClasses={assignedClassArray}
                setNewSelectedClasses={setAssignedClassArray}
                selectedStudent={selectedStudent}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMiniProfile;
