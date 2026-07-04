import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/src/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RISORIX | Web Development Agency",
  description:
    "Modern websites and full-stack web applications built with Next.js and MERN.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}