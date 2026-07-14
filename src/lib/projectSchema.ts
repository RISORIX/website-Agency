import { z } from "zod";
import { PROJECT_SECTIONS } from "@/src/lib/projectConstants";
/**
 * Validates project form fields (excluding the image file itself —
 * that's handled separately via Cloudinary upload before this runs).
 */
export const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be under 100 characters"),
  category: z
    .string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be under 50 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
  github: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .max(300, "URL is too long"),
  liveUrl: z
    .string()
    .trim()
    .url("Please enter a valid Live URL")
    .max(300, "URL is too long")
    .or(z.literal("")),
  section: z.enum(PROJECT_SECTIONS, {
    message: "Please select a section",
  }),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;

// Max upload size enforced both client-side (instant feedback) and
// server-side (the check that actually matters for security).
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];