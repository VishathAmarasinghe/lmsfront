const AppointmentReducer = (state = { createdAppointments: [] }, action) => {
    switch (action.type) {
      case "CREATED_APPOINTMENTS":
        return { ...state, createdAppointments:action.appointments};
     
      default:
        return state;
    }
  };
  
  export default AppointmentReducer;