import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="Home" className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            {/* Status pill — true, specific, not a "trust badge" */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Open for freelance projects
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              I build fast,
              <br />
              modern &
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                full‑stack
              </span>{" "}
              web products
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Full-stack developer specializing in Next.js, React,
              and Node.js. I design, build, and ship production-ready
              web apps end to end — from database to deploy.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all hover:scale-105"
              >
                Start a project
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 font-medium text-white transition-all hover:border-zinc-500"
              >
                View my work
              </Link>
            </div>

            {/* Stack — real, checkable signal instead of vanity stats */}
            <div className="mt-12">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Side — Code Editor */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d1117] shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  api/checkout/route.ts
                </span>
                <span className="text-xs text-zinc-600">TypeScript</span>
              </div>

              {/* Code */}
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                <code>
                  <span className="text-zinc-500">{"// validated, typed, production-ready"}</span>
                  {"\n"}
                  <span className="text-violet-400">import</span>{" "}
                  <span className="text-zinc-300">{"{ stripe }"}</span>{" "}
                  <span className="text-violet-400">from</span>{" "}
                  <span className="text-green-400">&quot;@/lib/stripe&quot;</span>
                  {"\n"}
                  <span className="text-violet-400">import</span>{" "}
                  <span className="text-zinc-300">{"{ db }"}</span>{" "}
                  <span className="text-violet-400">from</span>{" "}
                  <span className="text-green-400">&quot;@/lib/db&quot;</span>
                  {"\n\n"}
                  <span className="text-violet-400">export async function</span>{" "}
                  <span className="text-blue-400">POST</span>
                  <span className="text-zinc-300">(req: Request) {"{"}</span>
                  {"\n"}  <span className="text-violet-400">const</span>{" "}
                  <span className="text-zinc-300">{"{ items, userId } = "}</span>
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-zinc-300">req.json()</span>
                  {"\n\n"}  <span className="text-violet-400">const</span>{" "}
                  <span className="text-zinc-300">session = </span>
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-zinc-300">stripe.checkout.sessions.create({"{"}</span>
                  {"\n"}    <span className="text-blue-300">line_items</span>
                  <span className="text-zinc-300">: items,</span>
                  {"\n"}    <span className="text-blue-300">mode</span>
                  <span className="text-zinc-300">: </span>
                  <span className="text-green-400">&quot;payment&quot;</span>
                  <span className="text-zinc-300">,</span>
                  {"\n"}  <span className="text-zinc-300">{"})"}</span>
                  {"\n\n"}  <span className="text-violet-400">await</span>{" "}
                  <span className="text-zinc-300">db.order.create({"{ userId, items }"})</span>
                  {"\n\n"}  <span className="text-violet-400">return</span>{" "}
                  <span className="text-zinc-300">Response.json({"{ url: session.url }"})</span>
                  {"\n"}
                  <span className="text-zinc-300">{"}"}</span>
                </code>
              </pre>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  No errors
                </span>
                <span>Ln 18, Col 1</span>
              </div>
            </div>

            {/* Floating Card — verifiable proof, not a fake metric */}
            <div className="absolute -right-6 -top-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
              <p className="text-sm text-zinc-400">Shipped</p>
              <h4 className="text-xl font-bold text-white">
                Production
              </h4>
            </div>

            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                ✓
              </div>
              <div>
                <p className="text-sm text-zinc-400">Deployed</p>
                <h4 className="font-semibold text-white">Vercel · main</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}