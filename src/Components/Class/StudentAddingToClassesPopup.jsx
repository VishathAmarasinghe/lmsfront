import React, { useState } from "react";
import { Button, Modal, Space, notification,message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { addStudentsToClass } from "../../API";
import { useDispatch } from "react-redux";
import { getClassesforSpecificStudent, getNotAvailableClassesforSpecificStudent } from "../../Actions/class";

const StudentAddingToClassesPopup = ({
  modelOpen,
  setModelOpen,
  newSelectedClasses,
  selectedStudent,
}) => {
  const [loading, setLoading] = useState(false); 
  const dispatch=useDispatch();

  const handleCancel = () => {
    setModelOpen(false);
  };

  const handleSure = async() => {
   
    
    try {
      setLoading(true);
      const StudentAddingData={
        studentID:selectedStudent?.data?.UserID,
        classes:newSelectedClasses
      }
  
      const addingResult=await addStudentsToClass(StudentAddingData);
      console.log(addingResult.data);
      if (addingResult.status==200) {
        notification.success({
          message: "Student Added to Classes successfully",
          description: "Now students can Access the classes via LMS",
        })
      };
    } catch (error) {
      console.log("error in adding students");
      notification.error({
        message: "Error in adding students",
        description: "Please try again later",
      })
    }

    dispatch(getClassesforSpecificStudent(selectedStudent?.data?.UserID,message))
    dispatch(getNotAvailableClassesforSpecificStudent(selectedStudent?.data?.UserID,message))
    setLoading(false);
    handleCancel();
  };

  return (
    <Modal
      title={
        <div>
          <ExclamationCircleOutlined
            style={{ color: "red", marginRight: "8px" }}
          />
          Confirmation
        </div>
      }
      open={modelOpen} 
      footer={
        <div>
          <Button
            type="primary"
            onClick={handleSure}
            className="mr-2 bg-blue-500 hover:bg-blue-600"
            loading={loading} 
          >
            {loading ? "Adding Student" : "Sure"} 
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      }
      onCancel={handleCancel}
    >
      <p>Are you sure you want to add this student to above selected classes?</p>
    </Modal>
  );
};

export default StudentAddingToClassesPopup;
