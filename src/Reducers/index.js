import { combineReducers } from "redux";
import authReducer from "./authentication";
import registrationReducer from "./registration";
import userReducer from "./Users";
import pageChangingReducers from "./Page";
import registrationBillReducer from "./registrationBill";


export const reducers=combineReducers({studentRegistration:registrationReducer,
    aithenticatedUser:authReducer,
    users:userReducer,
    page:pageChangingReducers,
    registrationBillInfo:registrationBillReducer
});