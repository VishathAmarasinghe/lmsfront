const classReducer=(state={teacherClasses:null,selectedClass:null},action)=>{
    switch (action.type) {
        case "FETCH_TEACHER_CLASSES":
            return {...state,teacherClasses:action.classes};
        case "SELECTED_CLASS":
            return {...state,selectedClass:action.class}
        default:
            return state;
    }
}


export default classReducer;