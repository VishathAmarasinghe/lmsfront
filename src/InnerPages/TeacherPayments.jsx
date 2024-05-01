import { Col, DatePicker, Form, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import OwnerTeacherPaymentOverallDescription from "../Components/Owner/OwnerTeacherPaymentOverallDescription";
import { getTeacherPaymentReport, getTotalFeePaymentStatistics, getTotalFeePaymentStatisticsByTeacher } from "../API";
import OverallPaymentPieChart from "../Components/Charts/OverallPaymentPieChart";
import LoadingInnerPage from "./LoadingInnerPage";
import TeacherPaymentModel from "../Components/Owner/TeacherPaymentModel";


const TeacherPayments = () => {
  const [statData, setStatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teacherPaymentData,setTeacherPaymentData]=useState([]);
  const [teacherModelOpen,setTeacherModelOpen]=useState(false);                              

  const dateChanger = (date, dateString) => {
    console.log("data string ", dateString);
  };

  useEffect(() => {
    fetchTotalPaymentData();
    fetchTotalPaymentDataForAllTeachers();
  }, []);


  useEffect(()=>{
    if (teacherPaymentData!=null) {
        fetchReport();
    }
   
  },[teacherPaymentData])


  const handleModelOpen=()=>{
    setTeacherModelOpen(true);
  }


  const fetchTotalPaymentData = async () => {
    try {
      setLoading(true);
      const result = await getTotalFeePaymentStatistics(3, 2024);
      console.log("result od payment stat is ", result);
      setStatData(result.data);
      setLoading(false);
    } catch (error) {
      console.log("error fetching totalPayment statistics", error);
      message.error("class Fees statistics getting error!");
    }
  };



  const fetchReport = async () => {
    try {
      const result = await getTeacherPaymentReport(teacherPaymentData);
      console.log("result od payment stat is ", result);
  
      const blob = new Blob([result.data], { type: 'application/pdf' }); 
  
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'payment_report.pdf');
  
      document.body.appendChild(link);
      link.click();
  
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.log("error fetching totalPayment statistics", error);
      message.error("class Fees statistics getting error!");
    }
  };
  

  


  const fetchTotalPaymentDataForAllTeachers = async () => {
    try {
      setLoading(true);
      const result = await getTotalFeePaymentStatisticsByTeacher(3, 2024);
      console.log("result teacher payment stat is ", result);
      setTeacherPaymentData(result.data);
      
      setLoading(false);
    } catch (error) {
      console.log("error fetching teacher payment statistics", error);
      message.error("class Fees statistics getting error!");
    }
  };






  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
        <TeacherPaymentModel teacherPaymentData={teacherPaymentData} setTeacherModelOpen={setTeacherModelOpen} teacherModelOpen={teacherModelOpen}/>
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Teacher Payments
        </h1>
      </div>

      <div
        data-aos="fade-right"
        className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300"
      >
        {loading ? (
          <LoadingInnerPage />
        ) : (
          <div className="w-[95%] mt-4 overflow-y-hidden  ">
            <div className="w-full flex flex-row border-2 border-red-600 items-center justify-between">
              <Form layout="vertical" hideRequiredMark>
                <Form.Item label="Select Month to check Teachers Payments">
                  <DatePicker onChange={dateChanger} picker="month" />
                </Form.Item>
              </Form>
              <div>
                <button onClick={()=>handleModelOpen()} className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded-md">
                    Teacher Payments
                </button>
              </div>
            </div>
            <div className="w-full h-[85%] overflow-x-hidden border-2 border-green-600 flex flex-row">
              <div className="flex flex-col w-[40%]">
                <OwnerTeacherPaymentOverallDescription statData={statData} />
              </div>
              <div className="w-[60%] h-[95%] border-2 border-red-500 flex flex-col">
                <div className="w-full h-[50%] ">
                  <OverallPaymentPieChart
                    key={1}
                    chartData={statData?.overallStat}
                  />
                </div>
                <div className="w-full h-[50%] flex flex-row m-2">
                  <div className="w-[50%] h-full ">
                    <OverallPaymentPieChart
                      key={2}
                      chartData={statData?.instituteStat}
                    />
                  </div>
                  <div className="w-[50%] h-full ">
                    <OverallPaymentPieChart
                      key={3}
                      chartData={statData?.teacherStat}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPayments;
