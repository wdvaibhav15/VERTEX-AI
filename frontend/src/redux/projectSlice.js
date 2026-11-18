
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",

  initialState: {
    projects: [],
  },

  reducers: {
    setProjects: (state, action) => {
      state.projects = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    addNewProjects: (state, action) => {
      state.projects.unshift(action.payload);
    },

    startProject: (state, action) => {
      const project = state.projects.find(
        (project) => project._id === action.payload )
        if(project){
          project.started = !project.started
        }
    },

    setDeleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },
  },
});

export const {
  setProjects,
  addNewProjects,
  startProject,
  setDeleteProject,
} = projectSlice.actions;

export default projectSlice.reducer;
