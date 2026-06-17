import mongoose, { Schema, models, model } from "mongoose";

export type LeadStatus = "new" | "contacted" | "qualified" | "archived";

export interface IContact {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: LeadStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    projectType: { type: String, required: true },
    budget: String,
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "qualified", "archived"], default: "new", index: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Contact = (models.Contact as mongoose.Model<IContact>) || model<IContact>("Contact", ContactSchema);
