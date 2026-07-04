"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload, ImageIcon } from "lucide-react";
import { createProject, updateProject } from "@/src/actions/projectActions";
import { PROJECT_SECTION_LABELS } from "@/src/lib/projectConstants";
import type { ProjectRecord } from "@/src/lib/getProjects";

export default function ProjectForm({
  existingProject,
}: {
  existingProject?: ProjectRecord;
}) {
  const router = useRouter();
  const isEditMode = Boolean(existingProject);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existingProject?.image ?? null
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview only — actual upload happens server-side on submit.
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    const result = isEditMode
      ? await updateProject(existingProject!._id, formData)
      : await createProject(formData);

    if (result.success) {
      router.push("/admin/dashboard/projects");
      router.refresh();

    } else {
      setError(result.error);
      setFieldErrors(result.fieldErrors ?? {});
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Image upload */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Project Image {isEditMode && "(leave empty to keep current)"}
        </label>

        <div className="flex items-center gap-4">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon size={20} className="text-zinc-600" />
              </div>
            )}
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-white transition hover:border-blue-500/50">
            <Upload size={16} />
            Choose File
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
              required={!isEditMode}
            />
          </label>
        </div>

        {fieldErrors.image && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.image[0]}</p>
        )}
      </div>

      {/* Section — controls which landing page group this project appears in */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Section</label>
        <select
          name="section"
          required
          disabled={isSubmitting}
          defaultValue={existingProject?.section ?? ""}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
        >
          <option value="" disabled>
            Select a section...
          </option>
          {Object.entries(PROJECT_SECTION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {fieldErrors.section && (
          <p className="mt-1 text-sm text-red-400">
            {fieldErrors.section[0]}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Title</label>
        <input
          type="text"
          name="title"
          required
          disabled={isSubmitting}
          defaultValue={existingProject?.title}
          placeholder="E-Commerce Website"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
        />
        {fieldErrors.title && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.title[0]}</p>
        )}
      </div>

      {/* Category — tech-stack badge, separate from section grouping */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Category <span className="text-zinc-500">(tech stack badge)</span>
        </label>
        <input
          type="text"
          name="category"
          required
          disabled={isSubmitting}
          defaultValue={existingProject?.category}
          placeholder="Full Stack"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
        />
        {fieldErrors.category && (
          <p className="mt-1 text-sm text-red-400">
            {fieldErrors.category[0]}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          required
          disabled={isSubmitting}
          defaultValue={existingProject?.description}
          placeholder="Modern online store with product catalog, cart functionality..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
        />
        {fieldErrors.description && (
          <p className="mt-1 text-sm text-red-400">
            {fieldErrors.description[0]}
          </p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          GitHub URL
        </label>
        <input
          type="url"
          name="github"
          required
          disabled={isSubmitting}
          defaultValue={existingProject?.github}
          placeholder="https://github.com/yourusername/project-name"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
        />
        {fieldErrors.github && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.github[0]}</p>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {isEditMode ? "Saving..." : "Creating..."}
            </>
          ) : isEditMode ? (
            "Save Changes"
          ) : (
            "Create Project"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/projects")}
          disabled={isSubmitting}
          className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-white transition hover:border-zinc-500 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}