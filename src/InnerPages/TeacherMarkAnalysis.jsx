import { Col, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getChartData, getResultHeadingForClass } from "../API";
import { useParams } from "react-router-dom";
import BarchartComp from "../Components/Charts/BarchartComp";
import LineChartComp from "../Components/Charts/LineChart";

const TeacherMarkAnalysis = () => {
  const [loading,setLoading]=useState(false);
  const {classID}=useParams();
  const [optionArray,setOptionArray]=useState([]);
  const [chartLoading,setChartLoading]=useState(false);
  const [chartData,setChartData]=useState([]);


  const handleSelectionChange=async(value)=>{
    console.log("selected values ",value,"  ",value.length);
    if (value?.length!=0) {

      const chartResult=await getChartData(value);
      console.log("chartResult ",chartResult);
      setChartData(chartResult.data);
    }
    
  }

  useEffect(()=>{
    fetchClassResults();
  },[])


  const fetchClassResults=async()=>{
    try {
      setLoading(true);
      const classResultinfo=await getResultHeadingForClass(classID);
      console.log("class reuslt info ",classResultinfo);
      const editedClassResult=classResultinfo?.data?.map((result)=>({
        label:result.resultID+"  "+result.resultTitle,
        value:result.resultID
      }))
      setOptionArray(editedClassResult);
      
      setLoading(false);
    } catch (error) {
      message.error("class results fetching error!")
      console.log(error);
    }
  }



  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Result Analysis
        </h1>
      </div>

      <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className=" w-[95%]  overflow-x-hidden mt-4 mb-2">
          <Form className="font-medium" layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Select Result Tags"
                  rules={[
                    {
                      required: true,
                      message: "Please select Result Tag",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    // value={optionArray}
                    onChange={handleSelectionChange}
                    options={optionArray}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className=" overflow-y-auto  h-[90%] flex flex-row   w-[95%]">
          <div className="w-[50%] h-full">
            <BarchartComp chartData={chartData}/>
          </div>
          <div className="w-[50%] h-full">
            <LineChartComp chartData={chartData}/>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TeacherMarkAnalysis;
