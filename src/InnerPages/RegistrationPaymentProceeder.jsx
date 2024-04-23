import { Col, ConfigProvider, Form, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import StudentCard from "../Components/Registration/StudentCard";
import RegistationBill from "../Components/Registration/RegistationBill";
import { useSelector } from "react-redux";
import { htmlToImagetranslator } from "../Utils/htmlCanvasToImage";
import { activateStudentAndParent, registrationPayment } from "../API";
import { useDispatch } from "react-redux";
import { change_page_number } from "../Actions/PageNumbers";
import { formatBarcode } from "../Utils/Validations";

const RegistrationPaymentProceeder = () => {
  const [form] = Form.useForm();
  const issuerID = JSON.parse(localStorage.getItem("profile"))?.result?.UserID;
  const [barCodeNumber,setBarcodeNumber]=useState(null);
  const [studentData,setStudentData]=useState({
    barcode:null,
    studentCardPhoto:null,
    studentID:null,
    cardStatus:"pending"
  })
  const { registrationBillInfo } = useSelector(
    (state) => state.registrationBillInfo
  );
  const dispatch=useDispatch();
  // const [paymentDatavalues, setpaymentDatavalues]=useState();
  const [paymentData, setPaymentData] = useState({
    payment: {
      amountToPay: 5000,
      payedAmount: 4500,
      registrationFee: 1200,
      balance: 500,
      issuer: "",
      issueType: "Received",
      studentID:registrationBillInfo?.studentID,
      receiverID: registrationBillInfo?.UserID,
      receiverName:  registrationBillInfo?.firstName +" " +registrationBillInfo?.lastName,
      additionalCharges: 500,
      description: "registration",
    },
    receiptimage: "",
  });

  useEffect(() => {
    console.log("registration bill details", registrationBillInfo);
    if (registrationBillInfo) {
      const updatedPaymentData = {
        ...paymentData,
        payment: {
          ...paymentData.payment,
          receiverID: registrationBillInfo.UserID,
          issuer: issuerID,
          receiverName:
            registrationBillInfo.firstName +
            " " +
            registrationBillInfo.lastName,
        },
      };

      setPaymentData(updatedPaymentData);

      form.setFieldValue("payment", updatedPaymentData.payment);
      
    }
    setBarcodeNumber(String(String(formatBarcode(registrationBillInfo?.UserID)) + String(formatBarcode(registrationBillInfo?.studentID))))
    console.log("payment Data ", paymentData);
  }, [registrationBillInfo, form]);


  useEffect(()=>{
    setStudentData({...studentData,barcode:barCodeNumber,...registrationBillInfo});
  },[barCodeNumber])


  useEffect(()=>{
    if (paymentData.receiptimage!=null && studentData.studentCardPhoto!=null) {
      handleProceedPayment();
    }
  },[studentData.studentCardPhoto,paymentData.receiptimage])


  const createBillImageAndStudentCardImage=async()=>{
    const billImage = await htmlToImagetranslator(document.getElementById('registrationBillContainer'));
    if (billImage !== "" && billImage !== null) {
       setPaymentData({ ...paymentData, receiptimage: billImage });
    }

    const studentIDCardImage = await htmlToImagetranslator(document.getElementById("studentCard"));
    if (studentIDCardImage !== "" && studentIDCardImage !== null) {
       setStudentData({ ...studentData, studentCardPhoto: studentIDCardImage });
    }
  }


 


  
  const handleProceedPayment = async () => {
    try {
      const paymentResult = await registrationPayment(paymentData);
      const studentActivationResult = await activateStudentAndParent(studentData);
      console.log("data ", paymentResult.data);
      if (paymentResult.status === 200) {
        message.success("Payment Proceeded Successfully!");
       
      }
  
      console.log("ongoing student details ", studentData);
     
      if (studentActivationResult.status === 200) {
        message.success("Student Activated!");
        console.log("student activation Result ", studentActivationResult);
        
      }

      if (studentActivationResult.status===200 &&  paymentResult.status===200) {
        dispatch(change_page_number("17"));
      }

    } catch (error) {
      console.error("Error in handleProceedPayment:", error);
      message.error("Payment Updation Error!")

    }
  };
  


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
                form={form}
                className="font-medium text-[14px]"
                layout="horizontal"
                initialValues={paymentData.payment}
                hideRequiredMark
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                labelAlign="left"
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      className="font-medium mb-5"
                      name="receiverID"
                      label="Register No"
                    >
                      <Input
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
                      name="receiverName"
                      label="Student Name"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                        value={paymentData.payment.receiverName}
                        placeholder="Please enter student name"
                      />
                    </Form.Item>
                    <Form.Item
                    
                      name="registrationFee"
                      label="RegistrationFee"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                        value={paymentData.payment.registrationFee}
                        placeholder="Please enter registration fee"
                      />
                    </Form.Item>
                    <Form.Item
                      name="additionalCharges"
                      label="Additional Charges"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                        value={paymentData.payment.additionalCharges}
                        placeholder="Please enter Additional Charges"
                      />
                    </Form.Item>
                    <Form.Item
                      name="amountToPay"
                      label="Total Payment"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
                        value={paymentData.payment.amountToPay}
                        placeholder="Please enter Total payment"
                      />
                    </Form.Item>
                    <Form.Item
                      name="payedAmount"
                      label="Payment"
                      className="font-medium mb-5"
                    >
                      <Input
                      autoFocus
                        value={paymentData.payment.payedAmount}
                        placeholder="Please enter payment"
                      />
                    </Form.Item>
                    <Form.Item
                      name="balance"
                      label="Balance"
                      className="font-medium mb-5"
                    >
                      <Input
                      readOnly
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
            <button onClick={createBillImageAndStudentCardImage} className="bg-green-700 p-2 w-[96%] mb-2 text-white font-semibold hover:bg-green-800 rounded-lg scalar-card">
              Proceed Payment
            </button>
            <button className=" p-2 w-[96%] mb-2  text-red-700 border-2 border-red-700 font-bold hover:bg-red-700 hover:text-white rounded-lg scalar-card">
              Cancle
            </button>
          </div>
        </div>
        <div className="w-[95%] lg:w-[40%]  mt-2 bg-white flex flex-col justify-center items-center p-2 rounded-xl">
          <div className="w-[90%] md:w-[75%] mt-4  flex ">
            <StudentCard barCode={barCodeNumber} studentData={registrationBillInfo} />
          </div>
          <RegistationBill barCode={barCodeNumber} paymentData={paymentData} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPaymentProceeder;
