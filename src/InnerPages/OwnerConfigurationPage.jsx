import { ConfigProvider, Segmented } from 'antd'
import React, { useState } from 'react'
import LoadingInnerPage from './LoadingInnerPage'
import RegistrationConfigPage from '../Components/Configurations/RegistrationConfigPage';

const OwnerConfigurationPage = () => {
    const [selectedSegment,setSelectedSegment]=useState("Registration fee");
    const [loading,setLoading]=useState(false);

    const handleSegmentChange=(value)=>{
        setSelectedSegment(value);
    }







  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Configuration Settings
      </h1>
    </div>

    <div data-aos="fade-right" className="w-[95%]   bg-white h-[90%]  flex flex-col lg:flex-col overflow-y-auto items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300">
      <div className=" w-[95%] mt-4 mb-2 ">
      <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemSelectedBg:"rgb(59 130 246)",
                  itemSelectedColor:"white"
                },
              },
            }}
          >
            <Segmented
              options={["Registration fee","Issued Cards"]}
              defaultChecked="Registration fee"
              onChange={handleSegmentChange}
            />
          </ConfigProvider>
          {
            loading?<LoadingInnerPage/>:
            selectedSegment=="Registration fee"?<RegistrationConfigPage/>:<></>
          }
      

       
      </div>
      
    </div>
  </div>
  )
}

export default OwnerConfigurationPage