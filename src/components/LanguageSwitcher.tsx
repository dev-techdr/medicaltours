"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import {
  LANGUAGE_OPTIONS,
  SITE,
  type SiteLanguageCode,
} from "@/lib/site";

const STORAGE_KEY = "preferred-lang";
const SCRIPT_ID = "google-translate-script";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

function isSiteLanguage(value: string): value is SiteLanguageCode {
  return LANGUAGE_OPTIONS.some((option) => option.code === value);
}

function readStoredLanguage(): SiteLanguageCode {
  if (typeof window === "undefined") return SITE.defaultLocale;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSiteLanguage(stored)) return stored;
  } catch {
    /* ignore */
  }
  return SITE.defaultLocale;
}

const languageListeners = new Set<() => void>();

function emitLanguageChange() {
  for (const listener of languageListeners) listener();
}

function subscribeLanguage(listener: () => void) {
  languageListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    languageListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getLanguageSnapshot(): SiteLanguageCode {
  return readStoredLanguage();
}

function getServerLanguageSnapshot(): SiteLanguageCode {
  return SITE.defaultLocale;
}

function persistLanguage(lang: SiteLanguageCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  emitLanguageChange();
}

function setGoogTransCookie(lang: SiteLanguageCode) {
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  const paths = ["/", ""];

  for (const path of paths) {
    document.cookie = `googtrans=; ${expire}; path=${path || "/"}`;
    document.cookie = `googtrans=; ${expire}; path=${path || "/"}; domain=${host}`;
    if (host.includes(".")) {
      document.cookie = `googtrans=; ${expire}; path=${path || "/"}; domain=.${host}`;
    }
  }

  if (lang !== SITE.defaultLocale) {
    const value = `/en/${lang}`;
    document.cookie = `googtrans=${value}; path=/`;
    if (host.includes(".")) {
      document.cookie = `googtrans=${value}; path=/; domain=.${host}`;
    }
  }
}

function applyDocumentLang(lang: SiteLanguageCode) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function ensureTranslateHost() {
  if (document.getElementById("google_translate_element")) return;
  const host = document.createElement("div");
  host.id = "google_translate_element";
  host.setAttribute("aria-hidden", "true");
  host.style.display = "none";
  document.body.appendChild(host);
}

function loadGoogleTranslate(): Promise<void> {
  ensureTranslateHost();

  if (window.google?.translate?.TranslateElement) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Translate script failed")), {
        once: true,
      });
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        reject(new Error("Translate API missing"));
        return;
      }
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
      resolve();
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => reject(new Error("Translate script failed"));
    document.body.appendChild(script);
  });
}

type LanguageSwitcherProps = {
  className?: string;
  /** Wider trigger for mobile menu rows */
  fullWidth?: boolean;
};

export function LanguageSwitcher({ className = "", fullWidth = false }: LanguageSwitcherProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const current = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );

  useEffect(() => {
    applyDocumentLang(current);

    if (current !== SITE.defaultLocale) {
      setGoogTransCookie(current);
      void loadGoogleTranslate().catch(() => {
        /* translation unavailable — UI still shows preference */
      });
    }
  }, [current]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectLanguage = async (lang: SiteLanguageCode) => {
    setOpen(false);
    if (lang === current) return;

    persistLanguage(lang);
    setGoogTransCookie(lang);
    applyDocumentLang(lang);

    if (lang === SITE.defaultLocale) {
      window.location.reload();
      return;
    }

    try {
      await loadGoogleTranslate();
    } catch {
      /* still reload so cookie-based translate can apply on next paint */
    }
    window.location.reload();
  };

  const active = LANGUAGE_OPTIONS.find((option) => option.code === current) ?? LANGUAGE_OPTIONS[0];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-2 text-sm font-medium text-navy transition-colors hover:border-accent/40 hover:bg-accent-light ${
          fullWidth ? "w-full justify-between px-3 py-2.5" : ""
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`Language: ${active.label}`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="inline-flex items-center gap-1.5">
          <svg
            className="h-4 w-4 shrink-0 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3z"
            />
          </svg>
          <span className="uppercase tracking-wide">{active.code}</span>
        </span>
        <svg
          className={`h-3.5 w-3.5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Select language"
          className={`absolute z-50 mt-1.5 min-w-[11rem] overflow-hidden rounded-[var(--radius-sm)] border border-line bg-white py-1 shadow-[var(--shadow-soft)] ${
            fullWidth ? "left-0 right-0" : "right-0"
          }`}
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const selected = option.code === current;
            return (
              <li key={option.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-accent-light ${
                    selected ? "bg-accent-light/70 font-semibold text-navy" : "text-ink"
                  }`}
                  onClick={() => void selectLanguage(option.code)}
                >
                  <span>{option.nativeLabel}</span>
                  <span className="text-xs uppercase tracking-wide text-muted">{option.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
