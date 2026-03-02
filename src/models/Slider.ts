import mongoose, { Schema, Document } from "mongoose";

export interface ISlider extends Document {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SliderSchema = new Schema<ISlider>(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    image: { type: String, required: true },
    buttonText: { type: String, default: "Shop Now" },
    buttonLink: { type: String, default: "/shop" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Slider || mongoose.model<ISlider>("Slider", SliderSchema);
