import { api } from "../utils/axios";

// Create Project API
export const createProject = async ({name, description}) => {
  try {
    const { data } = await api.post("/api/project",{
      name,
      description
    });

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// get Projects API
export const getProjects = async () => {
  try {
    const { data } = await api.get("/api/project");

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// get project by id
export const getProjectById = async (id) => {
  try {
    const { data } = await api.get(`/api/project/${id}`);

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// get starred project 
export const getStarredProjects = async () => {
  try {
    const { data } = await api.get("/api/project/starred");

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// marke starred or remove star
export const toggleStar = async (id) => {
  try {
    const { data } = await api.patch(`/api/project/${id}`);

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// delete project by id
export const deleteProject = async (id) => {
  try {
    const { data } = await api.delete(`/api/project/${id}`);

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};
