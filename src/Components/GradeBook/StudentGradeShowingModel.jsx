import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message, notification } from 'antd';
import ParentMarksCard from '../ParentProfile/ParentMarksCard';
import { getChartData } from '../../API';
import BarchartComp from '../Charts/BarchartComp';


const StudentGradeShowingModel = ({openGradeShower, setOpenGradeShower,selectedMarks }) => {
  const [chartData,setChartData]=useState([]);


  useEffect(()=>{
    if (openGradeShower==true) {
      fetchDataForCharts();
    }
  },[openGradeShower])


  const handleOk = () => {
    setOpenGradeShower(false);
  };

  const handleCancel = () => {
    setOpenGradeShower(false);
  };

  const fetchDataForCharts=async()=>{
    try {
      const chartResult=await getChartData([selectedMarks?.resultID]);
      console.log("chartResult ",chartResult);
      setChartData(chartResult.data);
    } catch (error) {
      console.log("char data fetching error!");
      message.error("Chart data fetching error!")
    }
  }




  return (
    <Modal
      title="Grade Info"
      width={"60%"}
      open={openGradeShower}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" className='bg-blue-500 hover:bg-blue-600 text-white font-medium' onClick={handleCancel}>
          OK
        </Button>,
      ]}
    >
       <div className='w-full h-full'>
       <div className='w-full  flex flex-col lg:flex-row justify-between items-center mb-4  '>
          <ParentMarksCard TitleText="Latest Result" value={selectedMarks?.mark}/>
          <ParentMarksCard TitleText="Class Rank" value={selectedMarks?.classPlace} studentCount={selectedMarks?.classCount}/>
          <ParentMarksCard TitleText="Highest Mark" value={selectedMarks?.maxMark}/>
        </div>
        <div className='w-full h-[250px]'>
            <BarchartComp chartData={chartData}/>
        </div>
       </div>
    </Modal>
  );
};




export default StudentGradeShowingModel