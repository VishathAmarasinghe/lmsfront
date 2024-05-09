import React from 'react';
import classCardImage from '../../assets/classCard.jpg';
import classOwnerAvatar from '../../assets/lecturer.jpg';
import { Avatar } from 'antd';
import { Divider } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedClass } from '../../Actions/class';



const ClassCard = ({classinfo}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    console.log("selected class is ",classinfo);


  const classOnclickHandle=()=>{
    dispatch(selectedClass(classinfo))
    console.log("selected class Info ",classinfo);
    navigate(`/class/${classinfo?.classID}`);
    }
  return (
    <div data-aos="zoom-out-right" onClick={classOnclickHandle} className=' w-full md:w-[90%]  shadow-lg hover:shadow-2xl rounded-xl relative scalar-cardsm'>
        <div className='w-full  rounded-xl rounded-bl-none rounded-br-none'>
            <img src={classCardImage} className='bg-cover  w-full h-[120px] rounded-xl rounded-bl-none rounded-br-none' />
        </div>
        <div className='w-full  bg-white '>
            <p className='ml-2 text-[17px] font-semibold font-inter mt-1'>{`${classinfo?.ClassName}`}</p>
            <div className='w-full flex flex-row justify-between '>
            <p className='ml-2 text-[14px] font-semibold font-inter mt-1'>{classinfo?.subjectName}</p>
            <p className='ml-2 text-[11px] font-semibold font-inter mt-1'>{classinfo?.medium} Medium</p>
            </div>
          
            {/* <div className='flex flex-row justify-start items-center ml-2'>
                <Avatar icon={<img src={classOwnerAvatar}/>}/>
                <p className='text-[#ABABAB] my-2 ml-2'>Tutor: <span className='font-semibold'>P.K Rajapajsha</span></p>
            </div> */}

        </div>
        <Divider orientation='horizontal'/>
        <div className='w-full  bg-white flex flex-row'>
            <div className=' w-[50%] flex flex-row justify-center items-center p-2 hover:bg-slate-300'>
                <StarBorderRoundedIcon className='text-[#ABABAB]'/>
                <p className='text-[12px] text-[#ABABAB]'>{classinfo?.gradeName}</p>
            </div>
            <Divider orientation='vertical'/>
            <div className='w-[50%] flex flex-row justify-center items-center hover:bg-slate-300 border-l-2 border-gray-300 p-2'>
                <CalendarMonthRoundedIcon className='text-[#ABABAB]'/>
                <p className='text-[12px] text-[#ABABAB]'>{classinfo?.ClassDay} {classinfo?.StartTime?.substring(0,5)}</p>
            </div>

        </div>
        <Divider orientation='horizontal'/>
        <div className='w-full  flex flex-col justify-center items-center'>
            <button className='w-full p-2 rounded-md bg-white text-blu hover:bg-blue-400'>
                View
            </button>
        </div>
    </div>
  )
}

export default ClassCard