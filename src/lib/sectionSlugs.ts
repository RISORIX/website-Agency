import type { ProjectSection } from "@/src/lib/projectConstants";

export const SECTION_SLUGS: Record<string, ProjectSection> = {
  portfolio: "portfolio_personal",
  blog: "media_blog_content",
  business: "small_business_service",
  ecommerce: "ecommerce",
};

export type SectionSlug = keyof typeof SECTION_SLUGS;

export function isValidSectionSlug(slug: string): slug is SectionSlug {
  return slug in SECTION_SLUGS;
}

// Reverse lookup + display content for the home page cards.
export const SECTION_CARDS: {
  slug: SectionSlug;
  title: string;
  description: string;
}[] = [
  {
    slug: "portfolio",
    title: "Portfolio & Personal Websites",
    description:
      "Personal sites, creative portfolios, and resumes that make a strong first impression.",
  },
  {
    slug: "blog",
    title: "Media, Blog & Content Websites",
    description:
      "Content-first sites built for readability, publishing workflows, and audience growth.",
  },
  {
    slug: "business",
    title: "Small Business & Service Websites",
    description:
      "Websites for local businesses, consultants, and service providers that convert visitors into customers.",
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    description:
      "Online stores with product catalogs, secure checkout, and order management built in.",
  },
];