import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice: number;
  sku: string;
  stock: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  ratings: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    price: { type: Number, required: true },
    comparePrice: { type: Number, default: 0 },
    sku: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
