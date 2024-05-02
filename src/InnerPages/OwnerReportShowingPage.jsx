import { FileOutlined } from '@ant-design/icons'
import { DatePicker, Form, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ProgressReportModel from '../Components/Owner/ProgressReportModel';
import ReportCard from '../Components/Owner/ReportCard';
import dayjs from 'dayjs';
import { getProgressReport, getTotalFeePaymentStatistics } from '../API';

const OwnerReportShowingPage = () => {
    const [selectedReportDate,setSelectedReportDate]=useState(dayjs().format("YYYY-MM"));
    const [progressReportData,setProgressReportData]=useState(null);
    const [classStatDetails,setClassStatDetails]=useState(null);

    const dateChanger = (date, dateString) => {
        console.log("data string ", dateString);
        setSelectedReportDate(dateString);
    };

    useEffect(()=>{
        if (selectedReportDate!=null) {
            fetchProgressReportData();
            fetchTotalClassPaymentData();
        }
        
    },[selectedReportDate])


    const fetchTotalClassPaymentData = async () => {
      try {
        
        const selectedDate=selectedReportDate.split("-");
        const result = await getTotalFeePaymentStatistics(selectedDate[1],selectedDate[0]);
        console.log("result od payment stat is ", result);
        setClassStatDetails(result.data);
       
      } catch (error) {
        console.log("error fetching totalPayment statistics", error);
        message.error("class Fees statistics getting error!");
      }
    };


    const fetchProgressReportData=async()=>{
        try {
            const reportResult=await getProgressReport(selectedReportDate);
            console.log("progress report result ",reportResult);
            setProgressReportData(reportResult.data);

        } catch (error) {
            console.log("progree report getting error! ",error);
            message.error("Progress Report getting error!")
        }
    }
    
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
            <ReportCard classStatDetails={classStatDetails} progressReportData={progressReportData} titleName={"Progress Report"}/>
            <ReportCard titleName={"Progress Report"}/>

        </div>
      </div>
    </div>
  )
}

export default OwnerReportShowingPage