import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FolderOpen } from "lucide-react";
import type { Metadata } from "next";
import { getProjectsBySection } from "@/src/lib/getProjects";
import { FaGithub } from "react-icons/fa6";
import {
  SECTION_SLUGS,
  SECTION_CARDS,
  isValidSectionSlug,
} from "@/src/lib/sectionSlugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSectionSlug(slug)) return { title: "Not Found" };

  const meta = SECTION_CARDS.find((c) => c.slug === slug)!;
  return {
    title: `${meta.title} | RISORIX`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | RISORIX`,
      description: meta.description,
    },
  };
}

export default async function ProjectCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSectionSlug(slug)) notFound();

  const section = SECTION_SLUGS[slug];
  const meta = SECTION_CARDS.find((c) => c.slug === slug)!;
  const projects = await getProjectsBySection(section);

  return (
    <main className="relative min-h-screen overflow-x-clip">

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">

        {/* Back link */}
        <Link
          href="/#projects"
          className="group mb-10 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-400 transition-all hover:border-zinc-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft
            size={15}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to all projects
        </Link>

        {/* Page header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {meta.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {meta.description}
          </p>
          {/* Project count pill */}
          {projects.length > 0 && (
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </p>
          )}
        </div>

        {/* Empty state */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/40 px-8 py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
              <FolderOpen size={24} className="text-zinc-600" aria-hidden="true" />
            </div>
            <p className="text-base font-medium text-zinc-300">No projects yet</p>
            <p className="mt-2 text-sm text-zinc-500">
              Nothing in this category yet — check back soon.
            </p>
            <Link
              href="/#projects"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/30"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={`${project.title} — project screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay with quick-action links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Live demo for ${project.title} (opens in new tab)`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <ArrowUpRight size={15} aria-hidden="true" />
                        Live Demo
                      </Link>
                    )}
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub repository for ${project.title} (opens in new tab)`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <FaGithub size={15} aria-hidden="true" />
                      GitHub
                    </Link>
                  </div>

                  {/* Category badge — top left */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="mb-2 text-base font-semibold leading-snug text-white">
                    {project.title}
                  </h2>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  {/* Persistent action row — always visible, no hover required */}
                  <div className="flex items-center gap-2 border-t border-zinc-800 pt-4">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open live demo for ${project.title}`}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                      >
                        <ArrowUpRight size={14} aria-hidden="true" />
                        Live Demo
                      </Link>
                    )}

                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 py-2 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
                        project.liveUrl ? "px-4" : "flex-1 px-4"
                      }`}
                    >
                      <FaGithub size={14} aria-hidden="true" />
                      {project.liveUrl ? "Code" : "View on GitHub"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}