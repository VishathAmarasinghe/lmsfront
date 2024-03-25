import { combineReducers } from "redux";
import authReducer from "./authentication";
import registrationReducer from "./registration";
import userReducer from "./Users";
import pageChangingReducers from "./Page";
import registrationBillReducer from "./registrationBill";
import classReducer from "./class";
import AccordianReducer from "./accordians";


export const reducers=combineReducers({studentRegistration:registrationReducer,
    aithenticatedUser:authReducer,
    users:userReducer,
    page:pageChangingReducers,
    registrationBillInfo:registrationBillReducer,
    classes:classReducer,
    accordians:AccordianReducer
});