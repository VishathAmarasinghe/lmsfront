import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import LoadingInnerPage from './LoadingInnerPage'
import { PlusOutlined } from '@ant-design/icons'
import { getAllStaffInfo, getAllTeachersInfo } from '../API'
import StaffTable from '../Components/Staff/StaffTable'

const OwnerPageStaffPanel = () => {
  const [loading,setLoading]=useState(true);
  const [staffData,setStaffData]=useState([]);
  const [openeditingDrawer, setOpeneditingDrawer] = useState({
    status:false,
    task:""
  });


  useEffect(()=>{
    if(openeditingDrawer.status==false){
      fetchTeacherInfo();
    }
   
  },[openeditingDrawer])


  const fetchTeacherInfo=async()=>{
    setLoading(true);
    try {

      const staffResult=await getAllStaffInfo();
      console.log("teacher result ",staffResult.data);
      const staffDataArray = staffResult.data.map((staff) => ({
        ...staff,
        photoName: `${staff.photo})${staff.firstName}`,

      }));
      
      console.log("Staff Array ",staffDataArray);
      setStaffData(staffDataArray);
      setLoading(false);

    } catch (error) {
      console.log("error ",error);
      message.error("Teacher Data fetching Error!")
    }
  }


  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Staff Panel
      </h1>
    </div>

    <div className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className=" w-full mt-4 mb-2">
     
        <Button
          onClick={()=>setOpeneditingDrawer({...openeditingDrawer,status:true,task:"Create"})}
          className="flex flex-row justify-center items-center bg-blue-500 text-white font-medium ml-7 p-2 hover:bg-blue-600"
        >
          <PlusOutlined />
          
          Add New Staff
        </Button>
      </div>
      <div className=" overflow-y-auto h-[90%] w-[95%]">
        {
          loading?<LoadingInnerPage/>:<StaffTable openeditingDrawer={openeditingDrawer} setOpeneditingDrawer={setOpeneditingDrawer}  StaffData={staffData} setStaffData={setStaffData}/>
          
        }
          
      </div>
    </div>
  </div>
  )
}


export default OwnerPageStaffPanel;