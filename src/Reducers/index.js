import { combineReducers } from "redux";
import authReducer from "./authentication";

export const reducers=combineReducers({authReducer});