import { FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, message } from "antd";
import React from "react";
import { deleteNotewithMaterial, getnotes } from "../../API";
import { useDispatch } from "react-redux";
import { getAllAccordianByClassID } from "../../Actions/class";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";

const SubmissionPanelUploadingCard = ({ note,previousUploadedFiles, setPreviousUploadedFiles, setDeleteActionedFiles,deleteActionedFiles }) => {
  const user=JSON.parse(localStorage.getItem("profile")).result;

  const { classID } = useParams();

  const dispatch = useDispatch();

  const handleDeleteOnClick=()=>{
    setDeleteActionedFiles([...deleteActionedFiles,note.noteID])
    const newPreviousUploadedFiles=previousUploadedFiles?.filter((file)=>file.noteID!=note.noteID);
    console.log('====================================');
    console.log("ew previous uploaded files ",newPreviousUploadedFiles);
    setPreviousUploadedFiles(newPreviousUploadedFiles);
    console.log('====================================');
  }

  const handleDownloadFile=async()=>{

  }
  
  return (
    <Tag
      
      className="w-full flex flex-row my-2 hover:bg-green-600 hover:text-white "
      color="green"
    >
      <div className=" p-2">
        <div  className="bg-green-600 p-2  rounded-xl">
          <FileTextOutlined className="text-[25px] text-white" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between items-center ml-3 hover:text-white">
        <div  className="flex flex-col">
          <h1 className="text-[20px] font-medium">{note.noteName}</h1>
        </div>
        {
          user?.role=="teacher"?<div className="p-4 ">
            <Popconfirm
            title="Delete the Material"
            description="Are you sure to delete this materialS?"
            onConfirm={handleDeleteOnClick}
            okButtonProps={{ className: "bg-red-500 hover:bg-red-600 text-white" }}
            okText="Yes"
            cancelText="No"
            placement="leftTop"
          >
          <button>
            <DeleteOutlined className="hover:bg-white p-1 rounded-lg hover:text-black" />
          </button>
          </Popconfirm>
        </div>:<></>
        }
        
      </div>
    </Tag>
  );
};

export default SubmissionPanelUploadingCard;
