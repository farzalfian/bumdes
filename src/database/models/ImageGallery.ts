"use server"
import { ImageGallery } from "@/types";
import mongoose from "mongoose";

const ImageGallerySchema = new mongoose.Schema<ImageGallery>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    releaseDate: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "image_galleries" }
);

const ImageGalleryModel =
  mongoose.models.ImageGallery || mongoose.model<ImageGallery>("ImageGallery", ImageGallerySchema);
export default ImageGalleryModel;
