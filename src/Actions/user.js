import * as API from '../API/index';

export const get_pending_confirmed_students=()=>async(dispatch)=>{
    try {
        const {data}=await API.get_pending_confirmed_users();
        console.log("peding users are ",data);
        dispatch({
            type:"PENDING_USERS",
            data
        })
    } catch (error) {
        console.log("dataFetchingError confirmed and pending users ",error);
    }

}

export const get_parents_byStudents=async(studentID)=>{
    try {
        console.log("requested Student ID is ",studentID);
        const {data}=await API.get_parent_details_according_to_Student(studentID);
        console.log("received parent data ",data);
        return data;
    } catch (error) {
        console.log("parents getting error ",error);
        return [];
    }
}