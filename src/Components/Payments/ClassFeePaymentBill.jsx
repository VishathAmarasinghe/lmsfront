import React from 'react'

const ClassFeePaymentBill = ({selectedStudent,paymentFinalizedClasses,paymentInfo}) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    console.log("selected student is in bill ",selectedStudent);
    console.log("selected payment Finalized Class in bill ",paymentFinalizedClasses);
    return (
      <div className='w-[300px] border-2 border-black'>
        <div className='flex flex-col justify-center items-center w-full '>
          <h1 className='font-inter font-semibold text-[17px] text-black mt-1'>Savitha Education Institute</h1>
          <h1 className='text-black font-inter'>Homagama</h1>
          <p className='text-black mb-1'>Tel 0112345678,0711234566</p>
        </div>
        <div className='w-full bg-[#D9D9D9] border-t-2 border-b-2  border-dashed border-slate-600 flex flex-col justify-center items-center p-3'>
          <div className='w-full flex flex-col border-b-2 border-slate-600 border-dashed'>
          <div className='flex flex-row  justify-between items-center '>
            <p className='font-inter font-medium text-[13px]'>Student No</p>
            <p>{selectedStudent?.value}</p>
          </div>
          <div className='flex flex-row  justify-between items-center mb-2'>
            <p className='font-inter font-medium'>Student Name</p>
            <p>{selectedStudent?.data?.firstName}</p>
          </div>
          </div>
          {
            paymentFinalizedClasses?.map(payment=>(
              <div className='flex flex-row w-full  justify-between items-center my-2'>
              <p className='font-inter font-medium w-[25%]'>{payment?.classID}</p>
              <p className='font-inter font-medium w-[30%] flex flex-row justify-end'>{payment?.month}/{payment?.year}</p>
              <p className='w-[50%] flex flex-row justify-end'>{payment?.classFee}</p>
            </div>
            ))
          }
         
          <div className='w-full border-t-2 border-slate-600 '>
          <div className='flex flex-row w-full  justify-between items-center mt-1'>
            <p className='font-inter font-medium'>Total Payment</p>
            <p>Rs:{paymentInfo?.total}</p>
          </div>
          <div className='flex flex-row w-full  justify-between items-center '>
            <p className='font-inter font-medium'>Balance</p>
            <p>Rs:{paymentInfo?.balance}</p>
          </div>
          </div>
        </div>
        <p className='text-center bg-[#D9D9D9] pb-2'>Generated at {`${currentDate} ${currentTime}`}</p>
        {/* <div className='h-2 bg-black'></div> */}
      </div>
    )
}

export default ClassFeePaymentBill