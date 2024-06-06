import JsBarcode from 'jsbarcode';
import React, { useEffect } from 'react';

const RegistrationBill = ({ paymentData,barCode }) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();


  useEffect(()=>{
    JsBarcode("#barcode2",barCode ,{
      height:"20",
      
    });
  },[barCode])


  return (
    <div id='registrationBillContainer' className='w-[340px] '>
      <div className='flex flex-col justify-center items-center w-full bg-black'>
        <h1 className='font-semibold text-[15px] text-white mt-1'>Savitha Education Institute</h1>
        <h1 className='text-white'>Homagama</h1>
        {/* <p className='text-white mb-1'>Tel 0112345678,0711234566</p> */}
      </div>
      <div className='w-full bg-[#D9D9D9] flex flex-col justify-center items-center p-3'>
        <div className='flex flex-row w-[60%] justify-between items-center my-1'>
          <p className='font-medium'>Student No</p>
          <p> {paymentData.payment.studentID}/{paymentData.payment.receiverID}</p>
        </div>
        <div className='flex flex-row w-[60%] justify-between items-center my-1'>
          <p className='font-medium'>Student Name</p>
          <p> {paymentData.payment.receiverName}</p>
        </div>
        <div className='flex flex-row w-[60%] justify-between items-center my-1'>
          <p className='font-medium'>Registration Fee</p>
          <p> Rs:{paymentData.payment.registrationFee}</p>
        </div>
        <div className='flex flex-row w-[60%] justify-between items-center my-1'>
          <p className='font-medium'>Payment</p>
          <p>Rs: {paymentData.payment.payedAmount}</p>
        </div>
        <div className='flex flex-row w-[60%] justify-between items-center my-1'>
          <p className='font-medium'>Balance</p>
          <p> Rs:{paymentData.payment.balance}</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">  
            <img id="barcode2"/>
          </div>
      <p className='text-center bg-[#D9D9D9]'>Generated at {`${currentDate} ${currentTime}`}</p>
      <div className='h-2 bg-black'></div>
    </div>
  );
};

export default RegistrationBill;
