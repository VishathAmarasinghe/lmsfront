import * as API from '../API/index';

export const get_all_grades=async()=>{
    try {
        const {data}=await API.getAllGrades();
        return data;
    } catch (error) {
        console.log("grades getting error ", error);
        return [];
    }
}


export const get_all_subjects=async()=>{
    try {
        const {data}=await API.getAllsubjects();
        return data;
    } catch (error) {
        console.log("subjects getting error ", error);
        return [];
    }
}




export const get_all_halls=async()=>{
    try {
        const {data}=await API.getAllHalls();
        return data;
    } catch (error) {
        console.log("Halls getting error ", error);
        return [];
    }
}


export const get_classs_with_halls_and_days=async(day,hall)=>{
    try {
        const {data}=await API.getclasswithHalls(day,hall);
        console.log("class comming table ",data);
        return data;
    } catch (error) {
        console.log("class with hall getting error ", error);
        return [];
    }
}

export const newClass=async(classData)=>{
    try {
        const result=await API.newclassCreating(classData);
        console.log("class comming table ",result);
        return result;
    } catch (error) {
        console.log("class creating error ", error);
    }
}