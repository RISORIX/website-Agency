"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Links = [
  { name: "Home", id: "Home" },
  { name: "Services", id: "Services" },
  { name: "Projects", id: "Projects" },
  { name: "About", id: "About" },
  { name: "Pricing", id: "Pricing" },
  { name: "Contact", id: "contact" },
];

const services = [
  "Next.js Development",
  "MERN Development",
  "E-Commerce",
  "Web Applications",
  "Landing Pages",
  "Maintenance",
];


const socials = [
  { icon: FaGithub, href: "https://github.com/RISORIX" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/risorix-undefined-64229b41b/" },
  { icon: FaXTwitter, href: "https://www.instagram.com/risorix2026/" },
  { icon: FaInstagram, href: "https://x.com/RISORIX2026" },
];

export default function Footer() {
 
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950">
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Bottom glow — the requested "glow at the bottom" effect */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="relative">
            <div className="pointer-events-none absolute -left-4 -top-4 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

            <Link
              href="/"
              className="relative text-2xl font-bold text-white"
            >
              RISORIX
            </Link>

            <p className="relative mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Building modern web experiences with Next.js, MERN and scalable
              cloud solutions for startups, businesses and creators.
            </p>

            <button
              onClick={() => scrollToSection("contact")}
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Quick Links</h3>

            <ul className="space-y-3">
              {Links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Services</h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-sm text-zinc-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Contact</h3>

            
            <div className="space-y-4 text-sm text-zinc-400">
              <p>risorix2026@gmail.com</p>
              <p>+91 ##########</p>
              <p>Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 pt-8 md:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 RISORIX. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-blue-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}