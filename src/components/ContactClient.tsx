"use client";
import { BUDGET_OPTIONS } from "@/src/lib/constants";
import { useRef, useState } from "react";
import { submitLead } from "@/src/actions/submitLead";
import {
    Mail, Phone, MapPin, Loader2, CheckCircle2, XCircle,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactClient() {
    const [status, setStatus] = useState<Status>("idle");
    const formRef = useRef<HTMLFormElement>(null);

    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Debug — browser console mein dekho fields aa rahe hain ya nahi
        console.log("Fields being sent:");
        for (const [key, value] of formData.entries()) {
            console.log(`  ${key}: ${value}`);
        }

        formData.set("source", "other");
        const result = await submitLead(formData);

        if (result.success) {
            setStatus("success");
            formRef.current?.reset();
        } else {
            console.error(result.error);
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="relative overflow-hidden py-8">
            <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-black/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Let&apos;s Build Something Great
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        Have a project in mind? Tell me about it and I&apos;ll get back
                        to you as soon as possible.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

                    {/* ── Left: Contact Info ── */}
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

                        <h3 className="relative mb-8 text-2xl font-bold text-white">
                            Contact Information
                        </h3>

                        <div className="relative space-y-6">
                            {[
                                { icon: Mail, label: "Email", value: "risorix2026@gmail.com" },
                                { icon: Phone, label: "Phone", value: "+91 #########" },
                                { icon: MapPin, label: "Location", value: "India" },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="group flex items-center gap-4">
                                    <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 ring-1 ring-inset ring-white/5 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-violet-500/20">
                                        <Icon size={18} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500">{label}</p>
                                        <p className="text-white">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="relative mt-10">
                            <h4 className="mb-4 text-sm font-medium text-zinc-400">Follow Me</h4>
                            <div className="flex gap-3">
                                {[
                                    { href: "https://github.com/RISORIX", icon: FaGithub },
                                    { href: "https://www.linkedin.com/in/risorix-undefined-64229b41b/", icon: FaLinkedin },
                                    { href: "https://www.instagram.com/risorix2026/", icon: FaInstagram },
                                    { href: "https://x.com/RISORIX2026", icon: FaXTwitter },
                                ].map(({ href, icon: Icon }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-xl border border-zinc-700 p-3 text-zinc-400 transition hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="relative mt-10 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-5">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                                </span>
                                <h4 className="font-medium text-white">Quick Response</h4>
                            </div>
                            <p className="mt-2 text-sm text-zinc-300">
                                Most inquiries receive a response within 24 hours.
                            </p>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

                        <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-zinc-400">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                        disabled={status === "submitting"}
                                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-zinc-400">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@gmail.com"
                                        required
                                        disabled={status === "submitting"}
                                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-zinc-400">Project Budget</label>
                                <select
                                    name="budget"
                                    disabled={status === "submitting"}
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                                >
                                    <option value="">Select a budget</option>
                                    {BUDGET_OPTIONS.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-zinc-400">Project Details</label>
                                <textarea
                                    name="projectDetails"
                                    rows={6}
                                    placeholder="Tell me about your project..."
                                    required
                                    disabled={status === "submitting"}
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                                />
                            </div>

                            {/* Honeypot */}
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                                aria-hidden="true"
                            />

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Project Inquiry"
                                )}
                            </button>

                            {status === "success" && (
                                <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                    <CheckCircle2 size={18} />
                                    Thanks! Your message has been sent — I&apos;ll get back to you within 24 hours.
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    <XCircle size={18} />
                                    Something went wrong. Please try again or email me directly.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}