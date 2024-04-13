import React from 'react'
import PastCardrowComp from './PastCardrowComp'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { pastcomp1,pastcomp2,pastcomp3,pastcomp4,pastcomp5,pastcomp6 } from '../../assets'
import { Popconfirm, Tag, message } from 'antd';
import { deleteAppoinment } from '../../API';

const PastAppointmentCard = ({appintment,fetchParentAppointments}) => {
    console.log("appointment details ",appintment);

    const handleDeleteAppointment=async()=>{
        console.log("appointment ID ",appintment?.appointmentID);
        const deleteResult=await deleteAppoinment(appintment?.appointmentID)
        if (deleteResult.status==200) {
            message.success("Appointment Deleted Successfully!")
        }else{
            message.error("Appointment Deletion Error,Please try again later!")
        }
        fetchParentAppointments();

    }
  return (
    <div className='w-[95%] flex flex-col md:flex-row hover:bg-[#ABB7FD]  mt-4  bg-[#EBEEFF] rounded-lg p-3 shadow-md'>
        
        <div className=' w-full md:w-[40%]  mr-2'>
            <PastCardrowComp titleName={"Student Name"} value={appintment?.studentFirstName+" "+appintment?.studentLastName} />
            <PastCardrowComp titleName={"Teacher Name"} value={appintment?.teacherFirstName+" "+appintment?.teacherLastName}  />
            <PastCardrowComp titleName={"Title"} value={appintment?.title} />
            <PastCardrowComp titleName={"Teacher Note"} value={appintment?.teacherNote==null?"No Note":appintment?.teacherNote} />
        </div>
        <div className=' w-full md:w-[40%]  border-[#5B6BD4] border-r-2 border-l-0 pr-3'>
            <PastCardrowComp titleName={"Date & Time"} value={appintment?.date==null && appintment?.time==null?"Not Confirmed":appintment.date+"  "+appintment.time}/>
            <PastCardrowComp titleName={"Publish Date"} value={String(appintment?.appointmentpublishDate).substring(0,10)}/>
            <PastCardrowComp titleName={"Description"} value={appintment?.description} />
        </div>
      
        <div className=' w-full md:w-[20%]    flex flex-row md:flex-col  justify-center items-center'>


            <div className='flex flex-col  w-[80%] justify-center items-center mb-3'>
               
               {
                appintment?.status=="Created"?<Tag color='blue' className='w-full p-2 text-center font-medium'>
                    Not Approved
                </Tag>:appintment?.status=="approved"?<Tag className='p-2' color='green-inverse'>Approved</Tag>:
                appintment?.status=="finished"?<Tag className='p-2' color='yellow-inverse'>Finished</Tag>:<Tag></Tag>
               }
                
            </div>
            <button className=' hover:text-white  w-[80%] font-semibold rounded-2xl'>
                {
                    appintment?.status=="Created"?
                    <Popconfirm
                    title="Delete the Appointment"
                    description="Are you sure to delete this Appointment"
                    onConfirm={handleDeleteAppointment}
                    okButtonProps={{ className: "bg-blue-500 text-white hover:bg-blue-600" }}
                    okText="Yes"
                    cancelText="No"
  >

                    <Tag  color='red' className='w-full p-2 hover:text-white text-center hover:bg-red-500 font-medium'>Delete</Tag>
                    </Popconfirm>
                    :<Tag></Tag>
                }
            </button>
        </div>

    </div>
  )
}

export default PastAppointmentCard