import { EditOutlined, FileZipOutlined } from "@ant-design/icons";
import { DeleteOutline } from "@mui/icons-material";
import { Popconfirm, Tag, message } from "antd";
import React, { useState } from "react";
import { deleteSubmissionPanel } from "../../API";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAccordianByClassID } from "../../Actions/class";
import SubmissionModel from "./SubmissionModel";

const SubmissionPanalCard = ({ submission, mainMaterial }) => {
  const date = new Date(mainMaterial.uploadDate);
  const dispatch=useDispatch();
  const {classID}=useParams();
  const dateString = date.toISOString().split("T")[0];
  const [deleteConfirmation,setDeleteConfirmation]=useState(false);
  const [deleteLoading,setDeleteLoading]=useState(false);
  const [submissionModelOpen,setSubmissionModelOpen]=useState(false);

  const closeDate = new Date(submission.subCloseDate);
  const closeDateString = closeDate.toISOString().split("T")[0];


  const handlepopConfirmClose=()=>{
    setDeleteLoading(false);
    setDeleteConfirmation(false);
  }

  const handleDeletesubmission=async()=>{
    setDeleteLoading(true);
    const panelData={
        panelID:submission.panelID,
        materialID:submission.materialID
    }
    console.log("pandel data ",panelData);
    const deleteResult=await deleteSubmissionPanel(panelData);
    if (deleteResult.status==200) {
        message.success("submission panel deleted successfully");
    }else{
        message.error("error deleting submission Panel");
    }

    dispatch(getAllAccordianByClassID(classID));
    handlepopConfirmClose();
}

    const handleSubmissionModelOpen=()=>{
        setSubmissionModelOpen(true);
    }

  return (
    <>
    <SubmissionModel submission={submission} mainMaterial={mainMaterial} submissionModelOpen={submissionModelOpen} setSubmissionModelOpen={setSubmissionModelOpen} />
    <Tag
   
      className="w-full flex flex-row my-2 hover:bg-yellow-600 hover:text-white "
      color="yellow"
    >
        
      <div className=" p-2">
        <div className="bg-yellow-600 p-2  rounded-xl">
          <FileZipOutlined className="text-[25px] text-white" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full ml-3 hover:text-white">
        <div  onClick={handleSubmissionModelOpen} className="flex flex-col">
          <h1 className="text-[20px] font-medium">{submission.subPanelName}</h1>
          <div className="flex flex-row">
            <p className="text-[10px] mr-4">Upload Date: {dateString}</p>
            <p className="text-[10px]">
              Upload Time: {mainMaterial.uploadTime}
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="text-[10px] mr-4">Due Date: {closeDateString}</p>
            <p className="text-[10px]">Due Time: {submission.subCloseTime}</p>
          </div>
          <div className="flex flex-col pr-4">
            <Popconfirm
            placement="topRight"
            title="Delete"
            description="Are you sure you want to delete panel"
            open={deleteConfirmation}
            onConfirm={handleDeletesubmission}
            okButtonProps={{
              loading: deleteLoading,
              className:"bg-blue-500 hover:bg-blue-600"
            }}
            onCancel={()=>handlepopConfirmClose()}
            
            >
            <button onClick={()=>setDeleteConfirmation(true)}>
              <DeleteOutline className="hover:bg-white p-1 rounded-lg hover:text-black" />
            </button>
            </Popconfirm>
            <button>
              <EditOutlined className="hover:bg-white p-1 rounded-lg hover:text-black" />
            </button>
          </div>
        </div>
      </div>
    </Tag>
    </>
  );
};

export default SubmissionPanalCard;
