import { Tag } from 'antd'
import React from 'react'

const HallCard = ({hall}) => {
  return (
    <Tag key={hall.hallID} className='flex flex-col justify-center items-center m-1 p-2 hover:bg-purple-200 ' color='magenta'>
        <p className='font-medium text-[15px]'>{hall.hallName}</p>
        <p>{hall.seatCount} seats</p>
        <p>{hall.ACtype}</p>
    </Tag>
  )
}

export default HallCard