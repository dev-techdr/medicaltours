"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { HeroTypingHeadline } from "@/components/HeroTypingHeadline";
import { SITE } from "@/lib/site";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroIntroCopy() {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const [showRest, setShowRest] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setTimeout(() => setShowRest(false), 0);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  const handleComplete = useCallback(() => setShowRest(true), []);

  return (
    <div className="max-w-2xl">
      <HeroTypingHeadline
        onComplete={handleComplete}
        className="font-display text-[2.35rem] font-medium leading-[1.05] tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]"
      />

      <div
        className={`transition-all duration-700 ease-out ${
          showRest ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <p className="mt-4 max-w-xl text-base font-medium leading-snug text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] sm:mt-5 sm:text-xl sm:leading-snug">
          Your treatment in India, planned before you land.
        </p>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] sm:mt-4 sm:text-base">
          Hospital matched, costs confirmed, visa sorted. One care team from your first message to
          the day you fly home.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <Link href="/contact-us#enquiry-form" className="btn btn-light w-full sm:w-auto">
            Get a treatment estimate
          </Link>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full sm:w-auto"
          >
            Free WhatsApp consultation
          </a>
        </div>
      </div>
    </div>
  );
}
