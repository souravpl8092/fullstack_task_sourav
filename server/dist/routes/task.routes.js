"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const taskRouter = express_1.default.Router();
// Define routes
taskRouter.get("/fetchAllTasks", task_controller_1.findTask);
taskRouter.post("/addTask", task_controller_1.createNewTask);
exports.default = taskRouter;
