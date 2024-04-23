import React, { useEffect, useState } from 'react'
import { getAllClassPayments, getAllRegistrationPayments, getBulkUserData } from '../API'
import { ConfigProvider, Segmented, message } from 'antd';
import LoadingInnerPage from './LoadingInnerPage';
import dayjs from 'dayjs';
import StaffPastPaymentTableRegistration from '../Components/Staff/StaffPastPaymentTableRegistration';
import StaffPastPaymentTableClassFees from '../Components/Staff/StaffPastPaymentTableClassFees';

const PastPaymentsStaff = () => {
    const [loading,setLoading]=useState(true);
    const [registrationPaymentData,setRegistrationPaymentData]=useState([]);
    const [classPaymentData,setClassPaymentData]=useState([])
    const [segmentedValue,setSegmentedValue]=useState(1);


    useEffect(()=>{        
        if (segmentedValue==1) {
            fetchRegistrationPaymentData();
        }else if (segmentedValue==2) {
            fetchClassFeePaymentData()
        }
    },[segmentedValue])



    const fetchRegistrationPaymentData=async()=>{
        try {
            setLoading(true);
            const registrationpayementResult=await getAllRegistrationPayments();
            if (registrationpayementResult.status==200) {
                const registrationResultMapping = registrationpayementResult?.data?.map((paymentData) => ({
                    receiverName: paymentData?.ReceiverData == null ? paymentData?.receiverID + " Not mentioned" : paymentData?.receiverID + " " + paymentData?.ReceiverData?.firstName,
                    issuerName: paymentData?.issuerData == null ? paymentData?.issuer + " Not mentioned" : paymentData?.issuer + " " + paymentData?.issuerData?.firstName,
                    ...paymentData,
                    paymentDate:dayjs(paymentData?.paymentDate).format("YYYY-MM-DD"),
                }));
                setRegistrationPaymentData(registrationResultMapping);
                setLoading(false)
            }
            console.log("registation payment details ",registrationpayementResult);
        } catch (error) {
            console.log(error);
            message.error("RegistrationPayment Data fetching error!")
        }
    }




    const fetchClassFeePaymentData=async()=>{
        try {
            setLoading(true);
            const classPayementResult=await getAllClassPayments();
            if (classPayementResult.status==200) {
                const classPaymentResultMapping = classPayementResult?.data?.map((paymentData) => ({
                    receiverName: paymentData?.ReceiverData == null ? paymentData?.studentID + " Not mentioned" : paymentData?.studentID + " " + paymentData?.ReceiverData?.firstName+" "+paymentData?.ReceiverData?.lastName,
                    issuerName: paymentData?.issuerData == null ? paymentData?.issuer + " Not mentioned" : paymentData?.issuer + " " + paymentData?.issuerData?.firstName,
                    ...paymentData,
                    paymentDate:dayjs(paymentData?.paymentDate).format("YYYY-MM-DD"),
                    className:paymentData?.classData?.ClassName+" "+paymentData?.classData?.medium,
                    grade:paymentData?.classData?.gradeName,
                    subject:paymentData?.classData?.subjectName,
                }));
                setClassPaymentData(classPaymentResultMapping);
                setLoading(false)
            }
            console.log("registation payment details ",classPayementResult);
        } catch (error) {
            console.log(error);
            message.error("RegistrationPayment Data fetching error!")
        }
    }

    const handleSegmentChanging=(value)=>{
        console.log("segmented value is ",value);
        if (value=="Registration Payments") {
            setSegmentedValue(1);
        }else if(value=="Class Fee Payments"){
            setSegmentedValue(2)
        }
    }



  return (
    <div  className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Past Payments
        </h1>
      </div>

      <div data-aos="fade-right" className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
        <div className='w-[95%] mt-2 overflow-y-auto '>
            <div>
            <ConfigProvider
          theme={{
            components: {
              Segmented: {
                itemSelectedBg: "rgb(59 130 246)",
                itemSelectedColor: "white",
                trackBg: "rgb(229 231 235)",
              },
            },
          }}
        >
          <Segmented
            options={["Registration Payments", "Class Fee Payments"]}
            onChange={(value) => handleSegmentChanging(value)}
          />
        </ConfigProvider>
            </div>
            {
                loading?<LoadingInnerPage/>:segmentedValue==1?<StaffPastPaymentTableRegistration registrationPaymentData={registrationPaymentData}/>:<StaffPastPaymentTableClassFees classFeePaymentData={classPaymentData}/>
            }
        </div>
        
      </div>
    </div>
  )
}

export default PastPaymentsStaff