import React, { useState } from "react";
import { Button, Drawer } from "antd";
import ClassFeePaymentBill from "./ClassFeePaymentBill";
const ClassBillDrawer = ({
  billPreviewDrawerOpen,
  setBillPreviewDrawerOpen,
  selectedStudent,
  paymentFinalizedClasses,
  paymentInfo
}) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setBillPreviewDrawerOpen(true);
  };
  const onClose = () => {
    setBillPreviewDrawerOpen(false);
  };
  return (
    <Drawer 
    title="Class Bill" 
    width={'30%'}
    onClose={onClose} 
    open={billPreviewDrawerOpen}
    >

     <div className="flex flex-col justify-center items-center w-full h-[95%] ">
            <ClassFeePaymentBill paymentInfo={paymentInfo} selectedStudent={selectedStudent} paymentFinalizedClasses={paymentFinalizedClasses}/>
     </div>
    </Drawer>
  );
};
export default ClassBillDrawer;
