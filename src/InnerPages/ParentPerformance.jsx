import { Col, ConfigProvider, Form, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllchildsOfParent, getResultForSpecificStudent, getSpecificClass } from '../API';
import ParentMarksCard from '../Components/ParentProfile/ParentMarksCard';
import dayjs from 'dayjs';
import LoadingInnerPage from '../InnerPages/LoadingInnerPage';
import ParentMarksTable from '../Components/ParentProfile/ParentMarksTable';

const ParentPerformance = () => {
  const parentID=JSON.parse(localStorage.getItem("profile")).result.UserID;
  const [studentArray,setStudentArray]=useState([]);
  const [loading,setLoading]=useState(true);
  const [resultArray,setResultArray]=useState([]);
  const [selectedStudent,setSelectedStudent]=useState(null);

  useEffect(()=>{
    fetchChildren();
  },[])


  useEffect(()=>{
    if (selectedStudent!=null) {
      fetchStudentResults();
    }
  },[selectedStudent])

  
  const fetchChildren = async () => {
    const childResult = await getAllchildsOfParent(parentID);
    console.log("child Result ", childResult.data);
    const valueArray = childResult?.data.map((student) => ({
      label: student?.firstName + " " + student?.lastName,
      value: student?.UserID
    }));

    console.log("re created studentsx ",valueArray);
    setStudentArray(valueArray);
    if (valueArray.length>0) {
      setSelectedStudent(valueArray[0]?.value);
    }
  };


  const fetchStudentResults=async()=>{
    try {
      setLoading(true);
      const studentResults=await getResultForSpecificStudent(selectedStudent);
      for(const studentres of studentResults?.data){
        console.log("classID is ",studentres.classID);
        const classResult=await getSpecificClass(studentres.classID);
        console.log("comming class Result ",classResult?.data[0]);
        studentres.classData=classResult?.data[0]
      }
      const resultArray=studentResults?.data?.map((result)=>({
        ...result,
        publishDate:dayjs(result.publishDate).format('YYYY.MM.DD'),
        className:result?.classData?.ClassName,
        subject:result?.classData?.subjectName,
        grade:result?.classData?.gradeName,
  
      }))
      console.log("result array is ",resultArray);
      setResultArray(resultArray);
      setLoading(false);
    } catch (error) {
      message.error("Result fetched Error!")
      console.log("error",error);
    }
   
    // console.log("studentResult ",studentResults);
  }


  const handleStudentSelectionChange=(studentID)=>{
    console.log("selected student is ",studentID);
    setSelectedStudent(studentID);
  }



  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Student Performance
      </h1>
    </div>

    <div data-aos="fade-right" className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className=" w-full mt-4 mb-2 ">
      <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: "#EBEEFF",
                },
              },
            }}
          >
            <Form
              layout="vertical"
              className=" font-medium ml-6 w-[90%] h-[85%] p-2 overflow-y-hidden overflow-x-hidden"
              hideRequiredMark
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="student"
                    label="Select Student"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Student ",
                      },
                    ]}
                  >
                    <Select
                   defaultValue={selectedStudent!=null? selectedStudent : "First Student Selected"}
                    onChange={handleStudentSelectionChange}
                      placeholder="Please select a Student"
                      options={studentArray}
                      dropdownStyle={{ backgroundColor: "#EBEEFF" }}
                    />
                  </Form.Item>
                </Col>
               
              </Row>  
            </Form>
          </ConfigProvider>
       
      </div>
      <div className=" overflow-y-auto h-[90%] w-[95%]">
        <div className='w-full  flex flex-col lg:flex-row justify-between items-center mb-4  '>
          <ParentMarksCard TitleText="Latest Result" value={resultArray[0]?.mark}/>
          <ParentMarksCard TitleText="Class Rank" value={resultArray[0]?.classPlace} studentCount={resultArray[0]?.classCount}/>
          <ParentMarksCard TitleText="Highest Mark" value={resultArray[0]?.maxMark}/>
        </div>
        <div className='w-full  mt-5'>
            {
              loading?<LoadingInnerPage/>:<ParentMarksTable studentResult={resultArray}/>
            }
        </div>
       
      </div>
    </div>
  </div>
  )
}

export default ParentPerformance