import React, { useEffect, useState } from 'react'
import { getAllHalls } from '../API';
import { message } from 'antd';
import LoadingInnerPage from './LoadingInnerPage';
import HallTable from '../Components/Owner/HallTable';
import HallDataEditingDrawer from '../Components/Owner/HallDataEditingDrawer';

const OwnerHallInfoPage = () => {
  const [hallDrawerOpen,setHallDrawerOpen]=useState({
    openState:false,
    task:"new"
  });
  const [hallData,setHallData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [selectedHall,setSelectedHall]=useState([]);


  useEffect(()=>{
    fetchHallInfomation();
  },[])



  const fetchHallInfomation=async()=>{
    try {
      
      setLoading(true);
      const hallinfoResult=await getAllHalls();
      const hallArray=hallinfoResult?.data?.map((hall)=>({
        ...hall,
        key:hall.hallID
      }))
      setHallData(hallArray);
      setLoading(false);

    } catch (error) {
      console.log("error ",error);
      message.error("Hall Data Fetching Error!")
    }
    


  }


  const handleNewHallCreation=()=>{
    setHallDrawerOpen({
      openState:true,
      task:"New"
  })
  }


  return (
    <div  className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Hall Information
      </h1>
    </div>
    
    <div data-aos="fade-right" className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      
      <div className='w-[95%] mt-2 overflow-y-auto '>
        <div className='w-full'>
          <button onClick={handleNewHallCreation} className='bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 p-2'>+ Add New Hall</button>
        </div>
          {
            loading?<LoadingInnerPage/>:<HallTable selectedHall={selectedHall} setSelectedHall={setSelectedHall} hallDrawerOpen={hallDrawerOpen} setHallDrawerOpen={setHallDrawerOpen} hallData={hallData}/>
          }
      </div>
      <HallDataEditingDrawer fetchHallInfomation={fetchHallInfomation} selectedHall={selectedHall} setSelectedHall={setSelectedHall}  hallDrawerOpen={hallDrawerOpen} setHallDrawerOpen={setHallDrawerOpen}/>
      
    </div>
  </div>
  )
}

export default OwnerHallInfoPage