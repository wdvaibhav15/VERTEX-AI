import redis from "../../../shared/redis/redis.js";
import Project from "../models/project.model.js";

// create project API
export const createProject = async(req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if(!userId){
            return res.status(401).json({message:"unauthorized"});
        }
        const {name,description} = req.body;
        const project = await Project.create({
            owner:userId,
            name,
            description
        });
        // to store in redis
        const key = `projects-${userId}`;
        await redis.del(key);
        return res.status(200).json({message:"project created successfully",project})
    } catch (error) {
        return res.status(500).json({message:`create project error ${error}`})
    }
}

// get all project API
export const getProjects = async(req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if(!userId){
            return res.status(401).json({message:"unauthorized"});
        }
        // to store in redis
        const key = `projects-${userId}`;
        let result = await redis.get(key);
        if(result){
            return res.status(200).json({message:"projects fetched successfully",projects:JSON.parse(result)});
        }
        const projects = await Project.find({owner:userId}).sort({updatedAt:-1});
        if(!projects){
            return res.status(404).json({message:"projects not found"});
        }
        await redis.set(key,JSON.stringify(projects));
        return res.status(200).json({message:"projects fetched successfully",projects})
    } catch (error) {
        return res.status(500).json({message:`get projects error ${error}`})
    }
}

// to get all starredproject API
export const getStarredProjects = async(req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if(!userId){
            return res.status(401).json({message:"unauthorized"});
        }
        // to store in redis
        const key = `starred-projects-${userId}`;
        let result = await redis.get(key);
        if(result){
            return res.status(200).json({message:"projects fetched successfully",projects:JSON.parse(result)});
        }
        const projects = await Project.find({owner:userId,starred:true}).sort({updatedAt:-1});
        if(!projects){
            return res.status(404).json({message:"projects not found"});
        }
        await redis.set(key,JSON.stringify(projects));
        return res.status(200).json({message:"projects fetched successfully",projects})
    } catch (error) {
        return res.status(500).json({message:`get projects error ${error}`})
    }
}

// get project by id API
export const getProjectById = async(req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({message:"project not found"});
        }
        project.lastOpendAt = new Date();
        await project.save()
        return res.status(200).json({message:"project fetched successfully",project})
    } catch (error) {
        return res.status(500).json({message:`get project error ${error}`})
    }
}

// starred or unstar mark API
export const toggleStar = async(req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({message:"project not found"});
        }
        project.starred = !project.starred;
        await project.save();
        const key = `starred-projects-${userId}`;
        await redis.del(key);
        return res.status(200).json({message:"project starred successfully",project})
    } catch (error) {
        return res.status(500).json({message:`star project error ${error}`})
    }
}

// delete project API
export const deleteProject = async(req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        if(!project){
            return res.status(404).json({message:"project not found"});
        }
        const key = `projects-${userId}`;
        await redis.del(key);
        return res.status(200).json({message:"project deleted successfully",project})
    } catch (error) {
        return res.status(500).json({message:`delete project error ${error}`})
    }
}

