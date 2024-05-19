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


export const updateUserData=async(updateData)=>{
    try {
        console.log("came here ");
        const {data}=await API.updateParentStudentData(updateData);
        console.log("updation result ",data);
        return data
    } catch (error) {
        return error;
    }
}


export const getUserProfilePicture=async(studentprofileLocation)=>{
    try {
        const {data}=await API.getUserPhoto(studentprofileLocation)
        console.log("data profile  ",data);
        return data;
    } catch (error) {
        console.log("error ",error);
    }
}