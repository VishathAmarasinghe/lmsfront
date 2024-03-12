const registrationReducer = (state = { registrationData: null }, action) => {
    switch (action.type) {
      case "Register":
        console.log(action?.data);
        return state; 
  
      default:
        return state; 
    }
  };
  

  export default registrationReducer;