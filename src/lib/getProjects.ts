import { connectDB } from "@/src/db/connect";
import Project from "@/src/models/Project";
import type { ProjectSection } from "@/src/lib/projectConstants";

export type ProjectRecord = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imagePublicId: string;
  github: string;
  section: ProjectSection;
  createdAt: string;
};

function toProjectRecord(project: any): ProjectRecord {
  return {
    _id: String(project._id),
    title: project.title,
    category: project.category,
    description: project.description,
    image: project.image,
    imagePublicId: project.imagePublicId,
    github: project.github,
    section: project.section,
    createdAt: new Date(project.createdAt).toISOString(),
  };
}

export async function getProjects(): Promise<ProjectRecord[]> {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return projects.map(toProjectRecord);
}

/**
 * Fetches only projects belonging to one section — used by each
 * category page (/projects/ecommerce, etc.) instead of fetching
 * everything and filtering client-side.
 */
export async function getProjectsBySection(
  section: ProjectSection
): Promise<ProjectRecord[]> {
  await connectDB();
  const projects = await Project.find({ section })
    .sort({ createdAt: -1 })
    .lean();
  return projects.map(toProjectRecord);
}

/**
 * Groups all projects by section in one pass — kept for any future
 * use (e.g. an "all projects" overview page), though the home page
 * cards no longer need full project data, just counts.
 */
export function groupProjectsBySection(
  projects: ProjectRecord[]
): Record<ProjectSection, ProjectRecord[]> {
  return {
    portfolio_personal: projects.filter(
      (p) => p.section === "portfolio_personal"
    ),
    media_blog_content: projects.filter(
      (p) => p.section === "media_blog_content"
    ),
    small_business_service: projects.filter(
      (p) => p.section === "small_business_service"
    ),
    ecommerce: projects.filter((p) => p.section === "ecommerce"),
  };
}

/**
 * Returns project counts per section — used by the home page cards
 * to show "(3 projects)" without fetching full project documents.
 */
export async function getProjectCountsBySection(): Promise<
  Record<ProjectSection, number>
> {
  await connectDB();

  const counts = await Project.aggregate([
    { $group: { _id: "$section", count: { $sum: 1 } } },
  ]);

  const result: Record<ProjectSection, number> = {
    portfolio_personal: 0,
    media_blog_content: 0,
    small_business_service: 0,
    ecommerce: 0,
  };

  for (const entry of counts) {
    result[entry._id as ProjectSection] = entry.count;
  }

  return result;
}