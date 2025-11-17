"use server"
import mongoose from "mongoose";

export interface Admin {
  id: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const AdminSchema = new mongoose.Schema<Admin>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "admins" }
);

const AdminModel = mongoose.models.Admin || mongoose.model<Admin>("Admin", AdminSchema);
export default AdminModel;
