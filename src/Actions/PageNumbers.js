export const change_page_number=(pageNumber)=>(dispatch)=>{
    dispatch({
        type:"CHANGE_PAGE",
        pageNumber
    })
}

export const change_classsPage=(classPageNumber)=>(dispatch)=>{
    dispatch({
        type:"CLASS_PAGE",
        classPageNumber

        
    })
}