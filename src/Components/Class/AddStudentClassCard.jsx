import { Tag, message } from 'antd';
import React, { useEffect } from 'react';

const AddStudentClassCard = ({ color, classItem,selectedStudent, newSelectedClasses, setNewSelectedClasses, assignType }) => {
    const handleClassClicked = () => {
        if(selectedStudent==undefined || selectedStudent==null || selectedStudent==[]){
            message.warning("cannot select classes without selecting a student")
        }else{
            const classItemChecking = newSelectedClasses.find((cls) => cls.classID === classItem.classID);
            if (!classItemChecking) {
                setNewSelectedClasses([...newSelectedClasses, classItem]);
            } else {
                const updatedClasses = newSelectedClasses.filter((cls) => cls.classID !== classItem.classID);
                setNewSelectedClasses(updatedClasses);
            }
        }
       
    };

    useEffect(() => {
        console.log("new selected classes ", newSelectedClasses);
    }, [newSelectedClasses]);

    console.log(classItem);
    const isSelected = newSelectedClasses.some((cls) => cls.classID === classItem.classID);
    const shouldApplyColor = assignType !== "assign" && isSelected;

    return (
        <Tag
            onClick={handleClassClicked}
            color={color}
            className={`p-2 my-1 h-fit ${shouldApplyColor ? `bg-blue-400 text-white hover:bg-${color}-400 hover:text-white` : `hover:bg-${color}-200 hover:text-black`}`}
        >
            <p>ClassName: {classItem?.ClassName}</p>
            <div className='flex flex-row w-full'>
                <p className='mr-3'>Subject: {classItem?.Subject}</p>
                <p>Grade: {classItem?.Grade}</p>
            </div>
        </Tag>
    );
};

export default AddStudentClassCard;
