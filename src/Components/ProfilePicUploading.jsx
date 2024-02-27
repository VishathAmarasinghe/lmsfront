import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
const fileList = [
  
];

const ProfilePicUploading = () => {
  return (
    <div className="" >
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        defaultFileList={[...fileList]}
      >
        <Button icon={<UploadOutlined />}>Upload Student Photo</Button>
      </Upload>
    </div>
  );
};

export default ProfilePicUploading;
