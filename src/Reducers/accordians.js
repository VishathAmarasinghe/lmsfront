const AccordianReducer = (state = { accordians: null }, action) => {
    switch (action.type) {
      case "ACCORDIANS_BY_CLASS_REQUEST":
        return { ...state, loading: true };
      case "ACCORDIANS_BY_CLASS_SUCCESS":
        return { ...state, loading: false, accordians: action.classAccordians };
      case "ACCORDIANS_BY_CLASS_FAILURE":
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default AccordianReducer;