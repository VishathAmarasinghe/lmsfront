import { FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tag, message } from "antd";
import React from "react";
import { deleteNotewithMaterial, getnotes } from "../../API";
import { useDispatch } from "react-redux";
import { getAllAccordianByClassID } from "../../Actions/class";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";

const NoteCard = ({ note, mainMaterial }) => {
  const date = new Date(mainMaterial.uploadDate);
  const dateString = date.toISOString().split("T")[0];
  const { classID } = useParams();

  const dispatch = useDispatch();
  const handleNoteDelete = async () => {
    const noteData = {
      noteID: note.noteID,
      materialID: note.materialID,
      fileLocation: note.noteLocation,
    };
    console.log("note data ", noteData);
    const deleteResult = await deleteNotewithMaterial(noteData);
    if (deleteResult.status == 200) {
      message.success("note Deleted");
    } else {
      message.error("cannot delete note");
    }
    dispatch(getAllAccordianByClassID(classID));
  };
  const handleClickedNote = async () => {
    const download = await getnotes(note.noteLocation);
    // console.log(download.data);
    if (download.status == 200) {
      fileDownload(download.data,note.noteName);
    // const blob = new Blob([download.data]);

    // //   // Create a temporary anchor element
    //   const a = document.createElement("a");
    //   a.href = window.URL.createObjectURL(blob);
    //   a.download = note.noteName;

    // //   // Trigger a click event to initiate the download
    //   a.click();

    // //   // Clean up
    //   window.URL.revokeObjectURL(a.href);
    }

    // const link = document.createElement('a');
    // link.href = `http://localhost:5020/${note.noteLocation}`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  return (
    <Tag
      
      className="w-full flex flex-row my-2 hover:bg-green-600 hover:text-white "
      color="green"
    >
      <div className=" p-2">
        <div onClick={handleClickedNote} className="bg-green-600 p-2  rounded-xl">
          <FileTextOutlined className="text-[25px] text-white" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between items-center ml-3 hover:text-white">
        <div onClick={handleClickedNote} className="flex flex-col">
          <h1 className="text-[20px] font-medium">{note.noteName}</h1>
          <div className="flex flex-row">
            <p className="text-[10px] mr-4">Upload Date: {dateString}</p>
            <p className="text-[10px]">
              Upload Time: {mainMaterial.uploadTime}
            </p>
          </div>
        </div>
        <div className="p-4 ">
          <button onClick={handleNoteDelete}>
            <DeleteOutlined className="hover:bg-white p-1 rounded-lg hover:text-black" />
          </button>
        </div>
      </div>
    </Tag>
  );
};

export default NoteCard;
