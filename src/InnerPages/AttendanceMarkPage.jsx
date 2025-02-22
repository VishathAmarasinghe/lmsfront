import { Checkbox, Empty, Form, Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getClassesForNotSelectedStudent } from "../API";
import AttendanceScanningPage from "../Components/Attendance/AttendanceScanningPage";

const AttendanceMarkPage = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedClass,setSelectedClass]=useState(null);
  const [smsNotificationStatus,setSMSNotificationStatus]=useState(false);

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    const classes = await getClassesForNotSelectedStudent("");
    console.log("classes ", classes.data);
    setClasses(classes.data);
    setFilteredClasses(classes.data);
  };

  const filterClasses = (searchText) => {
    const filtered = classes.filter((classItem) => {
      return (
        classItem.ClassName.toLowerCase().includes(searchText.toLowerCase()) ||
        classItem.classID.toLowerCase().includes(searchText.toLowerCase()) ||
        classItem.gradeName.toLowerCase().includes(searchText.toLowerCase()) ||
        classItem.subjectName.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredClasses(filtered);
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchName(searchText);
    filterClasses(searchText);
  };

  const handleClassClicked = (selectedClass) => {
    console.log("selected class ",selectedClass);
    setSelectedClass(selectedClass);
  };


  const handleChangeCheckBox=(e)=>{
    console.log("handle checkbox changing ",e.target.checked);
    setSMSNotificationStatus(e.target.checked);
  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Attendance Marking
        </h1>
      </div>
      {
        selectedClass==null?
      
      <div className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className=" w-full p-5">
          <Form layout="vertical">
            <Form.Item label="Select Class">
              <Input
                className="w-full lg:w-[50%]"
                placeholder="Search the class"
                value={searchName}
                onChange={handleSearchChange}
              />
            </Form.Item>
          </Form>
          <div className="flex flex-col w-full p-2 rounded-md bg-blue-200">
              <Checkbox onChange={handleChangeCheckBox} >Select if you want to send notification SMS to parents</Checkbox>
              <p className="text-gray-600">Click finish button at the end of the attendance marking to check attendance data and to send sms notifications</p>
        </div>
        </div>
        
        <div className="w-full  h-full flex flex-col  items-center">
          {filteredClasses.length > 0 ? (
            <div className="w-[98%] grid grid-cols-1 lg:grid-cols-4">
              {filteredClasses.map((classItem) => (
                <Tag
                  key={classItem.classID}
                  onClick={() => handleClassClicked(classItem)} 
                  color="blue"
                  className={`p-2 my-2 shadow-md h-fit hover:bg-blue-400 hover:text-white`}
                >
                  <p className="text-[14px]">ClassName: {classItem?.ClassName}</p>
                  <div className="flex flex-row w-full justify-between">
                    <p className="mr-3">Subject: {classItem?.subjectName}</p>{" "}
                   
                    <p>Grade: {classItem?.gradeName}</p>{" "}
                    
                  </div>
                </Tag>
              ))}
            </div>
          ) : (
            <Empty description="No class Data" />
          )}
        </div>
      </div>:
      <AttendanceScanningPage smsNotificationStatus={smsNotificationStatus}  selectedClass={selectedClass} setSelectedClass={setSelectedClass}/>
    }
    </div>
  );
};

export default AttendanceMarkPage;
