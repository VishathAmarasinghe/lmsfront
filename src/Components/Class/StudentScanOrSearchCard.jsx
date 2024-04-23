import React, { useEffect, useState, forwardRef } from "react";
import { Form, Select, notification } from "antd";
import { getActivatedStudents } from "../../API";
import { scanImage } from "../../assets";
import StudentMiniProfile from "./StudentMiniProfile";
import useScanDetection from 'use-scan-detection-react18';
import { validateBarcode } from "../../Utils/Validations";

const StudentScanOrSearchCard = forwardRef(({ selectedStudent, setSelectedStudent }, ref) => {
  const [optionStudentArray, setOptionStudentArray] = useState([]);
  const [barcode, setBarcode] = useState('');

  useScanDetection({
    onComplete: setBarcode,
  });

  useEffect(() => {
    if (validateBarcode(barcode) && barcode!="" && barcode!=null) {
      console.log("came hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      fetchingScannedStudent();
    } else {
      if (barcode.length !== 0) {
        notification.error({
          message: "Invalid Barcode",
          description: "Please check the card and rescan the card"
        });
      }
    }
  }, [barcode]);

  useEffect(() => {
    arrangeStudentsToSearch();
  }, []);

  const fetchingScannedStudent = () => {
    const extractedUserIDValue = "US" + parseInt(barcode.substring(0, 5));
    const extractStudentIDValue = "ST" + parseInt(barcode.substring(5));
    const extactedValue = `${extractedUserIDValue} ${extractStudentIDValue}`;
    const selected = optionStudentArray.find((student) => student.value === extactedValue);
    if (!selected) {
      notification.warning({
        message: "No existing student",
        description: "Please check the card and rescan the card"
      });
    }
    setSelectedStudent(selected);
    // setBarcode("");
  };

  const arrangeStudentsToSearch = async () => {
    try {
      const studentResult = await getActivatedStudents();
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
    const selected = optionStudentArray.find((student) => student.value === value);
    setSelectedStudent(selected);
  };

  return (
    <div ref={ref} className="m-2 h-[90%] mt-3">
      <Form>
        <Form.Item className="font-medium text-[17px]" label="Select Student">
          <Select
            showSearch
            onChange={handleSelectedValue}
            placeholder="Search by name, phone number, NIC, student ID, or user ID"
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={filterStudents}
            options={optionStudentArray}
          />
        </Form.Item>
      </Form>
      <div className="h-[90%]">
        {!selectedStudent ? (
          <div className="flex flex-col items-center justify-center h-[90%]">
            <img className="w-[40%]" src={scanImage} alt="Scan Image" />
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
});

export default StudentScanOrSearchCard;
