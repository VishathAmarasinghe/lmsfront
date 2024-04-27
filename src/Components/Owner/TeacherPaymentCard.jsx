import { ConfigProvider, Descriptions, Empty } from 'antd'
import React from 'react'
import OverallPaymentPieChart from '../Charts/OverallPaymentPieChart';

const TeacherPaymentCard = ({teacherData}) => {

    const innerItems = [
        {
          key: "2",
          label: "User ID / Teacher ID",
          span: 2,
          children: `${teacherData?.teacherData?.UserID} / ${teacherData?.teacherData?.additionalInfo?.teacherID}`,
        },
        {
          key: "3",
          label: "Name",
          span: 2,
          children: `${teacherData?.teacherData?.firstName} ${teacherData?.teacherData?.lastName}`,
        },
        {
          key: "4",
          label: "Email",
          span: 2,
          children: `${teacherData?.teacherData?.email}`,
        },
        {
          key: "5",
          label: "Phone No",
          span: 2,
          children: `${teacherData?.teacherData?.phoneNo}`,
        },
      ];
    
      const InnerDescription = () => {
        return (
          <div>
            <Descriptions
              labelStyle={{ fontWeight: "bold" }}
              // title="User Info"
              layout="horizontal"
              bordered
              items={innerItems}
            />
          </div>
        );
      };
    
      const items = [
        {
          key: "1",
          label: (
            <img
              src={`http://localhost:5000/${teacherData?.teacherData?.photo}`}
              alt="student"
              className="w-[100px] rounded-md"
            />
          ),
          span: 4,
          children: <InnerDescription />,
        },
      ];

      const sumCurrentTotalPayment = teacherData?.classes.reduce((total, current) => {
        return total + current.currentTotalPayment;
    }, 0);


    const fullPaymentAmountToHave = teacherData?.classes.reduce((total, current) => {
        return total + current.fullPayment;
    }, 0);

      const pieChartDataOverall=[
        {
            name:"Current payedAmount",
            value:sumCurrentTotalPayment
        },
        {
            name:"Full amount to pay",
            value:fullPaymentAmountToHave
        }
      ]

      const pieChartDataOverallTeacher=[
        {
            name:"Teacher To pay Amount",
            value:sumCurrentTotalPayment*0.7
        },
        {
            name:"Institute having amount",
            value:sumCurrentTotalPayment*0.3
        }
      ]
      
      return (

       
        <div>
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
            title="User Info"
            layout="horizontal"
            bordered
            items={items}
          />
          </ConfigProvider>
          <div className='w-full border-2 border-gray-200 rounded-lg flex flex-row '>
            <div className='w-[80%] '>
            {
                teacherData?.classes?.map((classData)=>
                <div className='w-full border-b-2  pl-2
                 border-dashed bg-[#EBEEFF] border-gray-400 flex flex-row justify-between'>
                   <div className='flex flex-col  w-[25%]'>
                    <div className='w-full flex flex-row justify-between p-1'>
                    <p className='font-bold'>{classData?.classID}</p>
                    <p>{classData?.classData?.ClassName}</p>
                    </div>
                    <div className='w-full flex flex-row justify-between er p-1'>
                    <p>{classData?.classData?.subjectName}</p>
                    <p >{classData?.classData?.gradeName}</p>
                    </div>
                   </div>
                   <div className='flex flex-col items-center  w-[10%]'>
                    <p>Payed Count</p>
                    <p className='text-[17px] font-bold'>{classData?.payedStudentCount}/{classData?.classTotalCount}</p>
                    
                   </div>
                   <div className='flex flex-col justify-center  w-[30%]'>
                    <p ><span className=''>Current Payed Amount Rs:</span>{classData?.currentTotalPayment}</p>
                    <p><span className=''>Full Amount To Have Rs:</span>{classData?.fullPayment}</p>
                   </div>
                   <div className='flex flex-col justify-center w-[30%] '>
                    <p><span className=''>Current Teacher Payment Amount Rs:</span>{classData?.currentTotalPayment*0.7}</p>
                    <p><span className=''>Current Institute  Amount Rs:</span>{classData?.currentTotalPayment*0.3}</p>
                   </div>
                   
                </div>
            )

            }
            </div>
            <div className='w-[20%] border-l-2 border-dashed border-gray-200 '>
                <div className='w-full h-[50%]'>
                    <OverallPaymentPieChart chartData={pieChartDataOverall}/>
                   
                </div>
                <div className='w-full h-[50%]'>
                    <OverallPaymentPieChart chartData={pieChartDataOverallTeacher}/>
                   
                </div>
                
                
            </div>
          </div>
         
        </div>
      );
}

export default TeacherPaymentCard