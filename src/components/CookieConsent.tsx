
"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck } from "lucide-react";

type Consent = "granted" | "denied";

const STORAGE_KEY = "risorix-analytics-consent";

// Remove existing Google Analytics cookies
function clearAnalyticsCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();

    if (name === "_ga" || name.startsWith("_ga_")) {
      const expiry = "Max-Age=0; path=/";

      document.cookie = `${name}=; ${expiry}`;

      document.cookie =
        `${name}=; ${expiry}; domain=${window.location.hostname}`;
    }
  });
}

// Update Google Tag Manager consent
function updateConsent(consent: Consent) {
  const w = window as Window & {
    dataLayer?: unknown[];
  };

  const dataLayer = (w.dataLayer ??= []);

  function gtag(..._args: unknown[]) {
    dataLayer.push(arguments);
  }

  gtag("consent", "update", {
    analytics_storage: consent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (consent === "granted") {
    dataLayer.push({
      event: "analytics_consent_granted",
    });
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "granted" || saved === "denied") {
      updateConsent(saved);

      if (saved === "denied") {
        clearAnalyticsCookies();
      }
    } else {
      clearAnalyticsCookies();
      setVisible(true);
    }

    setMounted(true);
  }, []);

  function handleConsent(consent: Consent) {
    const previous = localStorage.getItem(STORAGE_KEY);

    localStorage.setItem(STORAGE_KEY, consent);

    if (previous !== consent) {
      updateConsent(consent);
    }

    setVisible(false);

    if (consent === "denied") {
      clearAnalyticsCookies();

      // Reload to stop the previously initialized tag
      if (previous === "granted") {
        window.location.reload();
      }
    }
  }

  if (!mounted) return null;

  return (
    <>
      {!visible && (
        <button
          type="button"
          onClick={() => setVisible(true)}
          aria-label="Cookie preferences"
          title="Cookie preferences"
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111318] text-zinc-400 backdrop-blur-xl transition-colors hover:border-blue-500/50 hover:text-blue-400"
        >
          <Cookie size={19} />
        </button>
      )}

      {visible && (
        <section
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-white/10 bg-[#111318]/95 text-white shadow-2xl backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Information */}
            <div className="flex items-start gap-4 lg:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="text-sm font-semibold sm:text-base">
                  Privacy preferences
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  We use optional analytics cookies to understand
                  website traffic and improve performance.
                  You can change your preferences at any time.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid shrink-0 grid-cols-2 gap-3 lg:flex">
              <button
                type="button"
                onClick={() => handleConsent("denied")}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => handleConsent("granted")}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
