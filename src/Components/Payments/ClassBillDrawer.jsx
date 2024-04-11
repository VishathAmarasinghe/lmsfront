import React, { useState } from "react";
import { Button, Drawer } from "antd";
import ClassFeePaymentBill from "./ClassFeePaymentBill";
const ClassBillDrawer = ({
  billPreviewDrawerOpen,
  setBillPreviewDrawerOpen,
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
    title="Basic Drawer" 
    width={'40%'}
    onClose={onClose} 
    open={billPreviewDrawerOpen}
    >

     <div className="flex flex-col justify-center items-center w-full h-[95%] border-2 border-red-500">
            <ClassFeePaymentBill/>
     </div>
    </Drawer>
  );
};
export default ClassBillDrawer;
