import Hero from "@/src/components/home/Hero"
import Services from "@/src/app/(public)/Services/page";
import Projects from "@/src/app/(public)/projects/page";
import About from "@/src/app/(public)/About/page";
import Pricing from "@/src/app/(public)/Pricing/page";
import Contact from "@/src/components/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RISORIX | Full-Stack Web Developer",
  description:
    "Full-stack developer specializing in Next.js, React, and Node.js. I build fast, modern, and scalable web products for startups and businesses.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects/>
       <About />
      <Pricing/>
      <Contact/>
    </main>
  );
}