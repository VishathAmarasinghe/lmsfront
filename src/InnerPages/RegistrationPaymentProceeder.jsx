import { Button, Col, ConfigProvider, Form, Input, InputNumber, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import StudentCard from "../Components/Registration/StudentCard";
import RegistationBill from "../Components/Registration/RegistationBill";
import { useSelector } from "react-redux";
import { htmlToImagetranslator } from "../Utils/htmlCanvasToImage";
import { activateStudentAndParent, createStudentCard, getLatestRegistrationFee, registrationPayment } from "../API";
import { useDispatch } from "react-redux";
import { change_page_number } from "../Actions/PageNumbers";
import { formatBarcode } from "../Utils/Validations";

const RegistrationPaymentProceeder = () => {
  const issuerID = JSON.parse(localStorage.getItem("profile"))?.result?.UserID;
  const [barCodeNumber, setBarcodeNumber] = useState(null);
  const [loading,setLoading]=useState(false);
  const [studentData, setStudentData] = useState({
    barcode: null,
    studentCardPhoto: null,
    studentID: null,
    cardStatus: "pending"
  });


  const { registrationBillInfo } = useSelector(
    (state) => state.registrationBillInfo
  );


  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState({
    payment: {
      amountToPay: 0,
      payedAmount: 0,
      registrationFee: 0,
      balance: 0,
      issuer: issuerID,
      issueType: "Received",
      studentID: registrationBillInfo?.studentID,
      receiverID: registrationBillInfo?.UserID,
      receiverName: registrationBillInfo?.firstName + " " + registrationBillInfo?.lastName,
      additionalCharges: 0,
      description: "registration",
    },
    receiptimage: "",
  });



  useEffect(() => {
    if (registrationBillInfo) {
      console.log("registration bill ingo ",registrationBillInfo);
      getLatestRegistrationFeeInfo();
    }
    setBarcodeNumber(String(String(formatBarcode(registrationBillInfo?.UserID)) + String(formatBarcode(registrationBillInfo?.studentID))));
  }, [registrationBillInfo]);



  useEffect(() => {
    if (registrationBillInfo && paymentData.payment.registrationFee !== 0) {
      const updatedPaymentData = {
        ...paymentData,
        payment: {
          ...paymentData.payment,
          receiverID: registrationBillInfo.UserID,
          issuer: issuerID,
          receiverName: registrationBillInfo.firstName + " " + registrationBillInfo.lastName,
        },
      };

      setPaymentData(updatedPaymentData);
    }
  }, [registrationBillInfo, paymentData.payment.registrationFee]);





  const getLatestRegistrationFeeInfo = async () => {
    try {
      const registrationFee = await getLatestRegistrationFee();
      setPaymentData(prevState => ({
        ...prevState,
        payment: {
          ...prevState.payment,
          registrationFee: registrationFee.data?.amount || 0
        }
      }));
    } catch (error) {
      console.log("last reg fee fetching Error ", error);
      message.error("Latest Registration Fee fetching Error!")
    }
  }



  useEffect(() => {
    if (paymentData.receiptimage != null && studentData.studentCardPhoto != null) {
      handleProceedPayment();
    }
  }, [studentData.studentCardPhoto, paymentData.receiptimage]);




  const createBillImageAndStudentCardImage = async () => {
    if (paymentData.payment.balance>=0 && paymentData.payment.payedAmount>0) {
      const billImage = await htmlToImagetranslator(document.getElementById('registrationBillContainer'));
      if (billImage !== "" && billImage !== null) {
        setPaymentData({ ...paymentData, receiptimage: billImage });
      }
  
      const studentIDCardImage = await htmlToImagetranslator(document.getElementById("studentCard"));
      if (studentIDCardImage !== "" && studentIDCardImage !== null) {
        setStudentData({ ...studentData, studentCardPhoto: studentIDCardImage,barcode:barCodeNumber,studentID:registrationBillInfo.studentID,UserID:registrationBillInfo.UserID,email:registrationBillInfo?.email,phoneNo:registrationBillInfo?.phoneNo,firstName:registrationBillInfo.firstName,issuerID:issuerID });
      }
    }else{
      message.error("Please make sure payments are correct!")
    }
   
  }




  useEffect(() => {
    if (studentData.barcode != null && studentData.barcode !== "") {
      createStudentCardDetails();
    }
  }, [studentData.barcode]);




  const createStudentCardDetails = async () => {
    try {
      const studentCardData = {
        studentData: studentData,
        barcode: barCodeNumber
      };
    } catch (error) {
      message.error("student card creation error!");
      console.log("error ", error);
    }
  }




  const handleProceedPayment = async () => {
    try {
      if (paymentData.payment.balance>=0) {

        setLoading(true);
      const paymentResult = await registrationPayment(paymentData);
      console.log("activating student ID ",studentData);
      
      console.log("payment result   ", paymentResult);
      // console.log("Avtivation Result   ", studentActivationResult);
      if (paymentResult.status === 200) {
        message.success("Payment Proceeded Successfully!");
        const studentActivationResult = await activateStudentAndParent(studentData);
        dispatch(change_page_number("17"));
        if (studentActivationResult.status === 200) {
          message.success("Student Activated!");
          console.log("student activation Result ", studentActivationResult);
        }
  
        // if (studentActivationResult.status === 200 && paymentResult.status === 200) {
          
        // }
        setLoading(false);
      }

      console.log("ongoing student details ", studentData);

    }else{
      setLoading(false);
      message.error("Check the balance")
    }
    } catch (error) {
      setLoading(false);
      console.error("Error in handleProceedPayment:", error);
      message.error("Payment Updation Error!")
    }
  };



  useEffect(()=>{
    setPaymentData(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        amountToPay:paymentData?.payment?.registrationFee+paymentData?.payment?.additionalCharges
      }
    }));
  },[paymentData.payment.registrationFee,paymentData.payment.additionalCharges])




  const handleAdditionalChangersChange=(value)=>{
    setPaymentData(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        additionalCharges:value
      }
    }));
  }

  const handlePaidValue=(value)=>{
    setPaymentData(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        payedAmount:value,
        balance:value-prevState.payment.amountToPay
      }
    }));
    setStudentData({ ...studentData, barcode:barCodeNumber,studentID:registrationBillInfo.UserID });

  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center   shadow-2xl  overflow-y-auto  ">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Registration Billing
        </h1>
      </div>
      <div className="w-[95%]   flex flex-col lg:flex-row justify-around rounded-xl bg-white p-1 shadow-xl ring-1 ring-gray-300">
        <div className="w-full lg:w-1/2  flex flex-col justify-around items-center p-1 mt-1  rounded-lg">
          <div className=" w-[95%]">
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: "#EBEEFF",
                },
              }}
            >
              <div>
                <p className="text-[19px] mb-2 font-medium">Billing info</p>
              </div>
              <Form
                className="font-medium text-[14px]"
                layout="horizontal"
                hideRequiredMark
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                labelAlign="left"
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      className="font-medium mb-5"
                      
                      label="Register No"
                    >
                      <Input
                      name="receiverID"
                        value={paymentData.payment.receiverID}
                        readOnly
                        placeholder="Please enter registration no"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      
                      label="Student Name"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                      name="receiverName"
                        value={paymentData.payment.receiverName}
                        placeholder="Please enter student name"
                      />
                    </Form.Item>
                    <Form.Item
                    
                     
                      label="RegistrationFee"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                      name="registrationFee"
                        value={paymentData.payment.registrationFee}
                        placeholder="Please enter registration fee"
                      />
                    </Form.Item>
                    <Form.Item
                     
                      label="Additional Charges"
                      className="font-medium mb-5"
                    >
                      <InputNumber
                      className="w-full"
                       name="additionalCharges"
                       onChange={handleAdditionalChangersChange}
                        value={paymentData.payment.additionalCharges}
                        placeholder="Please enter Additional Charges"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Total Payment"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                      name="amountToPay"
                        value={paymentData.payment.amountToPay}
                        placeholder="Please enter Total payment"
                      />
                    </Form.Item>
                    <Form.Item
                    
                      label="Paid Amount"
                      className="font-medium mb-5"
                    >
                      <InputNumber
                      autoFocus
                      className="w-full"
                      name="payedAmount"
                      onChange={handlePaidValue}
                        value={paymentData.payment.payedAmount}
                        placeholder="Please enter payment"
                      />
                    </Form.Item>
                    <Form.Item
                      
                      label="Balance"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                      name="balance"
                        value={paymentData.payment.balance}
                        placeholder="Please enter  Balance"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </ConfigProvider>
          </div>

          <div className="flex flex-col  w-full items-center mt-1">
            {/* <button className="bg-blue-500 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-blue-600 rounded-lg scalar-card">
              Print Card
            </button> */}
            <Button loading={loading} onClick={createBillImageAndStudentCardImage} className="bg-green-700  w-[96%] mb-2 text-white font-semibold hover:bg-green-800 rounded-lg scalar-card">
              Proceed Payment
            </Button>
            <Button className=" w-[96%] mb-2  text-red-700 border-2 border-red-700 font-bold hover:bg-red-700 hover:text-white rounded-lg scalar-card">
              Cancle
            </Button>
          </div>
        </div>
        <div className="w-[95%] lg:w-[40%]  mt-2 bg-white flex flex-col justify-center items-center p-2 rounded-xl">
          <div className="  mt-4  flex ">
            <StudentCard barCode={barCodeNumber} studentData={registrationBillInfo} />
          </div>
          <RegistationBill barCode={barCodeNumber} paymentData={paymentData} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPaymentProceeder;
