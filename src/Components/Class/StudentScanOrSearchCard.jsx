import React, { useEffect, useState, useRef } from "react";
import { Form, Select, message,notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import { getActivatedStudents } from "../../API";
import { MehOutlined } from "@ant-design/icons";
import { scanImage } from "../../assets";
import StudentMiniProfile from "./StudentMiniProfile";
import useScanDetection from 'use-scan-detection-react18';
import { validateBarcode } from "../../Utils/Validations";

const StudentScanOrSearchCard = ({ selectedStudent, setSelectedStudent }) => {
  const [optionStudentArray, setOptionStudentArray] = useState([]);
  const [barcode, setBarcode] = useState('');

  useScanDetection({
    onComplete: setBarcode,
   
  });
  


useEffect(() => {
  console.log("bar code",barcode);
  if (validateBarcode(barcode)) {
    fetchingScannedStudent();
  }else{
    if (barcode.length!=0) {
      notification.error(
        {
          message:"Invalid Barcode",
          description:`Please check the card and rescan the card`
        }
      )
    }
    
  }
},[barcode])


const fetchingScannedStudent = ()=>{
  
  
 
  const extractedUserIDValue = "US"+ parseInt(barcode.substring(0, 5));
  const extractStudentIDValue = "ST"+parseInt(barcode.substring(5));
  const extactedValue=`${extractedUserIDValue} ${extractStudentIDValue}`
  console.log("ectracted UserID and studentID ",extractedUserIDValue,"  ",extractStudentIDValue);
  const selected = optionStudentArray.find((student) => student.value === extactedValue);
  console.log("selected values ",selected);
  if (selected===undefined) {
    notification.warning( {
      message:"No existing student",
      description:`Please check the card and rescan the card`
    })
  }
  setSelectedStudent(selected);
}


  useEffect(() => {
    arrangeStudentsToSearch();
   
  }, []);

  

  const arrangeStudentsToSearch = async () => {
    try {
      const studentResult = await getActivatedStudents();
      console.log(studentResult.data);
      setOptionStudentArray(
        studentResult.data.map((student) => ({
          value: `${student.UserID} ${student.studentID}`,
          label: `${student.UserID}   ${student.firstName}   ${student.lastName}  ${student.phoneNo}  ${student.studentID}  ${student.NIC}`,
          data: student
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const onSearch = (input) => {
    console.log("search:", input);
  };

  const filterStudents = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  const handleSelectedValue = (value) => {
    console.log("selected value:", value);

    const selected = optionStudentArray.find((student) => student.value === value);
    setSelectedStudent(selected);
  };

  return (
    <div className=" m-2 h-[90%] mt-3">
      <Form>
        <FormItem className="font-medium text-[17px]" label="Select Student">
          <Select
          className=""
            showSearch
            onChange={handleSelectedValue}
            placeholder="Search by name, phone number, NIC, student ID, or user ID"
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={filterStudents}
            options={optionStudentArray}
          />
        </FormItem>
      </Form>
      <div className=" h-[90%] ">
        {selectedStudent == null ? (
          <div className="flex flex-col items-center justify-center h-[90%]">
            
            <img
              className="w-[40%] border-2 border-green-600"
              src={scanImage}
            />
            <span className="text-slate-400">
              Scan the card to get student details
            </span>
          </div>
        ) : (
          <div>
            <StudentMiniProfile selectedStudent={selectedStudent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScanOrSearchCard;
