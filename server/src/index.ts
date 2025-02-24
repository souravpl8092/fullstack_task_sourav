import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./configs/db";
import { setupMqttClient } from "./mqtt";
import taskRouter from "./routes/task.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

// Routes
app.use("/api", taskRouter);

setupMqttClient();
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
