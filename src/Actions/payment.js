export const classPaymentSelectedClasses=(classArray)=>(dispatch)=>{
    dispatch({
        type:"CLASS_PAYMENT_SELECTED_CLASSES",
        classes:classArray
    })
}


export const classPaymentSelectedClasspayments=(classArray)=>(dispatch)=>{
    dispatch({
        type:"CLASS_PAYMENT_SELECTED_CLASSES_TOBILL",
        classes:classArray
    })
}