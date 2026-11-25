import type { MetadataRoute } from "next";
import { SECTION_SLUGS } from "@/src/lib/sectionSlugs";

const BASE_URL = "https://risorix.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryRoutes = Object.keys(SECTION_SLUGS).map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
  }));

  return [
    {
      url: BASE_URL,
    },
    ...categoryRoutes,
  ];
}