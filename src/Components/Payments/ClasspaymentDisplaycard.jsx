import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Tag } from 'antd';

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

const ClasspaymentDisplaycard = ({ payment, currentMonth, paymentFinalizedClasses, setPaymentFinalizedClasses }) => {
  const [selectedMonth, setSelectedMonth] = useState(parseInt(payment.month));

  useEffect(() => {
    setSelectedMonth(parseInt(payment.month));
  }, [payment.month]);

  const monthOptions = months.map(month => ({
    value: month.value,
    label: month.label
  }));

  const handlingMonth = (value) => {
    console.log("Selected month value is ", value);
    const updatedPayment = {
      ...payment,
      month: String(value)
    };

    const updatedPaymentFinalizedClasses = paymentFinalizedClasses.map(paymentRow => {
      if (paymentRow.classID === payment.classID && paymentRow.month === payment.month) {
        return updatedPayment;
      }
      return paymentRow;
    });

    setPaymentFinalizedClasses(updatedPaymentFinalizedClasses);
    setSelectedMonth(value);
  };

  return (
    <div className='flex flex-row justify-around items-center p-2'>
      <Tag className='w-[30%] p-1 flex flex-col items-center' color='geekblue'>
        {payment?.classID} {payment?.ClassName?.substring(0, 10)}
      </Tag>
      <Select
        className='w-[30%] h-[30px]'
        onChange={handlingMonth}
        value={selectedMonth}
        options={monthOptions}
      />
      <p className='w-[20%] ml-3 text-[14px] font-semibold'>
        Rs: {payment?.classFee}
      </p>
    </div>
  );
};

export default ClasspaymentDisplaycard;
