const pageChangingReducers=(state={pageNumber:null},action)=>{
    switch (action.type) {
        case "CHANGE_PAGE":
            return {...state,pageNumber:action.pageNumber};
        default:
            return state;
    }
}

export default pageChangingReducers;