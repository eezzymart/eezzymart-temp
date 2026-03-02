import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "" },
    image: { type: String, default: "" },
    author: { type: String, default: "Admin" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
