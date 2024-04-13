import React from 'react'
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const PastCardrowComp = ({titleName,value}) => {
  return (
    <div className='w-full flex flex-row justify-start items-center  my-2  '>
        <div className='w-[38%] flex flex-row justify-start items-center '>
            <StarRoundedIcon className='text-[15px] text-[#5B6BD4]'/>
            <p className='font-medium ml-2 text-[15px]'>{titleName}</p>
            <p className='font-medium ml-2 text-[15px]'>:</p>
        </div>
        
        <p className='font-normal ml-1  w-[70%] whitespace-normal break-words'>{value}</p>


    </div>
  )
}

export default PastCardrowComp