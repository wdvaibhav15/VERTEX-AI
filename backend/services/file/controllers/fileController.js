import File from "../models/file.model.js";
import { buildTree } from "../utils/buildTree.js";

// create root folder
export const createRootfolder = async (req, res) => {
    try {
        const { projectId, projectName } = req.body;
        const userId = req.headers["x-user-id"];
        if(!projectId || !projectName){
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const existingProject = await File.findOne({
            projectId,
            parentId: null,
            isDeleted: false
        });
        if (existingProject) {
            return res.status(404).json({ message: "Root project already exists" });
        }
        const RootFolder = await File.create({
            owner: userId,
            name: projectName,
            projectId,
            type: "Folder",
            parentId: null
        })
        return res.status(201).json({ message: "Root folder created successfully", RootFolder });
        
    } catch (error) {
        return res.status(500).json({ message: `create root folder error ${error}` });
    }
};

//  create normal folder
export const createFolder = async (req, res) => {
    try {
        const { projectId, parentId, name } = req.body;
        const userId = req.headers["x-user-id"];
        if(!projectId || !parentId || !name){
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const existingFolder = await File.findOne({
            projectId,
            parentId,
            name,
            isDeleted: false
        });
        if (existingFolder) {
            return res.status(404).json({ message: "Folder already exists" });
        }
        const folder = await File.create({
            owner: userId,
            name,
            projectId,
            type: "Folder",
            parentId
        })
        return res.status(201).json({ message: "Folder created successfully", folder });
        
    } catch (error) {
        return res.status(500).json({ message: `create folder error ${error}` });
    }
};

// create normal files
export const createFile = async (req, res) => {
    try {
        const { projectId, parentId, name, content="", language="plaintext" } = req.body;
        const userId = req.headers["x-user-id"];
        if(!projectId || !parentId || !name){
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const existingFile = await File.findOne({
            projectId,
            parentId,
            name,
            isDeleted: false
        });
        if (existingFile) {
            return res.status(404).json({ message: "File already exists" });
        }
        const extension = name.includes(".") ? name.split(".")[1].pop() : "";
        const file = await File.create({
            owner: userId,
            name,
            projectId,
            language,
            content,
            extension,
            size: content.length,
            type: "File",
            parentId: parentId || null
        })
        return res.status(201).json({ message: "File created successfully", file });
        
    } catch (error) {
        return res.status(500).json({ message: `create file error ${error}` });
    }
};

// update name or content of the file
export const updateFile = async (req, res) => {
    try {
        const { name, content } = req.body;
        const userId = req.headers["x-user-id"];
        const { id } = req.params;
        
        const file = await File.findOne({
            _id: id,
            owner: userId,
            isDeleted: false
        });
        if(!file){
            return res.status(404).json({ message: "File not found" });
        }

        if(name){
            const extenssion = name.includes(".") ? name.split(".")[1].pop() : "";
            file.name = name;
            await file.save();
            return res.status(200).json({ message: "File name updated successfully", file });
        }
        if(content !== undefined){
            file.content = content;
            file.size = content.length;
            await file.save();
            return res.status(200).json({ message: "File content updated successfully", file });
        }
        
        
    } catch (error) {
        return res.status(500).json({ message: `update file error ${error}` });
    }
};

// delete file
export const deleteFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const file = await File.findByIdAndUpdate(req.params.id, { isDeleted: true });
        if(!file){
            return res.status(404).json({ message: "File not found" });
        }
        
        await file.save();
        return res.status(200).json({ message: "File deleted successfully", file });
        
    } catch (error) {
        return res.status(500).json({ message: `delete file error ${error}` });
    }
};

// get folder/file by id
export const getFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const file = await File.findOne({
            _id: req.params.id,
            owner: userId,
            isDeleted: false
        });
        if(!file){
            return res.status(404).json({ message: "File not found" });
        }
        return res.status(200).json({ message: "File fetched successfully", file });
        
    } catch (error) {
        return res.status(500).json({ message: `get file error ${error}` });
    }
}

// get a complete tree
export const getTree = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { projectId } = req.params
        const files = await File.find({ 
            projectId, 
            owner: userId, 
            isDeleted: false 
        }).sort({ 
            name: 1,
            type: -1,
         });
         const tree = await buildTree(files);
         if(!tree){
             return res.status(404).json({ message: "Tree not found" });
         }
         return res.status(200).json({ message: "Tree fetched successfully", tree });
    } catch (error) {
        return res.status(500).json({ message: `get tree error ${error}` });
}
}