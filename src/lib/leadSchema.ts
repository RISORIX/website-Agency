import { z } from "zod";
import { BUDGET_OPTIONS, LEAD_SOURCE } from "@/src/lib/constants";
export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Please select a budget option",
  }),
  projectDetails: z
    .string()
    .trim()
    .min(10, "Please provide a bit more detail (min 10 characters)")
    .max(2000, "Project details must be under 2000 characters"),
  source: z.enum(LEAD_SOURCE).default("other"),
  
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;