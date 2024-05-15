import { jwtDecode } from "jwt-decode";
const authReducer=(state={authData:null},action)=>{
    switch (action.type) {
        case "SIGNIN":
            console.log("data is ",action.data);
            const values=jwtDecode(action?.data?.token);
            console.log("token values is  ",values);
            localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return {...state,authData:action?.data};
        case "LOGOUT":
            localStorage.clear();
            return {...state,authData:null};
        case "CURRENT_USER_UPDATE":
            const userData = JSON.parse(localStorage.getItem("profile"));
            userData.result=action?.data
            localStorage.clear();
            localStorage.setItem("profile",JSON.stringify({...userData}));
            setTimeout(() => {
                window.location.reload();
            }, 2000); 
              
            
            return {...state,authData:action?.data};
        

            
        default:
            return state;
    }
}

export default authReducer;