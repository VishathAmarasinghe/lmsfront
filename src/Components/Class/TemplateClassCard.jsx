import { Tag } from 'antd'
import React from 'react'

const TemplateClassCard = ({classItem,selectedClass,setSelectedClass}) => {

    const handleClassClicked=()=>{
        setSelectedClass(classItem?.classID)
    }

  return (
    <Tag
            onClick={handleClassClicked}
            color="blue"
            className={`p-2 my-1 shadow-md h-fit ${selectedClass==classItem?.classID?"bg-blue-500 text-white":""}`}
        >
            <p>ClassName: {classItem?.ClassName}</p>
            <div className='flex flex-row w-full'>
                <p className='mr-3'>Subject: {classItem?.subjectName}</p>
                <p>Grade: {classItem?.gradeName}</p>
            </div>
        </Tag>
  )
}

export default TemplateClassCard