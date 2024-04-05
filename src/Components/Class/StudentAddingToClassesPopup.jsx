import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const StudentAddingToClassesPopup = ({
  modelOpen,
  setModelOpen,
  newSelectedClasses,
  selectedStudent,
}) => {
  const [loading, setLoading] = useState(false); 

  const handleCancel = () => {
    setModelOpen(false);
  };

  const handleSure = () => {
   
    setLoading(true);

    
    setTimeout(() => {
      // Reset loading state after the action is completed
      setLoading(false);

      // Close the modal
      setModelOpen(false);
    }, 2000); 
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
