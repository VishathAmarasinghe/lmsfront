import { FileOutlined } from '@ant-design/icons'
import { DatePicker, Form, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ProgressReportModel from '../Components/Owner/ProgressReportModel';
import ReportCard from '../Components/Owner/ReportCard';
import dayjs from 'dayjs';
import { getProgressReport, getProgressReportDownload, getTeacherPaymentReport, getTotalFeePaymentStatistics, getTotalFeePaymentStatisticsByTeacher } from '../API';
import InnerPageLoader from '../Pages/CommonPages/InnerPageLoader';
import LoadingInnerPage from './LoadingInnerPage';

const OwnerReportShowingPage = () => {
    const [selectedReportDate,setSelectedReportDate]=useState(dayjs().format("YYYY-MM"));
    const [progressReport,setProgressReport]=useState(null);
    const [progressReportData,setProgressReportData]=useState(null);
    const [classStatDetails,setClassStatDetails]=useState(null);
    const [progressReportPDF,setProgressReportPDF]=useState(null);
    const [teacherPaymentData,setTeacherPaymentData]=useState([]);
    const [teacherPaymentReportPDF,setTeacherPaymentReportPDF]=useState(null);
    const [loading,setLoading]=useState(true);
    const [teacherReportLoading,setTeacherReportLoading]=useState(false);
    const [progressReportLoading,setProgressReportLoading]=useState(false);

    

    const dateChanger = (date, dateString) => {
        console.log("data string ", dateString);
        setSelectedReportDate(dateString);
    };

    useEffect(()=>{
      console.log("report final data  asssssssssssssssssssssss ",progressReportData,"    ",classStatDetails);
      if (progressReportData!=null && classStatDetails!=null) {
        const reportDataObj={
          classStatDetails:classStatDetails,
          progressReportData:progressReportData,
          selectedReportDate:selectedReportDate
        }
        console.log("report final data ",reportDataObj);
        setProgressReport(reportDataObj);
        getProgessReport(reportDataObj);
        
      }
      
    },[selectedReportDate,progressReportData,classStatDetails])


    useEffect(()=>{
      try {
        
        fetchProgressReportData(selectedReportDate);
        fetchTotalClassPaymentData(selectedReportDate);
        fetchTotalPaymentDataForAllTeachers();
   
      } catch (error) {
        message.error("reports fetching error!")
        console.log("report loading error ",error);
      }
    },[selectedReportDate])


    useEffect(()=>{
      console.log("report final data  asssssssssssssssssssssss ",progressReportData,"    ",classStatDetails);
      if (teacherPaymentData!=null) {
        getTeacherReport();
        
      }
      
    },[selectedReportDate,teacherPaymentData])



    useEffect(()=>{
      if (progressReportPDF!=null && progressReportLoading) {
        downloadprogressReport();
      }
    },[progressReportPDF])


    
  useEffect(()=>{
      if (teacherPaymentReportPDF!=null && teacherReportLoading) {
        downloadTeacherReport();
      }
    },[teacherPaymentReportPDF])


    const fetchTotalClassPaymentData = async (selectedReportDate) => {
      try {
        const selectedDate = selectedReportDate.split('-');
        const result = await getTotalFeePaymentStatistics(selectedDate[1], selectedDate[0]);
        setClassStatDetails(result.data);
      } catch (error) {
        console.log('Error fetching totalPayment statistics', error);
        message.error('Class Fees statistics fetch error!');
      }
    };
  
    const fetchProgressReportData = async (selectedReportDate) => {
      try {
        setLoading(true);
        const reportResult = await getProgressReport(selectedReportDate);
        setProgressReportData(reportResult.data);
        setLoading(false);
      } catch (error) {
        console.log('Progress report fetch error:', error);
        message.error('Progress Report fetch error!');
      }
    };




    const getProgessReport=async(reportDataObj)=>{
      try {
        const reportData=await getProgressReportDownload(JSON.stringify(reportDataObj));
        console.log("downloading report datass",reportData);
        setProgressReportPDF(reportData.data);
      } catch (error) {
        message.error("progress Report fetching error!")
        console.log("progress report fetching error! ",error);
      }
    }


    const getTeacherReport=async()=>{
      try {
        const teacherPaymernReportresult = await getTeacherPaymentReport(teacherPaymentData);
        console.log("downloading report datass",teacherPaymernReportresult.data);
        setTeacherPaymentReportPDF(teacherPaymernReportresult.data);
      } catch (error) {
        message.error("teacher report Report fetching error!")
        console.log("teacher report fetching error! ",error);
      }
    }


    
  const downloadTeacherReport = async () => {
    try {
      setTeacherReportLoading(true);
      if (teacherPaymentReportPDF!=null && teacherReportLoading) {
        const blob = new Blob([teacherPaymentReportPDF], { type: 'application/pdf' }); 
  
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'payment_report.pdf');
  
      document.body.appendChild(link);
      link.click();
  
      window.URL.revokeObjectURL(url);
      setTeacherReportLoading(false);
      }else{
        message.loading("Report is generating, It will download automatically!")
        setTeacherReportLoading(true);
      }
      
  
    } catch (error) {
      console.log("error fetching totalPayment statistics", error);
      message.error("class Fees statistics getting error!");
    }
  };
  

  


  const fetchTotalPaymentDataForAllTeachers = async () => {
    try {
      setLoading(true);
      const selectedDate = selectedReportDate.split('-');
      const result = await getTotalFeePaymentStatisticsByTeacher(selectedDate[1], selectedDate[0]);
      console.log("result teacher payment stat is ", result);
      setTeacherPaymentData(result.data);
      
      setLoading(false);
    } catch (error) {
      console.log("error fetching teacher payment statistics", error);
      message.error("class Fees statistics getting error!");
    }
  };



   
  const downloadprogressReport = async () => {
    try {

      setProgressReportLoading(true);
      if (progressReportPDF!=null && progressReportLoading) {
        const blob = new Blob([progressReportPDF], { type: 'application/pdf' }); 
  
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Progress_report.pdf');
  
        document.body.appendChild(link);
        link.click();
  
        window.URL.revokeObjectURL(url);
        setProgressReportLoading(false);
      }else{
        message.loading("Report is generating, It will download automatically!")
        setProgressReportLoading(true);
      }
      
  
    } catch (error) {
      console.log("error downloading repor", error);
      message.error("Report downloading error!");
    }
  };

    
    
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Reports
        </h1>
      </div>


      <div data-aos="fade-right" className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className='w-[95%] mt-3'>
        <Form layout="vertical" hideRequiredMark>
                <Form.Item label="Select Month to generate Reports">
                  <DatePicker  onChange={dateChanger} picker="month" maxDate={dayjs()} />
                </Form.Item>
              </Form>
        </div>
       
        <div className=" overflow-y-auto h-[90%] w-[95%] flex flex-col items-center ">
          {
            loading?<LoadingInnerPage/>:<><ReportCard keyValue={"progressReport"} progressReport={progressReport}  downloadReport={downloadprogressReport}  titleName={"Progress Report"}/>
            <ReportCard teacherPaymentData={teacherPaymentData} downloadReport={downloadTeacherReport} keyValue={"teacherReport"} titleName={"Teachers Full payment Report"}/></>
          }
            

        </div>
      </div>
    </div>
  )
}

export default OwnerReportShowingPage