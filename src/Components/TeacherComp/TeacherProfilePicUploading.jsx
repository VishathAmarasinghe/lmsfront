import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const ProfilePicUploading = ({ setProfilePicture, existingImageUrl }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async ({ fileList: newFileList }) => {
    console.log('New file listssss:', newFileList);
    setFileList(newFileList);
  
    if (newFileList.length > 0 ) {
      console.log('Processing file:', newFileList[newFileList.length - 1]);
      try {
        const base64String = await getBase64(newFileList[newFileList.length - 1].originFileObj);
        // console.log('Base64 image:', base64String);
        setProfilePicture(base64String);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }else{
        setProfilePicture(null);
        console.log("not triggered ");
    }
  };
  

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const convertImageToBase64 = async (file) => {
    try {
      const base64String = await getBase64(file.originFileObj);
      console.log("Base64 image:", base64String);
      setuploadingImage(base64String);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          accept="image/png, image/jpeg"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : existingImageUrl ? (
            <img src={existingImageUrl} alt="Profile" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

export default ProfilePicUploading;
