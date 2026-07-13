export const dynamic = "force-dynamic";

import { getLeads } from "@/src/lib/getLeads";
import LeadActions from "@/src/components/LeadActions";

export default async function DashboardPage() {
  const leads = await getLeads();

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const contactedLeads = leads.filter((lead) => lead.status === "contacted").length;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Leads Dashboard</h1>
        <p className="mt-2 text-zinc-400">Manage and track incoming client inquiries.</p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm text-zinc-500">Total Leads</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{totalLeads}</h2>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm text-zinc-500">New Leads</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{newLeads}</h2>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm text-zinc-500">Contacted</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{contactedLeads}</h2>
        </div>
      </div>

      {/* Leads */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-white">Recent Leads</h2>

        {leads.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center">
            <p className="text-zinc-400">No leads found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <div
                key={lead._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
              >
                {/* Name + Status badge */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                    <p className="text-sm text-zinc-400">{lead.email}</p>
                  </div>

                  {/* ✅ Dynamic badge — green when contacted */}
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs ${
                      lead.status === "contacted"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                {/* Budget + Source */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                    {lead.budget}
                  </span>
                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                    {lead.source}
                  </span>
                </div>

                {/* Project details */}
                <div className="mt-4 rounded-xl bg-zinc-950 p-4">
                  <p className="whitespace-pre-wrap text-sm text-zinc-300">
                    {lead.projectDetails}
                  </p>
                </div>

                {/* Footer — date + action buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-zinc-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>

                  {/* ✅ Functional buttons */}
                  <LeadActions
                    leadId={lead._id}
                    currentStatus={lead.status}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}