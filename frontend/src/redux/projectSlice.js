import { createSlice } from "@reduxjs/toolkit"

const projectSlice = createSlice({
    name:"project",
    initialState:{
        projects:[]
    },
    reducers:{
        setProjects:(state,action)=>{
            state.projects = action.payload
        },
        addNewProjects:(state,action)=>{
            state.projects.unshift(action.payload) // push at the end or unshift at the begin
        },
        
    }
})

export const { setProjects, addNewProjects } = projectSlice.actions;
export default projectSlice.reducer

