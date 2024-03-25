
const AccordianReducer=(state={accordians:null},action)=>{
    switch (action.type) {
        case "ACCORDIANS_BY_CLASS":
            return {...state,accordians:action.classAccordians};
        default:
            return state;
    }
}

export default AccordianReducer;