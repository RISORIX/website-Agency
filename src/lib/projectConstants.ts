export const PROJECT_SECTIONS = [
  "portfolio_personal",
  "media_blog_content",
  "small_business_service",
  "ecommerce",
] as const;

export type ProjectSection = (typeof PROJECT_SECTIONS)[number];

export const PROJECT_SECTION_LABELS = {
  portfolio_personal: "Portfolio & Personal Websites",
  media_blog_content: "Media, Blog & Content Websites",
  small_business_service: "Small Business & Service Websites",
  ecommerce: "E-Commerce",
} as const;