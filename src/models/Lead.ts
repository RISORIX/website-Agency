import mongoose, { Schema, type Document, type Model } from "mongoose";
import {
  BUDGET_OPTIONS,
  LEAD_STATUS,
  LEAD_SOURCE,
  type Budget,
  type LeadStatus,
  type LeadSource,
} from "@/src/lib/constants"; // ← import from constants, not defined here

export { BUDGET_OPTIONS, LEAD_STATUS, LEAD_SOURCE };
export type { Budget, LeadStatus, LeadSource };

export interface ILead extends Document {
  name: string;
  email: string;
  budget: Budget;
  projectDetails: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be under 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email is too long"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    budget: {
      type: String,
      required: [true, "Budget is required"],
      enum: {
        values: BUDGET_OPTIONS,
        message: "{VALUE} is not a valid budget option",
      },
    },
    projectDetails: {
      type: String,
      required: [true, "Project details are required"],
      trim: true,
      minlength: [10, "Please provide a bit more detail"],
      maxlength: [2000, "Project details must be under 2000 characters"],
    },
    source: {
      type: String,
      enum: LEAD_SOURCE,
      default: "other",
    },
    status: {
      type: String,
      enum: LEAD_STATUS,
      default: "new",
    },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;