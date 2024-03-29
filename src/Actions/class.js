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

export const get_classes_by_teacher=(teacherID)=>async(dispatch)=>{
    try {
        const {data}=await API.getClassesByTeacher(teacherID);
        dispatch({
            type:"FETCH_TEACHER_CLASSES",
            classes:data[0]
        })
        console.log("data   ",data[0]);
    } catch (error) {
        console.log("techer detail fetching Error");
    }
}

export const selectedClass=(classData)=>async(dispatch)=>{
    try {
      
        dispatch({
            type:"SELECTED_CLASS",
            class:classData
        })
       
    } catch (error) {
        console.log("class selecting Error");
    }
}

export const createNewAccordian=async(accordianData)=>{
    try {
        const result=await API.newAccordian(accordianData);
        console.log("data of accordian ",result);
        return result;
        
    } catch (error) {
        console.log("accordian Creating Error ",error);

    }
}


export const getAllAccordianByClassID = (classID) => async (dispatch) => {
    try {
      const result = await API.getAccordiansByClass(classID);
      console.log("data of accordian get ", result);
      dispatch({
        type: "ACCORDIANS_BY_CLASS_REQUEST",
      });
      dispatch({
        type: "ACCORDIANS_BY_CLASS_SUCCESS",
        classAccordians: result.data,
      });
      return result;
    } catch (error) {
      console.log("accordian Creating Error ", error);
      dispatch({
        type: "ACCORDIANS_BY_CLASS_FAILURE",
        error: error.message,
      });
    }
  };


  export const getSpecificClass=(classID)=>async(dispatch)=>{
    try {
        const result=await API.getSpecificClass(classID);
        console.log("data of selected Class ",result);
        dispatch({
            type:"SELECTED_CLASS",
            class:result.data
        })
        return result;
        
    } catch (error) {
        console.log("accordian Creating Error ",error);

    }
}
