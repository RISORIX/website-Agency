"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ConsentValue = "granted" | "denied";

interface ConsentState {
  analytics: ConsentValue;
  marketing: ConsentValue;
  version: number;
}

type StoredConsent = ConsentState & { savedAt: number };

const CONSENT_STORAGE_KEY = "risorix-consent" as const;
const CONSENT_VERSION = 1;

const DEFAULT_CONSENT: ConsentState = {
  analytics: "denied",
  marketing: "denied",
  version: CONSENT_VERSION,
};

/* -------------------------------------------------------------------------- */
/*                                   Utils                                    */
/* -------------------------------------------------------------------------- */

/** Safe localStorage access — handles Safari private mode, quota, SSR. */
function safeGetItem(key: string): string | null {
  try {
    return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* swallow — storage unavailable */
  }
}

function parseStoredConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (
      typeof parsed?.analytics === "string" &&
      typeof parsed?.marketing === "string" &&
      typeof parsed?.version === "number" &&
      parsed.version === CONSENT_VERSION
    ) {
      return {
        analytics: parsed.analytics,
        marketing: parsed.marketing,
        version: parsed.version,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/** Fire a typed custom event so other parts of the app can react. */
function dispatchConsentEvent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ConsentState>("risorix:consent-update", { detail: state }),
  );
}

/* -------------------------------------------------------------------------- */
/*                              gtag integration                              */
/* -------------------------------------------------------------------------- */

function ensureDataLayer(): unknown[] {
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  return w.dataLayer;
}

/**
 * Correct gtag implementation — pushes the *arguments object*,
 * not a broken arrow-scoped reference. This is what GTM expects.
 */
function gtag(...args: unknown[]): void {
  ensureDataLayer().push(args);
}

function applyConsentToGtag(state: ConsentState): void {
  gtag("consent", "update", {
    analytics_storage: state.analytics,
    ad_storage: state.marketing,
    ad_user_data: state.marketing,
    ad_personalization: state.marketing,
  });

  if (state.analytics === "granted") {
    gtag("event", "analytics_consent_granted");
  }
  if (state.marketing === "granted") {
    gtag("event", "marketing_consent_granted");
  }
}

/* -------------------------------------------------------------------------- */
/*                              Toggle primitive                              */
/* -------------------------------------------------------------------------- */

interface ConsentToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

function ConsentToggle({
  id,
  label,
  description,
  checked,
  onChange,
}: ConsentToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <label htmlFor={id} className="cursor-pointer">
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
          {description}
        </span>
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 data-[state=on]:bg-blue-500/80 data-[state=off]:bg-white/10"
        data-state={checked ? "on" : "off"}
      >
        <span
          className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform data-[state=on]:translate-x-6 data-[state=off]:translate-x-1"
          data-state={checked ? "on" : "off"}
        />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Main component                              */
/* -------------------------------------------------------------------------- */

export default function CookieConsent(): ReactNode {
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);

  const panelRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  /* ----------------------------- hydration ----------------------------- */
  useEffect(() => {
    setHydrated(true);

    const stored = parseStoredConsent(safeGetItem(CONSENT_STORAGE_KEY));

    if (stored) {
      setDraft(stored);
      applyConsentToGtag(stored);
    } else {
      setVisible(true);
    }
  }, []);

  /* ------------------------- cross-tab sync ---------------------------- */
  useEffect(() => {
    if (!hydrated) return;

    const onStorage = (e: StorageEvent) => {
      if (e.key !== CONSENT_STORAGE_KEY) return;
      const next = parseStoredConsent(e.newValue);
      if (!next) return;
      setDraft(next);
      setVisible(false);
      applyConsentToGtag(next);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hydrated]);

  /* ------------------------- focus management -------------------------- */
  useEffect(() => {
    if (!visible || !hydrated) return;

    const prevActive = document.activeElement as HTMLElement | null;
    // Defer focus until panel is painted
    const id = window.setTimeout(() => {
      primaryBtnRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setVisible(false);
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKeyDown);
      prevActive?.focus?.();
    };
  }, [visible, hydrated]);

  /* ------------------------- commit consent ---------------------------- */
  const commit = useCallback((next: ConsentState) => {
    const payload: StoredConsent = { ...next, savedAt: Date.now() };
    safeSetItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    applyConsentToGtag(next);
    dispatchConsentEvent(next);
    setDraft(next);
    setVisible(false);
    setShowDetails(false);
  }, []);

  const acceptAll = useCallback(
    () => commit({ analytics: "granted", marketing: "granted", version: CONSENT_VERSION }),
    [commit],
  );
  const rejectAll = useCallback(
    () => commit({ ...DEFAULT_CONSENT }),
    [commit],
  );
  const saveChoices = useCallback(() => commit(draft), [commit, draft]);

  const statusLabel = useMemo(() => {
    if (!hydrated) return "Loading…";
    return visible ? "Preferences open" : "Preferences saved";
  }, [hydrated, visible]);

  /* ----------------------------- render -------------------------------- */
  if (!hydrated) return null;

  return (
    <>
      {/* Persisted cookie button — reopens the panel */}
      {!visible && (
        <button
          type="button"
          onClick={() => setVisible(true)}
          aria-label="Manage cookie preferences"
          title="Cookie preferences"
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111318] text-zinc-400 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-blue-500/50 hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none"
        >
          <Cookie size={19} aria-hidden />
        </button>
      )}

      {/* Screen reader live region for state changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusLabel}
      </div>

      {visible && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-white/10 bg-[#111318]/95 text-white shadow-[0_-10px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl motion-safe:animate-[slideUp_240ms_ease-out]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Info block */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <ShieldCheck size={22} aria-hidden />
              </div>

              <div className="min-w-0">
                <h2
                  id="cookie-consent-title"
                  className="text-sm font-semibold text-white sm:text-base"
                >
                  Privacy preferences
                </h2>

                <p
                  id="cookie-consent-desc"
                  className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400 sm:text-sm"
                >
                  We use optional cookies to understand traffic patterns and,
                  with your permission, to personalize content. You can change
                  these choices anytime via the cookie button.
                </p>

                {showDetails && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <ConsentToggle
                      id="consent-analytics"
                      label="Analytics"
                      description="Anonymous usage metrics to improve performance."
                      checked={draft.analytics === "granted"}
                      onChange={(on) =>
                        setDraft((d) => ({
                          ...d,
                          analytics: on ? "granted" : "denied",
                        }))
                      }
                    />
                    <ConsentToggle
                      id="consent-marketing"
                      label="Marketing"
                      description="Allows ad partners to personalize content."
                      checked={draft.marketing === "granted"}
                      onChange={(on) =>
                        setDraft((d) => ({
                          ...d,
                          marketing: on ? "granted" : "denied",
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-col gap-3 lg:items-end">
              <div className="grid grid-cols-2 gap-3 lg:flex lg:items-center">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Reject all
                </button>
                <button
                  ref={primaryBtnRef}
                  type="button"
                  onClick={acceptAll}
                  className="rounded-full border border-blue-500/40 bg-blue-500/90 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Accept all
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 text-xs text-zinc-400">
                <button
                  type="button"
                  onClick={() => setShowDetails((s) => !s)}
                  aria-expanded={showDetails}
                  aria-controls="cookie-consent-title"
                  className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  {showDetails ? "Hide details" : "Customize"}
                </button>

                {showDetails && (
                  <button
                    type="button"
                    onClick={saveChoices}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    Save choices
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  aria-label="Dismiss"
                  className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  <X size={14} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind keyframe — add to tailwind.config if not present */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[slideUp_240ms_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}