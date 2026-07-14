import mongoose, { Schema, type Document, type Model } from "mongoose";
import { PROJECT_SECTIONS } from "@/src/lib/projectConstants";
import type { ProjectSection } from "@/src/lib/projectConstants";
export { PROJECT_SECTIONS, type ProjectSection } from "@/src/lib/projectConstants";

export interface IProject extends Document {
  title: string;
  category: string;
  description: string;
  image: string;
  imagePublicId: string;
  github: string;
  liveUrl?: string;
  section: ProjectSection;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be under 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [50, "Category must be under 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description must be under 500 characters"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    imagePublicId: {
      type: String,
      required: [true, "Image public ID is required"],
    },
    github: {
      type: String,
      required: [true, "GitHub link is required"],
      trim: true,
    },

    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },

    section: {
      type: String,
      required: [true, "Section is required"],
      enum: {
        values: PROJECT_SECTIONS,
        message: "{VALUE} is not a valid section",
      },
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ section: 1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;