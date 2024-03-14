import { combineReducers } from "redux";
import authReducer from "./authentication";
import registrationReducer from "./registration";


export const reducers=combineReducers({registrationReducer,authReducer});