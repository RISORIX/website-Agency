import { notFound } from "next/navigation";
import { connectDB } from "@/src/db/connect";
import Project from "@/src/models/Project";
import ProjectForm from "@/src/components/admin/ProjectForm";
import type { ProjectRecord } from "@/src/lib/getProjects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const project = await Project.findById(id).lean();

  if (!project) {
    notFound();
  }

  const projectRecord: ProjectRecord = {
  _id: String(project._id),
  title: project.title,
  category: project.category,
  description: project.description,
  image: project.image,
  imagePublicId: project.imagePublicId,
  github: project.github,
  section: project.section,
  createdAt: new Date(project.createdAt).toISOString(),
};
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Edit Project</h1>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
          <ProjectForm existingProject={projectRecord} />
        </div>
      </div>
    </main>
  );
}