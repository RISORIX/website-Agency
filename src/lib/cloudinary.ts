import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

/**
 * Uploads an image buffer to Cloudinary under a dedicated folder
 * so project images are easy to find/manage in the Cloudinary console.
 */
export async function uploadImageToCloudinary(
  fileBuffer: Buffer
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "portfolio-projects" },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      )
      .end(fileBuffer);
  });
}

/**
 * Deletes an image from Cloudinary. Called when a project is deleted
 * or its image is replaced, so old files don't pile up in storage.
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}