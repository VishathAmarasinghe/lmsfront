import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const SubmissionsUploadingcard = ({setUploadedFiles}) => {
    const props = {
        name: 'file',
        multiple: true,
      //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            message.loading("Working on the file")
          }
          
          setUploadedFiles(info.fileList.map(file=>file.originFileObj));
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
  return (
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
     If you have many files it's better to upload it as a zip
    </p>
  </Dragger>
  )
}

export default SubmissionsUploadingcard