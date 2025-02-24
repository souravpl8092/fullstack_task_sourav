import express from "express";
import { findTask, createNewTask } from "../controllers/task.controller";

const taskRouter = express.Router();

// Define routes
taskRouter.get("/fetchAllTasks", findTask);
taskRouter.post("/addTask", createNewTask);

export default taskRouter;
