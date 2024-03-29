import { FileZipOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react'

const SubmissionPanalCard = ({submission,mainMaterial}) => {
    const date = new Date(mainMaterial.uploadDate);
    const dateString = date.toISOString().split('T')[0];

    const closeDate = new Date(submission.subCloseDate);
    const closeDateString = closeDate.toISOString().split('T')[0];
  return (
    <Tag className='w-full flex flex-row my-2 hover:bg-yellow-600 hover:text-white ' color='yellow'>
        <div className=' p-2'>
            <div className='bg-yellow-600 p-2  rounded-xl'>
            <FileZipOutlined className='text-[25px] text-white' />
            </div>
        </div>
        <div className='flex flex-row justify-between items-center w-full ml-3 hover:text-white'>
            <div className='flex flex-col'>
            <h1 className='text-[20px] font-medium'>{submission.subPanelName}</h1>
            <div className='flex flex-row'>
                <p className='text-[10px] mr-4'>Upload Date: {dateString}</p>
                <p className='text-[10px]'>Upload Time: {mainMaterial.uploadTime}</p>
            </div>
            </div>
            <div className='flex flex-col'>
            <p className='text-[10px] mr-4'>Due Date: {closeDateString}</p>
                <p className='text-[10px]'>Due Time: {submission.subCloseTime}</p>
            </div>    
        </div>
    </Tag>
  )
}

export default SubmissionPanalCard