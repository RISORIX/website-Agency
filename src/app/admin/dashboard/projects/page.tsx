import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/src/lib/getProjects";
import { PROJECT_SECTION_LABELS } from "@/src/lib/projectConstants";
import { Plus, Pencil } from "lucide-react";
import DeleteProjectButton from "@/src/components/admin/DeleteProjectButton";

export default async function DashboardProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <p className="mt-1 text-zinc-400">
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"} on your site
            </p>
          </div>

          <Link
            href="/admin/dashboard/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-105"
          >
            <Plus size={18} />
            Add Project
          </Link>
        </div>

        {/* Empty state */}
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-16 text-center">
            <p className="text-zinc-400">
              No projects yet — click &quot;Add Project&quot; to create your
              first one.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                      {project.category}
                    </span>
                    <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                      {PROJECT_SECTION_LABELS[project.section]}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/dashboard/projects/${project._id}/edit`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-blue-500/50"
                    >
                      <Pencil size={14} />
                      Edit
                    </Link>

                    <DeleteProjectButton
                      projectId={project._id}
                      projectTitle={project.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}