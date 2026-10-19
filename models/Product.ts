import mongoose, { Schema, Document, Model } from "mongoose";

export interface IColor {
  name: string;
  hex: string;
  image?: string;
}

export interface IReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title?: string;
  comment: string;
  verified?: boolean;
  helpfulCount?: number;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  gender: "men" | "women" | "unisex";
  category: string;
  mainCategory?: string;
  subCategory?: string;
  sport: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  sizes: string[];
  colors: IColor[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  reviews?: IReview[];
  videoUrl?: string;
  actionVideoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ColorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String, required: false },
  },
  { _id: false }
);

const ReviewSchema = new Schema<IReview>(
  {
    id: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    date: { type: String, required: true },
    title: { type: String, default: "" },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: true },
    helpfulCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["men", "women", "unisex"], default: "unisex" },
    category: { type: String, required: true },
    mainCategory: { type: String, default: "" },
    subCategory: { type: String, default: "" },
    sport: { type: String, default: "cricket" },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    badge: { type: String },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    sizes: { type: [String], default: ["S", "M", "L", "XL"] },
    colors: { type: [ColorSchema], default: [] },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    reviews: { type: [ReviewSchema], default: [] },
    videoUrl: { type: String },
    actionVideoUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite when compiling in Next.js Turbopack hot reload
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
