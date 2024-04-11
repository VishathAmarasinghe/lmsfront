import React from 'react'

const ClassFeePaymentBill = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    return (
      <div className='w-[400px] border-2 border-blue-600'>
        <div className='flex flex-col justify-center items-center w-full bg-black'>
          <h1 className='font-inter font-semibold text-[17px] text-white mt-1'>Savitha Education Institute</h1>
          <h1 className='text-white font-inter'>Homagama</h1>
          <p className='text-white mb-1'>Tel 0112345678,0711234566</p>
        </div>
        <div className='w-full bg-[#D9D9D9] border-2 border-green-600 flex flex-col justify-center items-center p-3'>
          <div className='flex flex-row w-[60%] border-2 border-red-600 justify-between items-center my-2'>
            <p className='font-inter font-medium'>Student No</p>
            <p>SE1234456</p>
          </div>
          <div className='flex flex-row w-[60%] border-2 border-red-600 justify-between items-center my-2'>
            <p className='font-inter font-medium'>Student Name</p>
            <p>SE1234456</p>
          </div>
          <div className='flex flex-row w-[60%] border-2 border-red-600 justify-between items-center my-2'>
            <p className='font-inter font-medium'>Registration Fee</p>
            <p>SE1234456</p>
          </div>
          <div className='flex flex-row w-[60%] border-2 border-red-600 justify-between items-center my-2'>
            <p className='font-inter font-medium'>Payment</p>
            <p>SE1234456</p>
          </div>
          <div className='flex flex-row w-[60%] border-2 border-red-600 justify-between items-center my-2'>
            <p className='font-inter font-medium'>Balance</p>
            <p>SE1234456</p>
          </div>
        </div>
        <p className='text-center bg-[#D9D9D9]'>Generated at {`currentDate ${currentDate} ${currentTime}`}</p>
        <div className='h-2 bg-black'></div>
      </div>
    )
}

export default ClassFeePaymentBill