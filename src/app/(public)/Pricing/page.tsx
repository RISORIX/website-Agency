import type { Metadata } from "next";
import PricingSection from "@/src/components/Pricing"; // TODO: fix import path to match where you save PricingSection.tsx

export const metadata: Metadata = {
  title: "Pricing | RISORIX",
  description:
    "Transparent starting prices for landing pages, business websites, and custom web applications.",
};

export default function PricingPage() {
  return <PricingSection />;
}