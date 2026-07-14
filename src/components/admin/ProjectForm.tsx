"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
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

  // ── useTransition is the correct tool here. ──────────────────────────────
  // Unlike useState, isPending flips to true synchronously the moment
  // startTransition() is called — before the first await — so the button
  // reliably shows its loading state even on fast connections.
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existingProject?.image ?? null
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      setError(null);
      setFieldErrors({});

      const result = isEditMode
        ? await updateProject(existingProject!._id, formData)
        : await createProject(formData);

      if (result.success) {
        // Show toast first, then redirect after it's visible.
        toast.success(
          isEditMode
            ? "Project updated successfully."
            : "Project created successfully.",
          { duration: 3000 }
        );

        // Brief pause so the user sees the toast before the page changes.
        await new Promise((r) => setTimeout(r, 800));
        router.push("/admin/dashboard/projects");
        router.refresh(); // Bust any client-side cache on the list page.
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
        setFieldErrors(result.fieldErrors ?? {});
      }
    });
  }

  // Shared input classes — single source of truth so edits stay consistent.
  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Image upload ──────────────────────────────────────────────── */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Project Image{" "}
          {isEditMode && (
            <span className="text-zinc-500">(leave empty to keep current)</span>
          )}
        </label>

        <div className="flex items-center gap-4">
          {/* Preview */}
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon size={20} className="text-zinc-600" />
              </div>
            )}
          </div>

          {/* File picker */}
          <label
            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-white transition hover:border-blue-500/50 ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <Upload size={16} aria-hidden="true" />
            Choose File
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
              required={!isEditMode}
              disabled={isPending}
            />
          </label>
        </div>

        {fieldErrors.image && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {fieldErrors.image[0]}
          </p>
        )}
      </div>

      {/* ── Section ───────────────────────────────────────────────────── */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Section</label>
        <select
          name="section"
          required
          disabled={isPending}
          defaultValue={existingProject?.section ?? ""}
          className={inputClass}
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
          <p className="mt-1 text-sm text-red-400" role="alert">
            {fieldErrors.section[0]}
          </p>
        )}
      </div>

      {/* ── Title ─────────────────────────────────────────────────────── */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Title</label>
        <input
          type="text"
          name="title"
          required
          disabled={isPending}
          defaultValue={existingProject?.title}
          placeholder="E-Commerce Website"
          className={inputClass}
        />
        {fieldErrors.title && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {fieldErrors.title[0]}
          </p>
        )}
      </div>

      {/* ── Category ──────────────────────────────────────────────────── */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Category{" "}
          <span className="text-zinc-500">(tech stack badge)</span>
        </label>
        <input
          type="text"
          name="category"
          required
          disabled={isPending}
          defaultValue={existingProject?.category}
          placeholder="Full Stack"
          className={inputClass}
        />
        {fieldErrors.category && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {fieldErrors.category[0]}
          </p>
        )}
      </div>

      {/* ── Description ───────────────────────────────────────────────── */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Description</label>
        <textarea
          name="description"
          rows={4}
          required
          disabled={isPending}
          defaultValue={existingProject?.description}
          placeholder="Modern online store with product catalog, cart functionality..."
          className={inputClass}
        />
        {fieldErrors.description && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {fieldErrors.description[0]}
          </p>
        )}
      </div>

      {/* ── GitHub URL ────────────────────────────────────────────────── */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">GitHub URL</label>
        <input
          type="url"
          name="github"
          required
          disabled={isPending}
          defaultValue={existingProject?.github}
          placeholder="https://github.com/yourusername/project-name"
          className={inputClass}
        />
        {fieldErrors.github && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {fieldErrors.github[0]}
          </p>
        )}
      </div>
      
      {/* Live Demo URL */}
<div>
  <label className="mb-2 block text-sm text-zinc-300">
    Live Demo URL <span className="text-zinc-500">(Optional)</span>
  </label>

  <input
    type="url"
    name="liveUrl"
    defaultValue={existingProject?.liveUrl}
    placeholder="https://your-live-site.com"
    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
  />

  {fieldErrors.liveUrl && (
    <p className="mt-1 text-sm text-red-400">
      {fieldErrors.liveUrl[0]}
    </p>
  )}
</div>

      
      {/* ── Server-level error ────────────────────────────────────────── */}
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {/* ── Actions ───────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          aria-live="polite"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              {isEditMode ? "Saving…" : "Creating…"}
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
          disabled={isPending}
          className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-white transition hover:border-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}