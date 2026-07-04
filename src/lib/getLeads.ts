import { connectDB } from "@/src/db/connect";
import Lead, { type Budget, type LeadStatus, type LeadSource } from "@/src/models/Lead";

export type LeadRecord = {
  _id: string;
  name: string;
  email: string;
  budget: Budget;
  projectDetails: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
};

export async function getLeads(): Promise<LeadRecord[]> {
  await connectDB();

  // Newest first — the schema already has an index on createdAt for this.
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();

  // Convert Mongoose documents (ObjectId, Date) into plain
  // JSON-safe values before passing to a client component.
  return leads.map((lead) => ({
    _id: String(lead._id),
    name: lead.name,
    email: lead.email,
    budget: lead.budget,
    projectDetails: lead.projectDetails,
    source: lead.source,
    status: lead.status,
    createdAt: new Date(lead.createdAt).toISOString(),
  }));
}