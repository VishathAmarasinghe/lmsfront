import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { jsPDF } from "jspdf";
import { htmlToImagetranslator } from "../../Utils/htmlCanvasToImage";
import { studentCardStatus } from "../../API";

const StudentCardSheetCreationModel = ({
  studentCardSheedModelOpen,
  setStudentCardSheetModelOpen,
  selectedCardContent,
  fetchPendingStudentCards,
  selectedRowKeys
}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (studentCardSheedModelOpen) {
      generatePages();
    }
  }, [studentCardSheedModelOpen, selectedCardContent]);

  const generatePages = () => {
    const cardsPerPage = 12; 
    const totalCards = selectedCardContent.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const newPages = [];
    for (let i = 0; i < totalPages; i++) {
      newPages.push(selectedCardContent.slice(i * cardsPerPage, (i + 1) * cardsPerPage));
    }
    console.log("new pages  ",newPages);
    setPages(newPages);
  };

  const handleOk = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < pages.length; i++) {
      const billImage = await htmlToImagetranslator(document.getElementById(`canvasImage${i}`));
      if (i > 0) {
        doc.addPage();
      }
      doc.addImage(billImage, "png", 0, 0, 297, 210); 
    }

    doc.save("StudentCards.pdf");
    changeAllUsersStatus();

    setStudentCardSheetModelOpen(false);
    fetchPendingStudentCards();
  };


  const changeAllUsersStatus=async()=>{
    try {
      
      const studentCardStatusChangeResult=await studentCardStatus(selectedRowKeys?.join(","));
      if (studentCardStatusChangeResult.status==200) {
        message.success("Selected Student Card Status changed To manufacturing")
      }
    } catch (error) {
      console.log("error ",error);
      message.error("Selected Users card status changing failed!")

    }
    fetchPendingStudentCards();
  }

  const handleCancel = () => {
    setStudentCardSheetModelOpen(false);
  };

  return (
    <Modal
      width={"350mm"}
      centered
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
          Download PDF
        </Button>,
        <Button
        key="ok"
        onClick={handleOk}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Email To Print Shop
      </Button>
      ]}
    >
      <div className="w-full flex flex-col  items-center" style={{ overflow: "auto", maxHeight: "80vh" }}>
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            id={`canvasImage${pageIndex}`}
            style={{ width: "297mm", height: "210mm", marginBottom: "20px" }}
            className="bg-white   flex flex-col justify-center items-center mb-4"
          >
            <div
              className="bg-white border-2 border-gray-200 grid grid-cols-3 grid-rows-3 rounded-lg shadow-lg"
              style={{ width: "297mm", height: "210mm" }}
            >
              {page.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className=""
                  style={{ width: "8.5cm", height: "5.5cm" }}
                >
                  <img
                    src={`http://localhost:5000/${card?.studentcard}`}
                    alt="img"
                    className=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default StudentCardSheetCreationModel;
