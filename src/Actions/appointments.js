import { getCreatedAppointmentsRelatedToTeacher } from "../API";

export const setPendingAppointments=(teacherID)=>async(dispatch)=>{

    try {
        const appointmentResult=await getCreatedAppointmentsRelatedToTeacher(teacherID);
        dispatch({
            type:"CREATED_APPOINTMENTS",
            appointments:appointmentResult.data
        })
    } catch (error) {
        console.log("created Appointments fetching Error",error);
    }
    
}