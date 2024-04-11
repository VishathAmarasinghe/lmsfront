import { Form, Select, message, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection-react18";
import { validateBarcode } from "../../Utils/Validations";
import { getActivatedStudents } from "../../API";

const AttendanceScanningPage = ({ setSelectedClass }) => {
  const [optionStudentArray, setOptionStudentArray] = useState([]);
  const [barcode, setBarcode] = useState("");

  useScanDetection({
    onComplete: setBarcode,
  });

  useEffect(() => {
    console.log("bar code", barcode);
    if (validateBarcode(barcode)) {
      fetchingScannedStudent();
    } else {
      if (barcode.length != 0) {
        notification.error({
          message: "Invalid Barcode",
          description: `Please check the card and rescan the card`,
        });
      }
    }
  }, [barcode]);

  useEffect(() => {
    arrangeStudentsToSearch();
  }, []);

  const filterStudents = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  const onSearch = (input) => {
    console.log("search:", input);
  };

  const handleSelectedValue = (value) => {
    console.log("selected value:", value);

    const selected = optionStudentArray.find(
      (student) => student.value === value
    );
    setSelectedStudent(selected);
  };

  const fetchingScannedStudent = () => {
    const extractedUserIDValue = "US" + parseInt(barcode.substring(0, 5));
    const extractStudentIDValue = "ST" + parseInt(barcode.substring(5));
    const extactedValue = `${extractedUserIDValue} ${extractStudentIDValue}`;
    console.log(
      "ectracted UserID and studentID ",
      extractedUserIDValue,
      "  ",
      extractStudentIDValue
    );
    const selected = optionStudentArray.find(
      (student) => student.value === extactedValue
    );
    console.log("selected values ", selected);
    if (selected === undefined) {
      notification.warning({
        message: "No existing student",
        description: `Please check the card and rescan the card`,
      });
    }
    setSelectedStudent(selected);
  };

  const arrangeStudentsToSearch = async () => {
    try {
      const studentResult = await getActivatedStudents();
      console.log(studentResult.data);
      setOptionStudentArray(
        studentResult.data.map((student) => ({
          value: `${student.UserID} ${student.studentID}`,
          label: `${student.UserID}   ${student.firstName}   ${student.lastName}  ${student.phoneNo}  ${student.studentID}  ${student.NIC}`,
          data: student,
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleBackButton = () => {
    setSelectedClass(null);
  };
  return (
    <div className="w-[95%] bg-white h-[90%] border-2 border-red-600 flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className="border-2 border-green-500 w-[95%]">
        <div className="border-2 border-blue-500 w-full ">
          <Form>
            <FormItem
              className="font-medium text-[17px]"
              label="Select Student"
            >
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
        </div>
        <div className="border-2 border-pink-500 w-full "></div>
        <div className="border-2 border-black w-full flex flex-col justify-center items-center lg:items-end ">
          <div className="border-2 border-yellow-400 w-full lg:w-[40%] flex flex-col lg:flex-row justify-between">
            <button
              onClick={handleBackButton}
              className="border-2 border-slate-400 p-1 w-[90%] text-[15px] font-medium rounded-md hover:bg-slate-400 hover:text-white lg:w-[45%]"
            >
              Back
            </button>
            <button className="border-2 border-green-600 text-white text-[15px] font-medium bg-green-600 rounded-md p-1 w-[90%] lg:w-[45%]">
              finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceScanningPage;
