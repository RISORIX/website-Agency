import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
];

const stats = [
  {
    value: "50+",
    label: "Projects Built",
  },
  {
    value: "3+",
    label: "Years Learning & Building",
  },
  {
    value: "100%",
    label: "Custom Development",
  },
  {
    value: "MERN",
    label: "Core Stack",
  },
];

export const metadata: Metadata = {
  title: "About | RISORIX",
  description:
    "Full-stack developer building modern web experiences with Next.js, React, and Node.js.",
};

export default function About() {
  return (
    <section id="About" className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative">
            <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 transition-all duration-300 hover:border-blue-500/50">
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                {/* Mesh gradient base — shows behind the photo at the edges */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

                <Image
                  src="/workspacee.jpg"
                  alt="Workspace"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Building Modern Web Experiences
              That Drive Results
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              I help startups, businesses, and creators build
              fast, scalable, and user-focused web applications
              using Next.js, React, Node.js, and modern web
              technologies.
            </p>

            <p className="mt-4 leading-relaxed text-zinc-400">
              From landing pages to full-stack platforms,
              every project is built with performance,
              maintainability, and long-term growth in mind.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50"
                >
                  <h3 className="text-3xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-10">
              <h3 className="mb-4 text-sm font-medium text-zinc-400">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors duration-300 hover:border-blue-500/50 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="#Contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all hover:scale-105"
            >
              Let&apos;s Discuss Your Project
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}