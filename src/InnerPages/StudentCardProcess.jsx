import { ConfigProvider, Segmented, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getHandoveredCards, getNotHandoveredCards } from '../API';
import StudentCardTablePending from '../Components/Staff/StudentCardTablePending';
import StudentCardTableIssued from '../Components/Staff/StudentCardTableIssued';
import LoadingInnerPage from './LoadingInnerPage';

const StudentCardProcess = () => {
    const [pastCards,setPastCards]=useState([]);
    const [pendingCards,setPendingCards]=useState([]);
    const [loading,setLoading]=useState(true);
    const [selectedSegment,setSelectedSegment]=useState("New Cards")

    useEffect(()=>{
        if (selectedSegment=="New Cards") {
            fetchPendingStudentCards();
        }else if(selectedSegment=="Issued Cards"){
            fetchHandOveredStudentCards();
        }
        
    },[selectedSegment])




    const fetchPendingStudentCards=async()=>{
        try {
            setLoading(true);
            const cardDetails=await getNotHandoveredCards();
            console.log("card details pending ",cardDetails);
            const cardDetailsArray=cardDetails?.data?.map((card)=>({
                ...card,
                key:card.UserID

            }))
            setLoading(false)
            setPendingCards(cardDetailsArray);
        } catch (error) {
            console.log("card details fetching error! ",error);
            message.error("Card details fetching error!")
        }
    }



    const fetchHandOveredStudentCards=async()=>{
        try {
            setLoading(true)
            const pastCardDetails=await getHandoveredCards();
            setPastCards(pastCardDetails.data);
            setLoading(false)
        } catch (error) {
            console.log("card details fetching error! ",error);
            message.error("Card details fetching error!")
        }
    }



    const handleSegmentChange=(value)=>{
        if (value=="New Cards") {
            setSelectedSegment("New Cards")
        }else if(value=="Issued Cards"){
            setSelectedSegment("Issued Cards");
        }

    }

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
    <div className="w-full">
      <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
        Student Cards
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
              options={["New Cards","Issued Cards"]}
              defaultChecked="New Cards"
              onChange={handleSegmentChange}
            />
          </ConfigProvider>
          {
            loading?<LoadingInnerPage/>:
            selectedSegment=="Issued Cards"?<StudentCardTableIssued pastCards={pastCards}/>:<StudentCardTablePending pendingCards={pendingCards}/>
          }
      

       
      </div>
      
    </div>
  </div>
  )
}

export default StudentCardProcess