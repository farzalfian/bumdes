import { Schema, model, models } from "mongoose";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailURL: string;
  imageURL: string[];
  stockStatus: boolean;
  stockAmount: number;
  createdAt: string;
  updatedAt: string;
}

const ProductSchema = new Schema<Product>(
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

const ProductModel = models.Product || model<Product>("Product", ProductSchema);
export default ProductModel;
