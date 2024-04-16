import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Upload } from 'antd';

const BulkResultAddingPanel = ({fileList, setFileList}) => {
 

  const handleFileChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    console.log("file list ", fileList);
  }, [fileList]);

  return (
    <>
      <Form  layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Upload your file here."
              rules={[
                {
                  required: true,
                  message: "Please add your file here",
                },
              ]}
            >
              <Upload
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                listType="picture"
                fileList={fileList}
                onChange={handleFileChange}
                onRemove={(file) => {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  setFileList(newFileList);
                }}
              >
                {fileList.length === 0 ? (
                  <Button icon={<UploadOutlined />}>Upload</Button>
                ) : (
                  <p className='text-slate-400'>You uploaded one file. Remove that file to upload a new file</p>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BulkResultAddingPanel;
