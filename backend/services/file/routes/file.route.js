import express from "express";
import { createFile, createFolder, createRootfolder, deleteFile, getFile, getTree, updateFile } from "../controllers/fileController.js";

const Router = express.Router();
Router.post("/create-root-folder", createRootfolder);
Router.post("/create-folder", createFolder);
Router.post("/create-file", createFile);
Router.post("/upload/:id", updateFile);
Router.delete("/:id", deleteFile);
Router.get("/:id", getFile);
Router.get("/tree/:projectId", getTree);

export default Router;