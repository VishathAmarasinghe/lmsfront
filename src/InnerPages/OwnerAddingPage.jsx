import React, { useEffect, useState } from 'react'
import { getAllOwners } from '../API';
import OwnerTable from '../Components/Owner/OwnerTable';
import LoadingInnerPage from './LoadingInnerPage';
import { message } from 'antd';
import OwnerProfileEditingDrawer from '../Components/Owner/OwnerProfileEditingDrawer';

const OwnerAddingPage = () => {
    const [ownerData,setOwnerData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [ownerAddingModelOpen,setOwnerAddingModelOpen]=useState({status:false,task:"Create"});


    useEffect(()=>{
        fetchOwnerInfo();
    },[])


    const handleOpenOwnerAddingDrawer=()=>{
        setOwnerAddingModelOpen({status:true,task:"Create"});
    }





    
  const fetchOwnerInfo=async()=>{
    setLoading(true);
    try {

      const ownerResult=await getAllOwners();
      console.log("teacher result ",ownerResult.data);
      const ownerDataArray = ownerResult.data.map((owner) => ({
        ...owner,
        key:owner?.UserID,
        photoName: `${owner.photo})${owner.firstName}`,

      }));
      
      console.log("Owner Array ",ownerDataArray);
      setOwnerData(ownerDataArray);
      setLoading(false);

    } catch (error) {
      console.log("error ",error);
      message.error("Teacher Data fetching Error!")
    }
  }



  return (
    <div  className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
        <OwnerProfileEditingDrawer fetchOwnerInfo={fetchOwnerInfo} ownerStatus={"owner"} openeditingDrawer={ownerAddingModelOpen} setOpeneditingDrawer={setOwnerAddingModelOpen}/>
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Owner/Admin Information
      </h1>
    </div>
    
    <div data-aos="fade-right" className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
    
      <div className='w-[95%] h-full mt-3  overflow-y-auto '>
        <div className='w-full mb-2'>
          <button onClick={handleOpenOwnerAddingDrawer}  className='bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 px-2 p-1'>+ Add New Admin/Owner</button>
        </div>
          {
            loading?<LoadingInnerPage/>:<OwnerTable fetchOwnerInfo={fetchOwnerInfo} ownerData={ownerData}/>
          }
      </div>
      
      
      
    </div>
  </div>
  )
}

export default OwnerAddingPage