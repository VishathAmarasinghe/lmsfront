import React from 'react'
import { ownerDashboardImg } from '../assets'

const OwnerDashboard = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Dashboard
        </h1>
      </div>

      <div data-aos="fade-right" className="w-[95%]  h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 ">
        <div className="w-full h-[100%] flex flex-col items-center  rounded-2xl">
          <div className='w-full bg-[#4551A1] flex flex-row p-2 rounded-xl'>
            <div className='w-[70%]'>
              
            </div>
            <div className='w-[25%] flex flex-col items-end'>
              <img className='w-[150px]' src={ownerDashboardImg}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard