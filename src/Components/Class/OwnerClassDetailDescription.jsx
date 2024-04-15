import { UserOutlined } from '@ant-design/icons';
import { Descriptions, Statistic } from 'antd';
import React from 'react'

const OwnerClassDetailDescription = ({selectedClass}) => {
    const items = [
        {
          key: '1',
          label: 'Class ID',
          children: selectedClass?.classID,
        },
        {
          key: '2',
          label: 'Class Name',
          children: selectedClass?.ClassName,
        },
        {
          key: '3',
          label: 'Class Mode',
          children: selectedClass?.ClassMode,
        },
        {
          key: '4',
          label: 'Class Day',
          children: selectedClass?.ClassDay[0].toUpperCase()+selectedClass?.ClassDay?.substring(1),
        },
        {
          key: '5',
          label: 'Start Time',
          children: selectedClass?.StartTime,
          
        },
        {
          key: '6',
          label: 'End Time',
          children: selectedClass?.endTime,
          span: 3,
        },
        {
          key: '7',
          label: 'Medium',
          children: selectedClass?.medium,
        },
        {
          key: '8',
          label: 'Subject',
          children: selectedClass?.subjectName,
        },
        {
          key: '9',
          label: 'Grade',
          children: selectedClass?.gradeName,
        },
        {
            key: '10',
            label: 'Class Fee',
            children:<p>Rs: {selectedClass?.classFee}/=</p>,
        },
        {
            key: '11',
            label: 'Class Statistics',
            children:
            <div className='w-full flex flex-row justify-around'>
                <Statistic  className='border-2 border-[#5B6BD4] hover:bg-[#CBD3FF]  w-[45%] text-center p-2 bg-[#EBEEFF] font-medium rounded-md' valueStyle={{textAlign:"center"}} prefix={<UserOutlined />}  title="Student Count" value={selectedClass?.students.length}/>
                <Statistic className='border-2 border-[#5B6BD4] hover:bg-[#CBD3FF] w-[45%] text-center p-2 bg-[#EBEEFF] font-medium rounded-md' valueStyle={{textAlign:"center"}} prefix={<UserOutlined />} title="Teacher Count" value={selectedClass?.teachers.length}/>
            </div>,
        },
        
      ];


      const hallInfo=[
        {
            key: '1',
            label: 'Hall ID',
            children: selectedClass?.hallID,
          },
          {
            key: '2',
            label: 'Hall Name',
            children: selectedClass?.hallName,
          },
          {
            key: '3',
            label: 'Seat Count',
            children: selectedClass?.seatCount,
          },
          {
            key: '4',
            label: 'AC Type',
            children: selectedClass?.ACtype,
          },

      ]
  return (
    <div>
        <Descriptions labelStyle={{fontWeight:"bold"}}  bordered items={items} />
        <Descriptions labelStyle={{fontWeight:"bold"}} title={<p className='text-[15px]'>Hall Info</p>}  bordered items={hallInfo} />
    </div>
    
  )
}

export default OwnerClassDetailDescription