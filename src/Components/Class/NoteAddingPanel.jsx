import React, { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadNotes } from "../../API";
import { useDispatch } from "react-redux";
import { getAllAccordianByClassID } from "../../Actions/class";
import { useParams } from "react-router-dom";

const NoteAddingPanel = ({ accID,notemodelOpen, setnotemodelOpen }) => {
  const [fileList, setFileList] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {classID}=useParams();
  const dispatch=useDispatch();

  const handleOk =async () => {
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("accordianID", accID);
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    const uploadResult=await uploadNotes(formData);
    if (uploadResult.status==200) {
      message.success("Files uploaded successfully!");
    }else{
      message.error("uploading Error!")
    }
    console.log("classID ",classID);
    dispatch(getAllAccordianByClassID(classID))

    console.log("upload result",uploadResult);
    setTimeout(() => {

      console.log("Uploaded files:", fileList);
      console.log("file list");
    
      setConfirmLoading(false);
      setnotemodelOpen(false);
      setFileList([]); 
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setnotemodelOpen(false);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Upload Notes"
      centered
      visible={notemodelOpen}
      onCancel={handleCancel}
      width={"50%"}
      maskClosable={false}
      footer={null}
    >
      <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        fileList={fileList}
        multiple
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={handleOk}
          loading={confirmLoading}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NoteAddingPanel;
