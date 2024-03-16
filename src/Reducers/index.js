import { combineReducers } from "redux";
import authReducer from "./authentication";
import registrationReducer from "./registration";
import userReducer from "./Users";


export const reducers=combineReducers({studentRegistration:registrationReducer,
    aithenticatedUser:authReducer,
    users:userReducer});