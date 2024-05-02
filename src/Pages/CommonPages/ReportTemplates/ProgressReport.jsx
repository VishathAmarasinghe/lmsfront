import { ConfigProvider, Descriptions } from 'antd'
import React from 'react'
import OverallPaymentPieChart from '../../../Components/Charts/OverallPaymentPieChart'
import RegistrationPaymentLineChart from '../../../Components/Charts/RegistrationPaymentLineChart'

const ProgressReport = ({ progressReportData,classStatDetails}) => {
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
          children:<p>Rs:{progressReportData?.registrationFee}</p>,
        },
        {
          key: '4',
          label: 'Total Registrations in period',
          children: progressReportData?.registrationFeeDetails?.totalRegistrations,
        },
        {
          key: '5',
          label: 'Income from total Registrations',
          children: progressReportData?.registrationFeeDetails?.totalMonthlyRegFeeIncome  ,
          span: 2,
        },
       
    ]

    const itemsArrayTwo = [
      {
        key: '1',
        label: 'Current Class Fee Total',
        children: classStatDetails?.currentTotalFee,
      },
      {
        key: '2',
        label: 'Total fee To Have',
        children: classStatDetails?.TotalFeeToHave,
      },
      {
        key: '3',
        label: 'Current total teacher fee',
        children: classStatDetails?.TotalCurrentTeachersFee,
      },
      {
        key: '4',
        label: 'Total teacher fee To Have',
        children: classStatDetails?.TotalFeeToHaveTeachers,
      },
      {
        key: '5',
        label: 'Currnet total fee institution having',
        children: classStatDetails?.TotalCurrentFeeInstitute ,
      },
      {
        key: '6',
        label: 'Total fee institution to have',
        children: classStatDetails?.TotalFeeToHaveInstitute,
      },
      
    ]



  return (
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
    <div className="w-full border-2 flex flex-col items-center border-red-600">
        <div className="w-full  bg-slate-300">
            <h1 className="font-bold text-[17px] text-center">Progress Report</h1>
            <p className="text-center text-[15px]">Savitha Education Institute</p>
        </div>
        <div className='w-[90%] mt-3'>
        
      <Descriptions
      className="shadow-md bg-slate-50 p-2"
        labelStyle={{ fontWeight: "bold" }}
        layout="horizontal"
        bordered
        items={items}
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      />
      

        </div>
        <div className='w-[90%] h-[250px]'>
          <p>Registration Payment Variation by date</p>
          <div className='w-full h-full' >
            <RegistrationPaymentLineChart  chartData={progressReportData?.registrationFeeDetails?.chartData[0]}/>
          </div>
        </div>
        <div className='w-[90%]'>
        <Descriptions
      className="shadow-md bg-slate-50 p-2"
        labelStyle={{ fontWeight: "bold" }}
        layout="horizontal"
        bordered
        items={itemsArrayTwo}
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      />
        </div>
        <div>
          
        </div>

       

    </div>
    </ConfigProvider>
  )
}

export default ProgressReport