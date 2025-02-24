import mqtt from "mqtt";
import dotenv from "dotenv";
import { redisClient } from "./redis";
import TaskModel from "./models/task.model";

dotenv.config();

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "";
const MQTT_TOPIC_ADD = "/add";

export const setupMqttClient = () => {
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT Broker:", MQTT_BROKER_URL);
    client.subscribe(MQTT_TOPIC_ADD);
  });

  client.on("message", async (topic, message) => {
    if (topic === MQTT_TOPIC_ADD) {
      const task = message.toString();
      const cachedTasks = JSON.parse(
        (await redisClient.get("FULLSTACK_TASK_SOURAV_PAUL")) || "[]"
      );

      cachedTasks.push(task);
      await redisClient.set(
        "FULLSTACK_TASK_SOURAV_PAUL",
        JSON.stringify(cachedTasks)
      );

      if (cachedTasks.length > 50) {
        await TaskModel.insertMany(
          cachedTasks.map((task: string) => ({ task }))
        );
        await redisClient.del("FULLSTACK_TASK_SOURAV_PAUL");
        console.log("📦 Moved tasks to MongoDB");
      }

      console.log(`📩 Received Task via MQTT: ${task}`);
    }
  });
};
