"use client";

import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Landing Pages",
    price: "₹10k+",
    featured: false,
    cta: "Request Quote",
    features: [
      "Custom Design",
      "Responsive Layout",
      "SEO Ready",
      "Lead Capture Forms",
    ],
  },
  {
    name: "Business Websites",
    price: "₹25k+",
    featured: true,
    cta: "Request Quote",
    features: [
      "Multi-Page Website",
      "Admin Panel",
      "CMS Integration",
      "Performance Optimized",
    ],
  },
  {
    name: "Custom Web Apps",
    price: "Custom",
    featured: false,
    cta: "Let's Talk",
    features: [
      "Authentication",
      "Database Design",
      "Dashboards",
      "Custom Features",
    ],
  },
];

export default function Pricing() {

  function scrollToContact() {
    const el = document.getElementById("Contact");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="Pricing" className="relative overflow-hidden py-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-black/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Project Investment
          </h2>

          <p className="mt-4 text-zinc-400">
            Every project is different. These ranges help estimate the
            investment required for common project types.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-blue-500 bg-zinc-900 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_-8px_rgba(59,130,246,0.4)]"
                  : "border-zinc-800 bg-zinc-900/60 hover:border-blue-500/50"
              }`}
            >
              {/* Subtle corner glow on non-featured cards, consistent with Services/Contact */}
              {!plan.featured && (
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/0 blur-2xl transition-all duration-300 group-hover:bg-blue-500/10" />
              )}

              {plan.featured && (
                <div className="relative mb-4 inline-flex rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                  Most Requested
                </div>
              )}

              <h3 className="relative text-2xl font-semibold text-white">
                {plan.name}
              </h3>

              <div className="relative mt-4">
                <span className="text-sm text-zinc-500">
                  {plan.price === "Custom" ? "" : "Starting at"}
                </span>
                <div className="text-4xl font-bold text-white">
                  {plan.price === "Custom" ? "Custom Quote" : plan.price}
                </div>
              </div>

              <ul className="relative mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-zinc-400"
                  >
                    <Check size={18} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className="relative mt-8 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 font-medium text-black transition-all duration-300 hover:scale-105"
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Prices are starting points and adjust based on project scope,
          timeline, and features required.
        </p>
      </div>
    </section>
  );
}