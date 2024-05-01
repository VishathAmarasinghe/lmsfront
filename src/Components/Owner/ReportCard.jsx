import { FileOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React, { useState } from 'react'
import ProgressReportModel from './ProgressReportModel'

const ReportCard = ({titleName,index,progressReportData}) => {
    const [progressReportModelOpen,  setProgressReportModelOpen]=useState(false);


    const handleOpenReportModel=()=>{
        setProgressReportModelOpen(true);
    }

  return (
    <div className='w-full flex flex-row bg-gray-200 p-2 rounded-lg mb-2'>
         <ProgressReportModel progressReportData={progressReportData} progressReportModelOpen={progressReportModelOpen} setProgressReportModelOpen={setProgressReportModelOpen}/>
                <div className='w-[5%] '>
                    <FileOutlined className='text-[18px] hover:bg-slate-500 bg-slate-400 rounded-md text-white p-2' />
                </div>

                <div className='w-[60%]  flex flex-col justify-center  '>
                    <p className='text-[15px] font-medium'>{titleName}</p>
                </div>

                <div className='w-[40%] flex flex-row justify-center items-center '>
                    <Tag onClick={handleOpenReportModel}  className='w-[45%] text-center bg-blue-600  hover:bg-blue-700 text-white font-medium scalar-card'>View</Tag>
                    <Tag  className='w-[45%] text-center bg-green-600 text-white font-medium hover:bg-green-700 scalar-card'>Download</Tag>
                </div>
            </div>   
  )
}

export default ReportCard