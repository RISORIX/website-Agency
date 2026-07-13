
import ProjectForm from "@/src/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Add Project</h1>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
          <ProjectForm />
        </div>
      </div>
    </main>
  );
}