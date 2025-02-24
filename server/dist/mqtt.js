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
exports.setupMqttClient = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("./redis");
const task_model_1 = __importDefault(require("./models/task.model"));
dotenv_1.default.config();
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "";
const MQTT_TOPIC_ADD = "/add";
const setupMqttClient = () => {
    const client = mqtt_1.default.connect(MQTT_BROKER_URL);
    client.on("connect", () => {
        console.log("✅ Connected to MQTT Broker:", MQTT_BROKER_URL);
        client.subscribe(MQTT_TOPIC_ADD);
    });
    client.on("message", (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
        if (topic === MQTT_TOPIC_ADD) {
            const task = message.toString();
            const cachedTasks = JSON.parse((yield redis_1.redisClient.get("FULLSTACK_TASK_SOURAV_PAUL")) || "[]");
            cachedTasks.push(task);
            yield redis_1.redisClient.set("FULLSTACK_TASK_SOURAV_PAUL", JSON.stringify(cachedTasks));
            if (cachedTasks.length > 50) {
                yield task_model_1.default.insertMany(cachedTasks.map((task) => ({ task })));
                yield redis_1.redisClient.del("FULLSTACK_TASK_SOURAV_PAUL");
                console.log("📦 Moved tasks to MongoDB");
            }
            console.log(`📩 Received Task via MQTT: ${task}`);
        }
    }));
};
exports.setupMqttClient = setupMqttClient;
