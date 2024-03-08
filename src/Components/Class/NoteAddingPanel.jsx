import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const fileList = [
  {
    uid: "0",
    name: "xxx.png",
    status: "uploading",
    percent: 33,
  },
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  
];

const NoteAddingPanel = ({ notemodelOpen, setnotemodelOpen }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setnotemodelOpen(false)
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setnotemodelOpen(false)
      };
  return (
    <Modal
      title="Upload Notes"
      centered
      open={notemodelOpen}
      onOk={() => setnotemodelOpen(false)}
      onCancel={() => setnotemodelOpen(false)}
      width={"50%"}
      maskClosable={false}
      footer={null}
    >
      <div>
        <Upload
        accept=""
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture"
          multiple={true}
          defaultFileList={[...fileList]}
          className="upload-list-inline"
          
    >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
      <div style={{ textAlign: 'right',marginTop:"20px" }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button className='bg-blue-600 ml-3' onClick={handleOk} loading={confirmLoading}>
            Save
          </Button>
        </div>
    </Modal>
  );
};

export default NoteAddingPanel;



      
        
     