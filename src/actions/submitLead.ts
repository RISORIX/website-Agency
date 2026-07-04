"use server";

import { headers } from "next/headers";
import { connectDB } from "@/src/db/connect";
import Lead from "@/src/models/Lead";
import { leadFormSchema } from "@/src/lib/leadSchema";
import { checkRateLimit } from "@/src/lib/rateLimit";
import { sendLeadNotification } from "@/src/lib/mailer";

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitLead(
  formData: FormData
): Promise<SubmitLeadResult> {
  // ── 1. Rate limiting ──
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
    };
  }

  // ── 2. Extract fields ──
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    budget: formData.get("budget"),
    projectDetails: formData.get("projectDetails"),
    source: formData.get("source") || "other",
    website: formData.get("website") || "",
  };

  // ── 3. Validate with Zod ──
  const parsed = leadFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // ── 4. Honeypot — bot detected, silently succeed ──
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { success: true };
  }

  // ── 5. Save to MongoDB ──
  try {
    await connectDB();

    await Lead.create({
      name: parsed.data.name,
      email: parsed.data.email,
      budget: parsed.data.budget,
      projectDetails: parsed.data.projectDetails,
      source: parsed.data.source,
    });

    // ── 6. Send email notification via Resend ──
    // Fire and forget — lead is already saved
    // Email failure must never affect the user response
    sendLeadNotification({
      name: parsed.data.name,
      email: parsed.data.email,
      budget: parsed.data.budget,
      projectDetails: parsed.data.projectDetails,
      source: parsed.data.source,
    }).catch((err) => {
      console.error("[mailer] Notification failed:", err.message);
    });

    return { success: true };
  } catch (err) {
    console.error("[submitLead] Failed to save lead:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again or email us directly.",
    };
  }
}