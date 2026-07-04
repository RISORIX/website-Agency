"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/src/db/connect";
import Lead from "@/src/models/Lead";

// Mark lead as contacted
export async function markContacted(leadId: string): Promise<void> {
  await connectDB();
  await Lead.findByIdAndUpdate(leadId, { status: "contacted" });
  revalidatePath("/dashboard");
}

// Delete lead from MongoDB
export async function deleteLead(leadId: string): Promise<void> {
  await connectDB();
  await Lead.findByIdAndDelete(leadId);
  revalidatePath("/dashboard");
}