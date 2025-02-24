import RedisClient from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new RedisClient({
  port: 12675,
  username: "default",
  host: "redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  password: "dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB",
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err);
});

redisClient.on("connect", () => {
  console.log("✅ Redis Connection Established!");
});

export { redisClient };
