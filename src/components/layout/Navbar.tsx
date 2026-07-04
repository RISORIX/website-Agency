"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", id: "Home" },
  { label: "Services", id: "Services" },
  { label: "Projects", id: "Projects" },
  { label: "About", id: "About" },
  { label: "Pricing", id: "Pricing" },
  { label: "Contact", id: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

 
  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);

    if (pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
      
      window.history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  const isLinkActive = (linkId: string) =>
    pathname === "/" && activeSection === linkId;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/risorix.png"
            alt="RISORIX Logo"
            width={50}
            height={50}
            className="h-15 w-15 object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />

          <span className="text-lg font-semibold tracking-tight text-white">
            RIS.<span className="text-white/60">ORIX</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.id);

            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-sm transition-colors duration-300 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-blue-500" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => handleNavClick("Contact")}
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:scale-105 md:inline-flex"
        >
          Book a Call
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.id);

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick("Contact")}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-105"
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}