import React from 'react'
import { lecturer } from '../../assets'
import Barcode from 'react-barcode'


const StudentCard = () => {
  return (
    <div className='w-[400px] border-2 border-green-600'>
        <div className='w-full border-2 border-blue-700 flex flex-col justify-center items-center p-1 bg-[#5B6BD4]'>
            <h1 className='font-inter font-semibold text-[18px] text-white'>Savitha Education Institute</h1>
            <p className='text-white font-inter font-normal'>Tel:0112894233,0713234566</p>
        </div>
        <div className='flex flex-row h-full items-center justify-center'>
            <div className='flex flex-col w-[40%] h-full justify-center items-center'>
                <img src={lecturer} alt='student' className='h-full'/>
            </div>
            <div className='w-[60%] border-2 border-red-600'>
                <div className='flex flex-row w-full justify-around mt-2'>
                    <p className='font-inter font-semibold'>Student No</p>
                    <p className='font-inter'>SE008976</p>
                </div>
                <div className='flex flex-row w-full justify-around mt-2'>
                    <p className='font-inter font-semibold'>Student No</p>
                    <p className='font-inter'>SE008976</p>
                </div>
                <div className='w-full border-2 border-gray-600 flex flex-col justify-center items-center'>
                    <Barcode height={40} width={1} fontSize={15} value='S0000129E990876'/>
                </div>
               
            </div>
        </div>
        <div className='h-2 w-full bg-[#5B6BD4]'>

</div>
    </div>
  )
}

export default StudentCard