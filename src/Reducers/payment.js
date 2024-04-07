const paymentReducers=(state={paymentSelectedClass:[],paymentclassBillArray:[]},action)=>{
    switch (action.type) {
        case "CLASS_PAYMENT_SELECTED_CLASSES":
            return {...state,paymentSelectedClass:action.classes};
            
        case "CLASS_PAYMENT_SELECTED_CLASSES_TOBILL":
            return {...state,paymentclassBillArray:action.classes};
        default:
            return state;
    }
}

export default paymentReducers;