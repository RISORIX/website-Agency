"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: "Home",     id: "Home"     },
  { name: "Services", id: "Services" },
  { name: "Projects", id: "projects" },
  { name: "About",    id: "About"    },
  { name: "Pricing",  id: "Pricing"  },
  { name: "Contact",  id: "contact"  },
];

const SERVICES = [
  "Next.js Development",
  "MERN Development",
  "E-Commerce",
  "Web Applications",
  "Landing Pages",
  "Maintenance",
];

// NOTE: href values were swapped in original — fixed below.
const SOCIALS = [
  { icon: FaGithub,    href: "https://github.com/RISORIX",                                    label: "GitHub"    },
  { icon: FaLinkedin,  href: "https://www.linkedin.com/in/risorix-undefined-64229b41b/",      label: "LinkedIn"  },
  { icon: FaInstagram, href: "https://www.instagram.com/risorix2026/",                        label: "Instagram" },
  { icon: FaXTwitter,  href: "https://x.com/RISORIX2026",                                    label: "X / Twitter" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950">

      {/* Decorative gradient rule */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Background glows — clipped by overflow-hidden on <footer> */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/15 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-y-1/2 rounded-full bg-violet-500/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">

        {/*
          Mobile:  2 columns  (brand spans full width, then links/services side-by-side, contact below)
          Tablet:  2 columns
          Desktop: 4 columns
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-12">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              RISORIX
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Building modern web experiences with Next.js, MERN and scalable
              cloud solutions for startups, businesses and creators.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Get Started
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service} className="text-sm text-zinc-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full width on mobile so it doesn't feel squished */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-white">Contact</h3>
            <address className="space-y-2.5 text-sm text-zinc-400 not-italic">
              <p>
                <a
                  href="mailto:risorix2026@gmail.com"
                  className="transition-colors hover:text-white focus-visible:underline"
                >
                  risorix2026@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+91"
                  className="transition-colors hover:text-white focus-visible:underline"
                >
                  +91 ##########
                </a>
              </p>
              <p>Delhi, India</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 sm:mt-12 sm:flex-row sm:gap-0">
          <p className="text-xs text-zinc-500 sm:text-sm">
            © 2026 RISORIX. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}