import React, { useEffect, useState } from "react";
import { Button, Descriptions, Modal, Tag } from "antd";
import {
  ExclamationCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CheckCircleOutlined } from "@mui/icons-material";
import { getMonthName } from "../../Utils/Validations";
import { useDispatch } from "react-redux";
import { classPaymentSelectedClasspayments } from "../../Actions/payment";

const FeesExistingPopup = ({
  paymentFinalizedClasses,
  setPaymentFinalizedClasses,
  modelData,
  feesExisitngOpenModel,
  setFeesExisitngOpenModel,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [buttonTextChanger,setButtonTextChanger]=useState({
    pastPay:false,
    pastSkip:false,
    prasentPay:false,
    nextpay:false
  })
  const dispatch = useDispatch();


  useEffect(()=>{
    console.log("payment finalized classes array is this ",paymentFinalizedClasses);
  },[paymentFinalizedClasses])

  const pastDayInwordings =
    modelData?.paymentData?.verification?.past?.date?.split("/") || [];
  const prasentDayInwordings =
    modelData?.paymentData?.verification?.present?.date?.split("/") || [];
  const nextDayInwordings =
    modelData?.paymentData?.verification?.next?.date?.split("/") || [];

  const lastMonthPaymentHandle = (type) => {
    const paymentVouture = {
      classID: modelData.classData.classID,
      classFee: modelData.classData.classFee,
      month: "",
      year: "",
      method: "cash",
    };
    if (type == "past") {
      paymentVouture.month = pastDayInwordings[0];
      paymentVouture.year = pastDayInwordings[1];
      setButtonTextChanger((pre)=>({...pre, pastPay:!pre.pastPay}))
    } else if (type == "prasent") {
      paymentVouture.month = prasentDayInwordings[0];
      paymentVouture.year = prasentDayInwordings[1];
      setButtonTextChanger((pre)=>({...pre, prasentPay:!pre.prasentPay}))
    } else if (type == "next") {
      paymentVouture.month = nextDayInwordings[0];
      paymentVouture.year = nextDayInwordings[1];
      setButtonTextChanger((pre)=>({...pre, nextpay:!pre.nextpay}))
    } else if (type == "skip") {
      paymentVouture.month = pastDayInwordings[0];
      paymentVouture.year = pastDayInwordings[1];
      paymentVouture.classFee = 0;
      setButtonTextChanger((pre)=>({...pre, pastSkip:!pre.pastSkip}))
    }

    const classItemChecking = paymentFinalizedClasses.find(
      (cls) => cls.classID === paymentVouture.classID && cls.month ===paymentVouture.month && cls.year === paymentVouture.year
    );
    console.log("class ITem checkinggggggggggggggggggggggg ", classItemChecking);
    if (!classItemChecking) {
      setPaymentFinalizedClasses([...paymentFinalizedClasses, paymentVouture]);

    } else {

      const updatedClasses = paymentFinalizedClasses.filter(
        (cls) => cls.classID !== paymentVouture.classID && cls.month ===paymentVouture.month && cls.year === paymentVouture.year
      );
      setPaymentFinalizedClasses(updatedClasses);
    }
  };

  useEffect(() => {
    dispatch(classPaymentSelectedClasspayments(paymentFinalizedClasses));
  }, [paymentFinalizedClasses]);

  const PaymentStatus = ({ paymentTimeFrame, modelData }) => {
    return (
      <div className="flex flex-col w-full">
        <div className="w-full">
          {paymentTimeFrame === "past" ? (
            modelData.paymentData.verification.past.value === 0 ? (
              <div className="w-full flex flex-col justify-center  ">
                <Tag
                  color="red"
                  className="w-full flex flex-row p-3 justify-center items-center"
                >
                  <ExclamationCircleOutlined className="text-[17px]" />
                  <p className="text-[15px] ml-2">Not Paid</p>
                </Tag>
                <div className="flex flex-col mt-2 w-full">
                  <button
                  
                  disabled={buttonTextChanger.pastSkip}
                    onClick={()=>lastMonthPaymentHandle("past")}
                    className={`${buttonTextChanger.pastSkip?"bg-slate-400":"bg-green-500"} border-2 border-green-500 p-1 w-full mb-2 rounded-md text-white hover:bg-green-600`}
                  >
                    {buttonTextChanger.pastPay && !buttonTextChanger.pastSkip?"Added To Bill":"Pay Now"}
                  </button>
                  <button
                  disabled={buttonTextChanger.pastPay}
                    onClick={()=>lastMonthPaymentHandle("skip")}
                    className={`border-2 border-slate-500 p-1 w-full rounded-md text-slate-600 hover:bg-slate-500 hover:text-white`}
                  >
                   {!buttonTextChanger.pastPay && buttonTextChanger.pastSkip?"Skipped":"Skip Now"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center ">
                <Tag
                  color="green"
                  className="w-full flex flex-row p-3 justify-center items-center"
                >
                  <CheckCircleOutlined className="text-[17px]" />
                  <p className="text-[15px] ml-2">Paid</p>
                </Tag>
              </div>
            )
          ) : paymentTimeFrame === "present" ? (
            modelData.paymentData.verification.present.value === 0 ? (
              <div className="w-full flex flex-col justify-center  ">
                <Tag
                  color="green"
                  className="w-full flex flex-row p-3 justify-center items-center"
                >
                  <SolutionOutlined className="text-[17px]" />
                  <p className="text-[15px] ml-2">Not Paid</p>
                </Tag>
                <div className="flex flex-col mt-2 w-full">
                  <button
                    onClick={()=>lastMonthPaymentHandle("prasent")}
                    className="bg-green-500 border-2 border-green-500 p-1 w-full mb-2 rounded-md text-white hover:bg-green-600"
                  >
                    {buttonTextChanger.prasentPay ?"Added To Bill":"Pay Now"}
                  </button>
                  <button className="cursor-pointer p-1 w-full rounded-md text-white ">
                    sd
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center ">
                <Tag
                  color="green"
                  className="w-full flex flex-row p-3 justify-center items-center"
                >
                  <CheckCircleOutlined className="text-[17px]" />
                  <p className="text-[15px] ml-2">Paid</p>
                </Tag>
              </div>
            )
          ) : paymentTimeFrame === "next" ? (
            modelData.paymentData.verification.next.value === 0 ? (
              <div className="w-full flex flex-col justify-center  ">
                <Tag
                  color="green"
                  className="w-full flex flex-row p-3 justify-center items-center"
                >
                  <SolutionOutlined className="text-[17px]" />
                  <p className="text-[15px] ml-2">Not Paid</p>
                </Tag>
                <div className="flex flex-col mt-2 w-full">
                  <button
                  // disabled={buttonTextChanger.nextpay}
                    onClick={()=>lastMonthPaymentHandle("next")}
                    className="bg-green-500 border-2 border-green-500 p-1 w-full mb-2 rounded-md text-white hover:bg-green-600"
                  >
                    {buttonTextChanger.nextpay ?"Added To Bill":"Pay Now"}
                  </button>
                  <button className="0 p-1 w-full rounded-md text-white ">
                    sd
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center ">
                <Tag
                  color="green"
                  className="w-full flex flex-row p-3 justify-center items-center"
                >
                  <CheckCircleOutlined className="text-[17px]" />
                  <p className="text-[15px] ml-2">Paid</p>
                </Tag>
              </div>
            )
          ) : null}
        </div>
        <div></div>
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: (
        <p>{getMonthName(pastDayInwordings[0]) + " " + pastDayInwordings[1]}</p>
      ),
      children: (
        <div>
          <PaymentStatus paymentTimeFrame={"past"} modelData={modelData} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          {getMonthName(prasentDayInwordings[0]) +
            " " +
            prasentDayInwordings[1]}
          <p className="font-normal text-[13px]">This Month</p>
        </div>
      ),
      children: (
        <div>
          <PaymentStatus paymentTimeFrame={"present"} modelData={modelData} />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <p>{getMonthName(nextDayInwordings[0]) + " " + nextDayInwordings[1]}</p>
      ),
      children: (
        <div>
          <PaymentStatus paymentTimeFrame={"next"} modelData={modelData} />
        </div>
      ),
    },
  ];

  const classItems = [
    {
      key: "1",
      label: "Class ID",
      children: <p>{modelData?.classData?.classID}</p>,
    },
    {
      key: "2",
      label: "Class Name",
      children: <p>{modelData?.classData?.ClassName}</p>,
    },
    {
      key: "3",
      label: "Grade",
      children: <p>{modelData?.classData?.ClassName}</p>,
    },
    {
      key: "4",
      label: "Subject",
      children: <p>{modelData?.classData?.ClassName}</p>,
    },
    {
      key: "5",
      label: "Payment Fee",
      children: <p>Rs:{modelData?.classData?.classFee}</p>,
    },
  ];

  console.log("mode dta is ", modelData);

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancel();
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setButtonTextChanger(
      {
        pastPay:false,
        pastSkip:false,
        prasentPay:false,
        nextpay:false
      
    })
    setFeesExisitngOpenModel(false);
  };

  return (
    <Modal
      title={<p className="text-[18px]">Payment Summary</p>}
      width={"50%"}
      open={feesExisitngOpenModel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} className="mr-2">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          className={`${
            confirmLoading ? "bg-green-500" : "bg-blue-500"
          } hover:bg-opacity-75`}
        >
          {confirmLoading ? "Loading" : "OK"}
        </Button>,
      ]}
    >
      <div className="flex flex-col w-full">
        <div>
          <Descriptions
            labelStyle={{
              fontWeight: "bold",
            }}
            title={<p className="text-[15px]">Class Info</p>}
            items={classItems}
          />
        </div>
        <Descriptions
          title={<p className="text-[15px]">Payment Info</p>}
          labelStyle={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "17px",
          }}
          items={items}
          bordered
          layout="vertical"
        />
      </div>
    </Modal>
  );
};

export default FeesExistingPopup;
