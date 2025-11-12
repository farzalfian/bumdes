import { Schema, model, models } from "mongoose";

export interface ImageGallery {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

const ImageGallerySchema = new Schema<ImageGallery>(
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
  models.ImageGallery || model<ImageGallery>("ImageGallery", ImageGallerySchema);
export default ImageGalleryModel;
