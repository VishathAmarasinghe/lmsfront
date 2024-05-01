import { ConfigProvider, Descriptions } from 'antd'
import React from 'react'
import OverallPaymentPieChart from '../../../Components/Charts/OverallPaymentPieChart'

const ProgressReport = ({ progressReportData}) => {
    const genderChartValues=[
        {
            name:"Male",
            value:progressReportData?.studentGender?.male 
        },
        {
            name:"Female",
            value:progressReportData?.studentGender?.female 
        },
    ]
    const items = [
        {
          key: '1',
          label: 'Total Number of students',
          children: progressReportData?.activatedStudents,
        },
        {
          key: '2',
          label: 'Total No of New Students',
          children: progressReportData?.newStudents,
        },
        {
            key: '2',
            label: 'Student Gender Variation',
            children: <div className='w-[40%] h-[150px]'>
                <OverallPaymentPieChart chartData={genderChartValues}/>
                </div>
        },

        {
          key: '3',
          label: 'Current Registration Fee',
          children: 'YES',
        },
        {
          key: '4',
          label: 'Total Registrations in period',
          children: '2018-04-24 18:00:00',
        },
        {
          key: '5',
          label: 'Income from total Registrations',
          children: '2019-04-24 18:00:00',
          span: 2,
        },
        {
          key: '7',
          label: 'Total Teacher payment to do',
          children: '$80.00',
        }
    ]



  return (
    <div className="w-full border-2 flex flex-col items-center border-red-600">
        <div className="w-full  bg-slate-300">
            <h1 className="font-bold text-[17px] text-center">Progress Report</h1>
            <p className="text-center text-[15px]">Savitha Education Institute</p>
        </div>
        <div className='w-[90%] mt-3'>
        <ConfigProvider
  theme={{
    components: {
      Descriptions: {
        labelBg:"#EBEEFF",
        controlItemBgActive:"#EBEEFF",
        contentBg:"#EBEEFF",
      
        
      },
    },
  }}
>
      <Descriptions
      className="shadow-md bg-slate-50 p-2"
        labelStyle={{ fontWeight: "bold" }}
        layout="horizontal"
        bordered
        items={items}
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      />
      </ConfigProvider>

        </div>
        

    </div>
  )
}

export default ProgressReport