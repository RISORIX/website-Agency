import {
  Code2,
  Database,
  ShoppingCart,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

const services = [
  {
    icon: Code2,
    title: "Custom Web Development",
    description:
      "High-performance websites built with Next.js and modern technologies.",
  },
  {
    icon: Database,
    title: "Full Stack Applications",
    description:
      "Scalable MERN applications with secure APIs and databases.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Online stores optimized for conversions and growth.",
  },
  {
    icon: LayoutDashboard,
    title: "SaaS Development",
    description:
      "Modern SaaS platforms with authentication, payments and dashboards.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Clean and intuitive user experiences that users actually enjoy.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & Support",
    description:
      "Ongoing updates, monitoring and performance improvements.",
  },
];

export const metadata: Metadata = {
  title: "Services | RISORIX",
  description:
    "Custom web development, full-stack applications, e-commerce solutions, and ongoing maintenance.",
};

export default function Services() {
  return (
    <section id="Services" className="relative overflow-hidden py-8">
      {/* Ambient glow — matches Hero/Contact background treatment */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-black/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Services I Provide
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Everything you need to build, launch and grow
            your digital product — handled end to end, by me.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-zinc-900"
              >
                {/* Subtle glow on hover */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/0 blur-2xl transition-all duration-300 group-hover:bg-blue-500/10" />

                <div className="relative mb-6 inline-flex rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 ring-1 ring-inset ring-white/5 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-violet-500/20">
                  <Icon
                    size={24}
                    className="text-blue-400 transition-colors duration-300 group-hover:text-blue-300"
                  />
                </div>

                <h3 className="relative mb-3 text-xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="relative leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}