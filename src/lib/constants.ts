// No mongoose, no Node.js imports — pure constants, safe for client + server
export const BUDGET_OPTIONS = [
  "Starter 10k+",
  "Business 25k+",
  "Premium (Custom Quote)",
  "Not sure yet",
] as const;

export const LEAD_STATUS = ["new", "contacted", "converted", "closed"] as const;

export const LEAD_SOURCE = [
  "hero",
  "pricing",
  "contact_page",
  "cta_section",
  "other",
] as const;

export type Budget = (typeof BUDGET_OPTIONS)[number];
export type LeadStatus = (typeof LEAD_STATUS)[number];
export type LeadSource = (typeof LEAD_SOURCE)[number];