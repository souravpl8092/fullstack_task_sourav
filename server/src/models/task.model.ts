import mongoose, { Document, Schema, Model } from "mongoose";

// Define TypeScript interface for Task document
export interface ITask extends Document {
  task: string;
  createdAt?: Date;
}

// Create Mongoose schema with TypeScript types
const taskSchema: Schema<ITask> = new Schema(
  {
    task: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Define and export the model
const TaskModel: Model<ITask> = mongoose.model<ITask>(
  "assignment_sourav",
  taskSchema
);
export default TaskModel;
