import Link from "next/link";
import {
  ArrowUpRight,
  User,
  Newspaper,
  Store,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { getProjectCountsBySection } from "@/src/lib/getProjects";
import {
  SECTION_SLUGS,
  SECTION_CARDS,
  type SectionSlug,
} from "@/src/lib/sectionSlugs";

// Explicitly typed as Record<SectionSlug, LucideIcon> so TypeScript
// knows every possible card.slug value has a matching icon —
// this is what removes the "implicit any" error on the lookup below.
const SECTION_ICONS: Record<SectionSlug, LucideIcon> = {
  portfolio: User,
  blog: Newspaper,
  business: Store,
  ecommerce: ShoppingCart,
};

export default async function ProjectCategories() {
  const counts = await getProjectCountsBySection();

  return (
    <section id="Projects" className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            What I Build
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Explore my work by category to see projects most relevant
            to what you need.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTION_CARDS.map((card) => {
            const Icon = SECTION_ICONS[card.slug];
            const section = SECTION_SLUGS[card.slug];
            const count = counts[section];

            return (
              <Link
                key={card.slug}
                href={`/projects/${card.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-zinc-900"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/0 blur-2xl transition-all duration-300 group-hover:bg-blue-500/10" />

                <div className="relative mb-6 inline-flex rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 ring-1 ring-inset ring-white/5 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-violet-500/20">
                  <Icon
                    size={24}
                    className="text-blue-400 transition-colors duration-300 group-hover:text-blue-300"
                  />
                </div>

                <h3 className="relative mb-2 text-lg font-semibold text-white">
                  {card.title}
                </h3>

                <p className="relative mb-4 text-sm leading-relaxed text-zinc-400">
                  {card.description}
                </p>

                <div className="relative flex items-center justify-between text-sm">
                  <span className="text-zinc-500">
                    {count} {count === 1 ? "project" : "projects"}
                  </span>

                  <span className="inline-flex items-center gap-1 font-medium text-white transition-colors group-hover:text-blue-400">
                    Explore
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}