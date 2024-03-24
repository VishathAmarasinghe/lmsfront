import { Tag } from 'antd'
import React from 'react'

const HallCard = ({hall,classData, setClassData}) => {
    const handleHallClick=()=>{
        setClassData({...classData,hallID:hall.hallID})
    }
  return (
    <Tag onClick={handleHallClick} key={hall.hallID} className={`flex flex-row justify-around items-center m-1 p-2 hover:bg-blue-200 ${classData.hallID==hall.hallID?"bg-blue-200":""} `} color='blue'>
        <div className='flex flex-col items-end justify-around'>
        <p className='font-medium text-[15px]'>{hall.hallName}</p>
        </div>
        <div className='b flex flex-col items-center justify-center'>
        <p className='font-medium'>{hall.seatCount} seats</p>
        <p className='font-medium'>{hall.ACtype}</p>
        </div>
        
       
    </Tag>
  )
}

export default HallCard