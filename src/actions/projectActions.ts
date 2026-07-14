"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/src/db/connect";
import Project from "@/src/models/Project";
import {
  projectFormSchema,
  MAX_IMAGE_SIZE_BYTES,
  ACCEPTED_IMAGE_TYPES,
} from "@/src/lib/projectSchema";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "@/src/lib/cloudinary";

export type ProjectActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

async function validateAndUploadImage(
  imageFile: File
): Promise<{ url: string; publicId: string } | { error: string }> {
  if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
    return { error: "Image must be under 5MB" };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type)) {
    return { error: "Image must be JPEG, PNG, or WebP" };
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const result = await uploadImageToCloudinary(buffer);

  return { url: result.secure_url, publicId: result.public_id };
}

export async function createProject(
  formData: FormData
): Promise<ProjectActionResult> {
  const raw = {
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    github: formData.get("github"),
    liveUrl: formData.get("liveUrl"),
    section: formData.get("section"),
  };

  const parsed = projectFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const imageFile = formData.get("image");

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { success: false, error: "Please select an image." };
  }

  const uploadResult = await validateAndUploadImage(imageFile);

  if ("error" in uploadResult) {
    return { success: false, error: uploadResult.error };
  }

  try {
    await connectDB();

    await Project.create({
      title: parsed.data.title,
      category: parsed.data.category,
      description: parsed.data.description,
      github: parsed.data.github,
      liveUrl: parsed.data.liveUrl,
      section: parsed.data.section,
      image: uploadResult.url,
      imagePublicId: uploadResult.publicId,
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (err) {
    console.error("Failed to create project:", err);
    return {
      success: false,
      error: "Something went wrong saving the project. Please try again.",
    };
  }
}

export async function updateProject(
  projectId: string,
  formData: FormData
): Promise<ProjectActionResult> {
  const raw = {
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    github: formData.get("github"),
    liveUrl: formData.get("liveUrl"),
    section: formData.get("section"),
  };

  const parsed = projectFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    await connectDB();

    const existing = await Project.findById(projectId);

    if (!existing) {
      return { success: false, error: "Project not found." };
    }

    const updateData: Record<string, string> = {
      title: parsed.data.title,
      category: parsed.data.category,
      description: parsed.data.description,
      github: parsed.data.github,
      liveUrl: parsed.data.liveUrl,
      section: parsed.data.section,
    };

    // Image is optional on edit — only replace it if a new file was chosen.
    const imageFile = formData.get("image");

    if (imageFile instanceof File && imageFile.size > 0) {
      const uploadResult = await validateAndUploadImage(imageFile);

      if ("error" in uploadResult) {
        return { success: false, error: uploadResult.error };
      }

      // Delete the old image only after the new one succeeds,
      // so a failed upload never leaves the project with no image.
      await deleteImageFromCloudinary(existing.imagePublicId);

      updateData.image = uploadResult.url;
      updateData.imagePublicId = uploadResult.publicId;
    }

    await Project.findByIdAndUpdate(projectId, updateData);

    revalidatePath("/");
    revalidatePath("/admin/dashboard/projects");

    return { success: true };
  } catch (err) {
    console.error("Failed to update project:", err);
    return {
      success: false,
      error: "Something went wrong updating the project. Please try again.",
    };
  }
}

export async function deleteProject(
  projectId: string
): Promise<ProjectActionResult> {
  try {
    await connectDB();

    const existing = await Project.findById(projectId);

    if (!existing) {
      return { success: false, error: "Project not found." };
    }

    // Remove the Cloudinary file too, so deleted projects don't
    // leave orphaned images racking up storage.
    await deleteImageFromCloudinary(existing.imagePublicId);
    await Project.findByIdAndDelete(projectId);

    revalidatePath("/");
    revalidatePath("/admin/dashboard/projects");

    return { success: true };
  } catch (err) {
    console.error("Failed to delete project:", err);
    return {
      success: false,
      error: "Something went wrong deleting the project. Please try again.",
    };
  }
}