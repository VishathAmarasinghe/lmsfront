const registrationBillReducer=(state={registrationBillInfo:null},action)=>{
    switch (action.type) {
        case "REGISTRATION_BILL_INFO":
            return {...state,registrationBillInfo:action.billdata};
    
        default:
            return state;
    }
}

export default registrationBillReducer;