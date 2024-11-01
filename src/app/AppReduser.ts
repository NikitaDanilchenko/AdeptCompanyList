import {companiesSlice} from "@/entities/companies/index";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    companiesReducer: companiesSlice
})