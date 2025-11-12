import { Schema, model, models } from "mongoose";

export interface Admin {
  id: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const AdminSchema = new Schema<Admin>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "admins" }
);

const AdminModel = models.Admin || model<Admin>("Admin", AdminSchema);
export default AdminModel;
