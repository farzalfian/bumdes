"use server"
import { Product } from "@/types";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema<Product>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    imageURL: { type: [String], required: true },
    stockStatus: { type: Boolean, required: true },
    stockAmount: { type: Number, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "products" }
);

const ProductModel = mongoose.models.Product || mongoose.model<Product>("Product", ProductSchema);
export default ProductModel;