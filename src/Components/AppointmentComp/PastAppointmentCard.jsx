import React from 'react'
import PastCardrowComp from './PastCardrowComp'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { pastcomp1,pastcomp2,pastcomp3,pastcomp4,pastcomp5,pastcomp6 } from '../../assets'

const PastAppointmentCard = () => {
  return (
    <div className='w-[95%] flex flex-col md:flex-row  mt-4  bg-[#EBEEFF] rounded-2xl p-3 shadow-xl'>
        <div className=' w-full md:w-[40%]  mr-2'>
            <PastCardrowComp titleName={"Student Name"} icon={pastcomp1}/>
            <PastCardrowComp titleName={"Teacher Name"} icon={pastcomp2}/>
            <PastCardrowComp titleName={"Note"} icon={pastcomp3}/>
        </div>
        <div className=' w-full md:w-[40%]  border-[#5B6BD4] border-r-2 border-l-0 pr-3'>
            <PastCardrowComp titleName={"Student Name"} icon={pastcomp4}/>
            <PastCardrowComp titleName={"Teacher Name"} icon={pastcomp5}/>
            <PastCardrowComp titleName={"Note"} icon={pastcomp6}/>
        </div>
        <div className=' w-full md:w-[20%]  mr-2 flex flex-row md:flex-col  justify-center items-center'>


            <div className='flex flex-row w-[50%] justify-center items-center mb-3'>
               
                <CheckCircleRoundedIcon sx={{color:"green"}}/>
                <p className='text-[15px]'>Finished</p>
                
            </div>
            <button className='bg-[#5B6BD4] hover:text-white font-inter font-semibold p-1  rounded-2xl'>
                <DeleteForeverRoundedIcon/>
            </button>
        </div>

    </div>
  )
}

export default PastAppointmentCard