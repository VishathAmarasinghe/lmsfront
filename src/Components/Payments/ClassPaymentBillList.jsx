import React, { useEffect, useState } from "react";
import ClasspaymentDisplaycard from "./ClasspaymentDisplaycard";
import { Select } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { checkStudentClassFeePayment } from "../../API";
import FeesExistingPopup from "./FeesExistingPopup";
import { useDispatch } from "react-redux";
import { classPaymentSelectedClasspayments } from "../../Actions/payment";

const monthSelections = [
  { value: 1, label: "Same Month" },
  { value: 2, label: "Different Month" },
];

const ClassPaymentBillList = ({ selectedStudent }) => {
  const paymentSelectedClass = useSelector(
    (state) => state.payment.paymentSelectedClass
  );
  const dispatch = useDispatch();
  const paymentclassBillArray=useSelector((state)=>state.payment.paymentclassBillArray);
  const [paymentFinalizedClasses, setPaymentFinalizedClasses] = useState([]);
  const [classPaymentList, setPaymentList] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [feesExisitngOpenModel, setFeesExisitngOpenModel] = useState(false);
  const [modelData, setModelData] = useState({
    classData: "",
    paymentData: "",
  });

  useEffect(() => {
    console.log("payment selected main classes issssssssssss ",paymentSelectedClass);
    calculateTotalPayment();
    checkPaymentExisitance();
  }, [paymentSelectedClass]);

  useEffect(()=>{
    dispatch(classPaymentSelectedClasspayments(paymentclassBillArray));
  },[paymentclassBillArray])


  useEffect(() => {
    dispatch(classPaymentSelectedClasspayments(paymentFinalizedClasses));
     console.log("class payment finalized array ",paymentFinalizedClasses);
  }, [paymentFinalizedClasses])

  useEffect(() => {
    monthChangingTrigger(1);
  }, []);

  const calculateTotalPayment = () => {
    let paymentvalue = 0;
    paymentFinalizedClasses.map((payment) => {
      paymentvalue = paymentvalue + payment.classFee;
    });
    console.log("classes payment tita ", paymentvalue);
    setTotalPayment(paymentvalue);
  };

  const checkPaymentExisitance = async () => {
    const classIDs = paymentSelectedClass.map((classItem) => ({
      classID: classItem.classID,
      month: new Date().getMonth()+1,
      year: new Date().getFullYear(),
      joinedDate: classItem.joinDate,
    }));
    const studentpaymentData = {
      studentID: selectedStudent?.data?.UserID,
      paymentArray: classIDs,
    };

    const exisitanceResult = await checkStudentClassFeePayment(
      studentpaymentData
    );
    console.log("exisitance dat ", exisitanceResult.data);
    console.log("payment data ", studentpaymentData);
    if (exisitanceResult.status == 200) {
      exisitanceResult.data.forEach((element) => {
        console.log("element is  dowloading ", element);
        const classData = paymentSelectedClass.find(
          (item) => item.classID === element.classID
        );

        console.log("class ID is for etching   ", classData);
        if (
          element?.verification?.past?.value == 0 ||
          element?.verification?.present?.value == 1
        ) {
          const checkingExisitaceOFItemInBill=paymentFinalizedClasses.find(billElement=>billElement.classID==element.classID);
          console.log("alreading existance in bill", checkingExisitaceOFItemInBill);
          if (!checkingExisitaceOFItemInBill) {
            setModelData({
              classData: classData,
              paymentData: element,
            });
            setFeesExisitngOpenModel(true);
          }
          
        } else {
          const paymentVouture = {
            classID: classData.classID,
            classFee: classData.classFee,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            method: "cash",
          };

          const classItemChecking = paymentFinalizedClasses.find(
            (cls) => cls.classID === paymentVouture.classID
          );
          if (!classItemChecking) {
            setPaymentFinalizedClasses([...paymentFinalizedClasses, paymentVouture]);

          } else {
            const updatedClasses = paymentFinalizedClasses.filter(
              (cls) => cls.classID !== paymentVouture.classID
            );
            setPaymentFinalizedClasses(updatedClasses);
          }
        }
      });
    }
  };

  const monthChangingTrigger = (value) => {
    if (value === 1) {
      const currentDate = new Date();
      const currentMonthcalculate = currentDate.getMonth() + 1;
      setCurrentMonth(currentMonthcalculate);
    }
  };

  return (
    <div className=" h-[97%] flex flex-col  justify-between ">
      <FeesExistingPopup
        paymentFinalizedClasses={paymentFinalizedClasses}
        setPaymentFinalizedClasses={setPaymentFinalizedClasses}
        modelData={modelData}
        setModelData={setModelData}
        feesExisitngOpenModel={feesExisitngOpenModel}
        setFeesExisitngOpenModel={setFeesExisitngOpenModel}
      />
      <div className="w-full h-[87%] ">
        <div className=" h-[15%] w-full p-2 flex flex-row justify-between items-center">
          <Select
            className="w-[40%]"
            onChange={""}
            options={monthSelections}
            defaultValue={1}
          />
          <button className="p-1 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-700">
            <FileOutlined className="p-1" />
            Bill Preview
          </button>
        </div>
        <div className="flex flex-col w-full h-[88%] border-2 ">
          <div className="flex flex-row h-[12%] justify-around items-center bg-[#F3F7FF] p-2">
            <p className="font-medium text-[16px]">Class</p>
            <p className="font-medium text-[16px]">Month</p>
            <p className="font-medium text-[16px]">Fee</p>
          </div>
          <div className="w-full overflow-y-auto h-[90%] ">
            {paymentFinalizedClasses.map((item, index) => {
              return (
                <ClasspaymentDisplaycard
                  key={index}
                  currentMonth={currentMonth}
                  payment={item}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#F3F7FF] h-[14%] mt-4 p-2 ">
        <div className="flex flex-row justify-between">
          <p className="w-[70%]  flex flex-row justify-center text-[15px] font-semibold text-slate-500">
            Sub Total
          </p>
          <p className="w-[30%] flex flex-col justify-center items-center font-semibold text-[15px] text-slate-500">
            Rs:{totalPayment}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="w-[70%]  flex flex-row justify-center text-[17px] font-bold text-black">
            Total Payment
          </p>
          <p className="w-[30%] flex flex-col justify-center items-center font-bold text-[17px] text-black">
            Rs:{totalPayment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassPaymentBillList;
