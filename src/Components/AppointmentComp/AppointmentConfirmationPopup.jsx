import React, { useState } from "react";
import { Button, Modal, Checkbox, message, notification } from "antd";
import { createAppointment } from "../../API";
import { useDispatch } from "react-redux";
import { change_page_number } from "../../Actions/PageNumbers";

const AppointmentConfirmationPopup = ({appointmentData, confirmationOpen, setConfirmationOpen }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loadingOn,setLoadingOn]=useState(false);
  const dispatch=useDispatch();

  const handleOk = async() => {
    if (!isChecked) {
      message.error("Please accept the terms and conditions.", 3);
      return;
    }else{
      setLoadingOn(true);
      const appointmentResult=await createAppointment(appointmentData);
      if (appointmentResult.status==200) {
        notification.success({
          message:"Appointment Submitted successfully!",
          description:"Teacher will review the appointment and send back the confirmation later."
        })
        dispatch(change_page_number("4"));

      }else{
        notification.error({
          message:"appointment submission Error!",
          description:"please try again later."
        })
      }
    }
    setLoadingOn(false);
    setConfirmationOpen(false);
  };

  const handleCancel = () => {
    setConfirmationOpen(false);
    setLoadingOn(false);
  };

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Modal
      title="Appointment Confirmation"
      width={"50%"}
      open={confirmationOpen} 
      maskClosable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" loading={loadingOn} className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleOk}>
          Confirm
        </Button>
      ]}
    >
      <div>
        <h1 className="text-[15px] font-medium underline">Guidelines</h1>
        <p>Teacher will review the appointment and confirm the appointment.</p>
        <p>Date and time will be fixed by the teacher according to his/her time schedule</p>
        <p>If teacher fixes the date you cannot change the date and time.</p>
        <p>Most probably the date and time will be before or after the corresponding student's class.</p>
        <div className="w-full bg-[#EBEEFF] my-2 p-2">
          <Checkbox checked={isChecked} onChange={handleChange}>
            I accept the terms and conditions
          </Checkbox>
        </div>
        {isChecked || <p style={{ color: 'red' }}>Please accept the terms and conditions.</p>}
      </div>
    </Modal>
  );
};

export default AppointmentConfirmationPopup;
