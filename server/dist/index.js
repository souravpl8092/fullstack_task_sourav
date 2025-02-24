"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./configs/db");
const mqtt_1 = require("./mqtt");
const task_routes_1 = __importDefault(require("./routes/task.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/", (req, res) => {
    res.send("Welcome Home Page");
});
// Routes
app.use("/api", task_routes_1.default);
(0, mqtt_1.setupMqttClient)();
(0, db_1.connectToDatabase)()
    .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error("❌ Database connection failed:", err);
});
