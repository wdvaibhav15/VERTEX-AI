import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import projectSlice from "./projectSlice.js";
export const store = configureStore({
    reducer:{
       user: userSlice ,
       project: projectSlice
    }
})

