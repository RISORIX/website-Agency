import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

  if (!isValidSectionSlug(slug)) {
    return { title: "Not Found" };
  }

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

  if (!isValidSectionSlug(slug)) {
    notFound();
  }

  const section = SECTION_SLUGS[slug];
  const meta = SECTION_CARDS.find((c) => c.slug === slug)!;
  const projects = await getProjectsBySection(section);

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back link */}
        <Link
          href="/#Projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to all projects
        </Link>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {meta.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            {meta.description}
          </p>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-16 text-center">
            <p className="text-zinc-400">
              No projects in this category yet — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                    {project.category}
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-400"
                  >
                    <FaGithub size={16} />
                    View on GitHub
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}