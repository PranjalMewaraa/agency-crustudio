import mongoose, { Schema, models, model } from "mongoose";

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  client: string;
  year: number;
  stack: string[];
  industry: string;
  visualStyle: "reloaded" | "realty" | "lms" | "saas" | "crm" | "custom";
  accentColor?: string;
  liveUrl?: string;
  featured: boolean;
  layout: "featured" | "half" | "third";
  published: boolean;
  body?: string; // long-form case study (markdown)
  results?: { label: string; value: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagline: { type: String, required: true },
    description: { type: String, default: "" },
    client: { type: String, default: "" },
    year: { type: Number, required: true },
    stack: { type: [String], default: [] },
    industry: { type: String, default: "" },
    visualStyle: {
      type: String,
      enum: ["reloaded", "realty", "lms", "saas", "crm", "custom"],
      default: "saas",
    },
    accentColor: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    layout: { type: String, enum: ["featured", "half", "third"], default: "half" },
    published: { type: Boolean, default: true },
    body: { type: String, default: "" },
    results: [{ label: String, value: String }],
  },
  { timestamps: true }
);

export const Project = (models.Project as mongoose.Model<IProject>) || model<IProject>("Project", ProjectSchema);
