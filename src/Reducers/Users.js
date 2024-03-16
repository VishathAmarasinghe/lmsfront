const userReducer=(state={pendingUsers:null},action)=>{
    switch (action.type) {
        case "PENDING_USERS":
            return {...state,pendingUsers:action?.data}
        default:
            return state;
    }
}


export default userReducer;