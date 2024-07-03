import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";


const rootReducer = combineReducers({   
    auth: authReducer,
    // Add your reducers here
});

export default rootReducer;