import { Tag } from 'antd'
import React from 'react'

const HallCard = () => {
  return (
    <Tag className='flex flex-col justify-center items-center m-1 p-2 hover:bg-purple-200 ' color='magenta'>
        <p className='font-medium text-[15px]'>Hall No</p>
        <p>34 Seats</p>
        <p>AC</p>
    </Tag>
  )
}

export default HallCard