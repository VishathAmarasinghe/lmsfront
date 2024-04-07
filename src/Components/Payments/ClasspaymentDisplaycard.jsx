import { DatePicker, Select, Tag } from 'antd'
import React from 'react'
const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
  


const ClasspaymentDisplaycard = ({payment,currentMonth}) => {
   

  return (
    <div className=' flex flex-row justify-around items-center p-2'>
        <Tag className='w-[30%] p-1 flex flex-col items-center'   color='geekblue'>
            {payment?.classID} {payment?.ClassName?.substring(0, 10)}
        </Tag>
        <Select className='w-[30%] h-[30px]' defaultValue={currentMonth} options={months}/>
        <p className='w-[20%] ml-3  text-[14px] font-semibold' >
            Rs:{payment?.classFee}
        </p>
        
    </div>
  )
}

export default ClasspaymentDisplaycard