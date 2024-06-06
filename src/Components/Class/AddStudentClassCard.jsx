import { Tag, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { classPaymentSelectedClasses, classPaymentSelectedClasspayments } from '../../Actions/payment';
import { useSelector } from 'react-redux';

const AddStudentClassCard = ({ color, classItem,selectedStudent, newSelectedClasses, setNewSelectedClasses, assignType }) => {
    const paymentclassBillArray=useSelector((state)=>state.payment.paymentclassBillArray);
    const dispatch=useDispatch();
    
    const handleClassClicked = () => {
        if(selectedStudent==undefined || selectedStudent==null || selectedStudent==[]){
            message.warning("cannot select classes without selecting a student")
        }else{
            const classItemChecking = newSelectedClasses.find((cls) => cls.classID === classItem.classID);
            console.log("payment selected class  issssss  ",classItemChecking);
            if (!classItemChecking) {
                setNewSelectedClasses([...newSelectedClasses, classItem]);
                
            } else {
                console.log("payment cass bill rray ",paymentclassBillArray);
                const updatedClasses = newSelectedClasses.filter((cls) => cls.classID !== classItem.classID);
                setNewSelectedClasses(updatedClasses);
                const billItemAvailability= paymentclassBillArray.find((cls)=>cls.classID === classItem.classID);
                console.log("Bill item availability        ",billItemAvailability);
                if(billItemAvailability){
                 const updatedBillItem=paymentclassBillArray.filter((cls)=>cls.classID !== classItem.classID);
                 dispatch(classPaymentSelectedClasspayments(updatedBillItem));
                 console.log("updated bill item is  ",updatedBillItem);
                }
            }
        }
       
    };

    useEffect(() => {
        console.log("new selected classes ", newSelectedClasses);
        dispatch(classPaymentSelectedClasses(newSelectedClasses));
    }, [newSelectedClasses]);

    console.log(classItem);
    const isSelected = newSelectedClasses.some((cls) => cls.classID === classItem.classID);
    const shouldApplyColor = assignType !== "assign" && isSelected;

    return (
        <Tag
            onClick={handleClassClicked}
            color={color}
            className={`p-2 my-1 shadow-md h-fit ${shouldApplyColor ? `bg-blue-400 text-white hover:bg-${color}-400 hover:text-white` : `hover:bg-${color}-200 hover:text-black`}`}
        >
            <p>ClassName: {classItem?.ClassName}</p>
            <div className='flex flex-row w-full'>
                <p className='mr-3'> {classItem?.subjectName}</p>
                <p> {classItem?.gradeName}</p>
            </div>
        </Tag>
    );
};

export default AddStudentClassCard;
