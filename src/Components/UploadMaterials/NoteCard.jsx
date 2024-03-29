import { FileTextOutlined,DeleteOutlined } from '@ant-design/icons'
import { Tag, message } from 'antd'
import React from 'react'
import { deleteNotewithMaterial } from '../../API';
import { useDispatch } from 'react-redux';
import { getAllAccordianByClassID } from '../../Actions/class';
import { useParams } from 'react-router-dom';

const NoteCard = ({note,mainMaterial}) => {
    const date = new Date(mainMaterial.uploadDate);
    const dateString = date.toISOString().split('T')[0];
    const {classID}=useParams();

    const dispatch=useDispatch();
    const handleNoteDelete=async()=>{
        const noteData={
            noteID:note.noteID,
            materialID:note.materialID,
            fileLocation:note.noteLocation
        }
        console.log("note data ",noteData);
        const deleteResult=await deleteNotewithMaterial(noteData);
        if (deleteResult.status==200) {
            message.success("note Deleted")
        }else{
            message.error("cannot delete note")
        }
        dispatch(getAllAccordianByClassID(classID))
    }
  return (
    <Tag className='w-full flex flex-row my-2 hover:bg-green-600 hover:text-white ' color='green'>
        <div className=' p-2'>
            <div className='bg-green-600 p-2  rounded-xl'>
            <FileTextOutlined className='text-[25px] text-white' />
            </div>
        </div>
        <div className='flex flex-row w-full justify-between items-center ml-3 hover:text-white'>
            <div className='flex flex-col'>
            <h1 className='text-[20px] font-medium'>{note.noteName}</h1>
            <div className='flex flex-row'>
                <p className='text-[10px] mr-4'>Upload Date: {dateString}</p>
                <p className='text-[10px]'>Upload Time: {mainMaterial.uploadTime}</p>
            </div>
            </div>
            <div className='p-4 '>
                <button onClick={handleNoteDelete}>
                 <DeleteOutlined className='hover:bg-white p-1 rounded-lg hover:text-black' />
                </button>
           
            </div>
        </div>
    </Tag>
  )
}

export default NoteCard