"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewTask = exports.findTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const redis_1 = require("../redis");
// GET REQUEST - find task
const findTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch tasks from Redis
        const redisData = yield redis_1.redisClient.get("FULLSTACK_TASK_SOURAV");
        const cachedTasks = redisData ? JSON.parse(redisData) : [];
        // Fetch tasks from MongoDB with proper typing
        const dbTasks = yield task_model_1.default.find({});
        // Explicitly type `doc`
        const dbTaskList = dbTasks.map((doc) => doc.task);
        // Merge and remove duplicates
        const allTasks = Array.from(new Set([...cachedTasks, ...dbTaskList]));
        res.json(allTasks);
    }
    catch (error) {
        console.error("❌ Error fetching tasks:", error);
        res.status(500).json({ error: "Error fetching tasks" });
    }
});
exports.findTask = findTask;
// POST REQUEST - create new tasks
const createNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        if (!task) {
            res.status(400).json({ error: "Task cannot be empty" });
            return;
        }
        // Store task in MongoDB
        const newTask = new task_model_1.default({ task }); // ✅ Use TaskModel (correct name)
        yield newTask.save();
        // Fetch existing tasks from Redis
        const redisData = yield redis_1.redisClient.get("FULLSTACK_TASK_SOURAV");
        const cachedTasks = redisData ? JSON.parse(redisData) : [];
        // Add new task to Redis cache
        const updatedTasks = [...cachedTasks, task];
        yield redis_1.redisClient.set("FULLSTACK_TASK_SOURAV", JSON.stringify(updatedTasks));
        // Publish task to Redis channel "/add"
        yield redis_1.redisClient.publish("/add", task);
        res.status(201).json({ message: "Task added successfully" });
    }
    catch (error) {
        console.error("❌ Error adding task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createNewTask = createNewTask;
module.exports = {
    findTask: exports.findTask,
    createNewTask: exports.createNewTask,
};
