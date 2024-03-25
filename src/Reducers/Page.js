const pageChangingReducers=(state={pageNumber:null,classPageNumber:null},action)=>{
    switch (action.type) {
        case "CHANGE_PAGE":
            return {...state,pageNumber:action.pageNumber};
        case "CLASS_PAGE":
            return {...state,classPageNumber:action.classPageNumber};
        default:
            return state;
    }
}

export default pageChangingReducers;