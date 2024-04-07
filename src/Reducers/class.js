const classReducer=(state={teacherClasses:null,selectedClass:null,studentAssignedClasses:null,studentClassesNotAvailable:null},action)=>{
    switch (action.type) {
        case "FETCH_TEACHER_CLASSES":
            return {...state,teacherClasses:action.classes};
        case "SELECTED_CLASS":
            return {...state,selectedClass:action.class}
        case "STUDNT_CLASSES":
            return {...state,studentAssignedClasses:action.classes}
        case "STUDNT_CLASSES_NOT_AVAILABLE":
            return {...state,studentClassesNotAvailable:action.classes}
        default:
            return state;
    }
}


export default classReducer;