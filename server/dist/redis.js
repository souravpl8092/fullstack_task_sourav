"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = new ioredis_1.default({
    port: 12675,
    username: "default",
    host: "redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    password: "dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB",
});
exports.redisClient = redisClient;
redisClient.on("error", (err) => {
    console.error("❌ Redis Connection Error:", err);
});
redisClient.on("connect", () => {
    console.log("✅ Redis Connection Established!");
});
