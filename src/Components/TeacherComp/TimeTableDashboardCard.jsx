import { Tag } from 'antd'
import React from 'react'

const TimeTableDashboardCard = ({ classData, index }) => {
  console.log("class data ", classData);

  return (
    <div data-aos="fade-up" className='w-full flex flex-col items-center'>
      <Tag color='blue' className={`w-[95%] my-2 p-2 scalar-card ${index === 0 ? "bg-green-600" : ""}`}>
        <div className='w-full flex flex-row justify-between'>
          <p className='font-medium'>{classData?.fullData?.ClassName}</p>
          <p>{classData?.fullData?.StartTime.substring(0, 5)}</p>
          <p>{classData?.fullData?.ClassDay}</p>
        </div>
        <div className='w-full flex flex-row justify-between'>
          <p>{classData?.fullData?.subjectName}</p>
          <p>{classData?.fullData?.gradeName}</p>
        </div>
      </Tag>
    </div>
  )
}

export default TimeTableDashboardCard;
