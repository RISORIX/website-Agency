import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"] as const;

const CODE_LINES = [
  { indent: 0, tokens: [{ c: "zinc-500", t: "// validated, typed, production-ready" }] },
  { indent: 0, tokens: [{ c: "violet-400", t: "import" }, { c: "zinc-300", t: " { stripe } " }, { c: "violet-400", t: "from" }, { c: "green-400", t: ' "@/lib/stripe"' }] },
  { indent: 0, tokens: [{ c: "violet-400", t: "import" }, { c: "zinc-300", t: " { db } " }, { c: "violet-400", t: "from" }, { c: "green-400", t: ' "@/lib/db"' }] },
  null,
  { indent: 0, tokens: [{ c: "violet-400", t: "export async function" }, { c: "blue-400", t: " POST" }, { c: "zinc-300", t: "(req: Request) {" }] },
  { indent: 1, tokens: [{ c: "violet-400", t: "const" }, { c: "zinc-300", t: " { items, userId } = " }, { c: "violet-400", t: "await" }, { c: "zinc-300", t: " req.json()" }] },
  null,
  { indent: 1, tokens: [{ c: "violet-400", t: "const" }, { c: "zinc-300", t: " session = " }, { c: "violet-400", t: "await" }, { c: "zinc-300", t: " stripe.checkout.sessions.create({" }] },
  { indent: 2, tokens: [{ c: "blue-300", t: "line_items" }, { c: "zinc-300", t: ": items," }] },
  { indent: 2, tokens: [{ c: "blue-300", t: "mode" }, { c: "zinc-300", t: ": " }, { c: "green-400", t: '"payment"' }, { c: "zinc-300", t: "," }] },
  { indent: 1, tokens: [{ c: "zinc-300", t: "})" }] },
  null,
  { indent: 1, tokens: [{ c: "violet-400", t: "await" }, { c: "zinc-300", t: " db.order.create({ userId, items })" }] },
  null,
  { indent: 1, tokens: [{ c: "violet-400", t: "return" }, { c: "zinc-300", t: " Response.json({ url: session.url })" }] },
  { indent: 0, tokens: [{ c: "zinc-300", t: "}" }] },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px] sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left Content ── */}
          <div className="flex flex-col items-start">

            {/* Availability pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Open for freelance projects
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              I build fast,
              <br />
              modern &amp;
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                full‑stack
              </span>{" "}
              web products
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg">
              Full-stack developer specialising in Next.js, React, and Node.js. I design,
              build, and ship production-ready web apps end to end — from database to deploy.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
              >
                Start a project
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-400 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
              >
                View my work
              </Link>
            </div>

            {/* Core stack */}
            <div className="mt-10 sm:mt-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300 sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Code Editor ── */}
          {/*
            On mobile the floating cards are hidden — they overflow and
            crash the layout. They show from lg: up where there's room.
            The editor itself is given top/bottom margin on mobile so it
            has breathing room without relying on the floating cards.
          */}
          <div className="relative mt-2 px-1 pb-4 lg:mt-0 lg:px-0 lg:pb-8 lg:pt-8">

            {/* Floating "Shipped · Production" — desktop only */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl lg:block"
            >
              <p className="text-sm text-zinc-400">Shipped</p>
              <p className="text-lg font-bold text-white">Production</p>
            </div>

            {/* Editor */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d1117] shadow-2xl">

              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-zinc-500">api/checkout/route.ts</span>
                <span className="text-xs text-zinc-600">TypeScript</span>
              </div>

              {/* Code block */}
              <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed sm:p-5 sm:text-[13px]">
                <code>
                  {CODE_LINES.map((line, i) =>
                    line === null ? (
                      <span key={i} className="block h-3" />
                    ) : (
                      <span key={i} className="block">
                        {line.indent > 0 && (
                          <span aria-hidden="true">{"  ".repeat(line.indent)}</span>
                        )}
                        {line.tokens.map((tok, j) => (
                          <span key={j} className={`text-${tok.c}`}>
                            {tok.t}
                          </span>
                        ))}
                      </span>
                    )
                  )}
                </code>
              </pre>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
                  No errors
                </span>
                <span>Ln 18, Col 1</span>
              </div>
            </div>

            {/* Floating "Deployed · Vercel" — desktop only */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 hidden items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl lg:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-400 text-sm">
                ✓
              </div>
              <div>
                <p className="text-sm text-zinc-400">Deployed</p>
                <p className="font-semibold text-white">Vercel · main</p>
              </div>
            </div>

            {/* Mobile-only status strip — replaces the floating cards */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 lg:hidden">
              <span className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
                Shipped to Production
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="text-green-400">✓</span>
                Vercel · main
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}