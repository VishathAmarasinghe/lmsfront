import React, { useState } from "react";
import { Button, Modal } from "antd";
import { jsPDF } from "jspdf";
import { htmlToImagetranslator } from "../../Utils/htmlCanvasToImage";

const StudentCardSheedCreationModel = ({
  studentCardSheedModelOpen,
  setStudentCardSheetModelOpen,
  selectedCardContent,
}) => {
  const showModal = () => {
    setStudentCardSheetModelOpen(true);
  };

  const handleOk = async () => {
    const billImage = await htmlToImagetranslator(document.getElementById('canvesImage'));
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm", // Set unit to millimeters
      format: "a4" // Set format to A4
    });

    doc.addImage(billImage, "png", 1, 1, 210, 297); // Set image size to A4
    doc.save("StudentCards.pdf");

    setStudentCardSheetModelOpen(false);
  };

  const handleCancel = () => {
    setStudentCardSheetModelOpen(false);
  };

  return (
    <Modal
      width={"80%"}
      title="Paper Format"
      open={studentCardSheedModelOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" type="default" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          onClick={handleOk}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          OK
        </Button>,
      ]}
    >
      <div
        className="w-full border-2 border-red-600"
        style={{ overflow: "auto" }}
      >
        <div className="bg-white p-4 mx-auto max-w-md flex flex-col justify-center items-center">
          <div
            id="canvesImage"
            className="bg-white border  grid grid-cols-3 grid-rows-3    border-gray-400 rounded-lg shadow-lg "
            style={{ width: "297mm", height: "210mm" }}
          >
            {selectedCardContent?.map((card) => (
              <img
                src={`http://localhost:5000/${card?.studentcard}`}
                alt="img"
                style={{ width: "8.5cm", height: "5.5cm" }}
                className="border-2 border-green-600"
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentCardSheedCreationModel;
