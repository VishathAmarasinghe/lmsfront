import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Tag, Upload, message } from 'antd';
import { useSelector } from 'react-redux';
import { getStudentResultAddingSheetAsExcel } from '../../API';

const BulkResultAddingPanel = ({fileList, setFileList}) => {

  const [studentList,setStudentList]=useState([]);

    const classInside = useSelector((state) => state.classes.selectedClass);

    useEffect(()=>{
      if (classInside!=null) {
        const studentIDList=classInside?.students?.map((stu)=>stu?.studentID);
        console.log("class inside ",classInside);
        console.log("class studnt id list ",studentIDList);
        setStudentList(studentIDList);
      }
    },[classInside])
    
 

  const handleFileChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    console.log("file list ", fileList);
  }, [fileList]);


  const handleDownloadStudentSheet = async () => {
    try {
      if (studentList.length==0) {
        return message.warning("No students in the class!")
      }
      const studentSheetResult = await getStudentResultAddingSheetAsExcel(studentList);
      console.log("studenr sheet result ", studentSheetResult);

      const blob = new Blob([studentSheetResult.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      
      const url = window.URL.createObjectURL(blob);

      
      const link = document.createElement("a");
      link.href = url;
      link.download = "studentsResultSheet.xlsx";

    
      document.body.appendChild(link);
      link.click();

     
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("student sheet downloading error", error);
      message.error("student sheet downloading error!");
    }
  };


  return (
    <>
     <Tag onClick={handleDownloadStudentSheet} className='bg-green-500 my-2 hover:bg-green-600 text-white'>
            Download Student Bulk Result Adding Sheet
      </Tag>
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
