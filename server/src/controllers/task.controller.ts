import TaskModel, { ITask } from "../models/task.model";
import { Request, Response } from "express";
import { redisClient } from "../redis";

// GET REQUEST - find task
export const findTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch tasks from Redis
    const redisData = await redisClient.get("FULLSTACK_TASK_SOURAV");
    const cachedTasks: string[] = redisData ? JSON.parse(redisData) : [];

    // Fetch tasks from MongoDB with proper typing
    const dbTasks: ITask[] = await TaskModel.find({});

    // Explicitly type `doc`
    const dbTaskList: string[] = dbTasks.map((doc: ITask) => doc.task);

    // Merge and remove duplicates
    const allTasks = Array.from(new Set([...cachedTasks, ...dbTaskList]));

    res.json(allTasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// POST REQUEST - create new tasks
export const createNewTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { task } = req.body;

    if (!task) {
      res.status(400).json({ error: "Task cannot be empty" });
      return;
    }

    // Store task in MongoDB
    const newTask = new TaskModel({ task }); // ✅ Use TaskModel (correct name)
    await newTask.save();

    // Fetch existing tasks from Redis
    const redisData = await redisClient.get("FULLSTACK_TASK_SOURAV");
    const cachedTasks: string[] = redisData ? JSON.parse(redisData) : [];

    // Add new task to Redis cache
    const updatedTasks = [...cachedTasks, task];
    await redisClient.set(
      "FULLSTACK_TASK_SOURAV",
      JSON.stringify(updatedTasks)
    );

    // Publish task to Redis channel "/add"
    await redisClient.publish("/add", task);

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("❌ Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  findTask,
  createNewTask,
};
