
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/src/components/AuthProvider";
import CookieConsent from "@/src/components/CookieConsent";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
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
        <Script
          id="default-consent"
          strategy="beforeInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
          `}
        </Script>

        <AuthProvider>{children}</AuthProvider>

        <CookieConsent />

        <GoogleTagManager gtmId="GTM-KH2MBWZM" />
      </body>
    </html>
  );
}
