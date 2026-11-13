import express from "express";
import { 
    deleteProject, 
    createProject, 
    getProjectById, 
    getProjects, 
    getStarredProjects, 
    toggleStar 
} from "../controllers/projectController.js";


const router = express.Router();

// create project
router.post("/", createProject )
// get all the projects
router.get("/", getProjects)
// get all starred projects
router.get("/starred", getStarredProjects)
// find project by id
router.get("/:id", getProjectById)
// toggle star
router.patch("/:id", toggleStar)
// delete project by id
router.delete("/:id", deleteProject)



export default router