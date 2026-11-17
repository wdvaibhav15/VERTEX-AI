
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

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },
  },
});

export const {
  setProjects,
  addNewProjects,
  removeProject,
} = projectSlice.actions;

export default projectSlice.reducer;
