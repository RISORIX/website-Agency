"use client";

import { useState } from "react";
import { markContacted, deleteLead } from "@/src/lib/actions";
import type { LeadStatus } from "@/src/models/Lead";

interface LeadActionsProps {
  leadId: string;
  currentStatus: LeadStatus;
}

const LeadActions = ({ leadId, currentStatus }: LeadActionsProps) => {
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const [deleting, setDeleting] = useState(false);
  const [contacting, setContacting] = useState(false);

  const handleMarkContacted = async () => {
    if (status === "contacted") return;
    setContacting(true);
    await markContacted(leadId);
    setStatus("contacted");
    setContacting(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this lead permanently?");
    if (!confirmed) return;
    setDeleting(true);
    await deleteLead(leadId);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleMarkContacted}
        disabled={status === "contacted" || contacting}
        className={`rounded-lg border px-3 py-1.5 text-xs transition ${
          status === "contacted"
            ? "border-green-500/30 text-green-400 cursor-not-allowed"
            : "border-zinc-700 text-white hover:border-blue-500"
        }`}
      >
        {contacting
          ? "Updating..."
          : status === "contacted"
          ? "✓ Contacted"
          : "Mark Contacted"}
      </button>

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default LeadActions;