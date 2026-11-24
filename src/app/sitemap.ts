import type { MetadataRoute } from "next";
import { SECTION_SLUGS } from "@/src/lib/sectionSlugs";

const BASE_URL = "https://risorix.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/pricing",
    "/services",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const categoryRoutes = Object.keys(SECTION_SLUGS).map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
  }));

  return [...staticRoutes, ...categoryRoutes];
}