import type { MetadataRoute } from "next";
import { SECTION_SLUGS } from "@/src/lib/sectionSlugs";

// TODO: replace with your real domain once deployed
const BASE_URL = "https://yourdomain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/pricing", "/services"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const categoryRoutes = Object.keys(SECTION_SLUGS).map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes];
}