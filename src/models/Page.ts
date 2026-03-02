import mongoose, { Schema, Document } from "mongoose";

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);
