"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const LINE_1_PREFIX = "Spreading ";
const HIGHLIGHT = "Smiles";
const LINE_2 = "Across The Globe";
const FULL_TEXT = `${LINE_1_PREFIX}${HIGHLIGHT}\n${LINE_2}`;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type HeroTypingHeadlineProps = {
  className?: string;
  onComplete?: () => void;
};

export function HeroTypingHeadline({ className = "", onComplete }: HeroTypingHeadlineProps) {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const [charCount, setCharCount] = useState(FULL_TEXT.length);
  const [done, setDone] = useState(true);
  const [showCaret, setShowCaret] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const id = setTimeout(() => onComplete?.(), 0);
      return () => clearTimeout(id);
    }

    let i = 0;
    let tickId: ReturnType<typeof setTimeout>;

    const startId = setTimeout(() => {
      setCharCount(0);
      setDone(false);
      setShowCaret(true);

      const tick = () => {
        i += 1;
        setCharCount(i);

        if (i >= FULL_TEXT.length) {
          setDone(true);
          setShowCaret(false);
          onComplete?.();
          return;
        }

        const nextDelay = FULL_TEXT[i - 1] === "\n" ? 280 : 42;
        tickId = setTimeout(tick, nextDelay);
      };

      tickId = setTimeout(tick, 42);
    }, 360);

    return () => {
      clearTimeout(startId);
      clearTimeout(tickId);
    };
  }, [reduceMotion, onComplete]);

  const visible = FULL_TEXT.slice(0, charCount);
  const [visibleLine1 = "", visibleLine2 = ""] = visible.split("\n");
  const line1PrefixShown = visibleLine1.slice(0, LINE_1_PREFIX.length);
  const highlightShown = visibleLine1.slice(LINE_1_PREFIX.length);

  return (
    <h1 className={className} aria-label="Spreading Smiles Across The Globe">
      <span aria-hidden>
        {line1PrefixShown}
        <span className="text-[#E8C478]">{highlightShown}</span>
        {visible.includes("\n") ? (
          <>
            <br />
            {visibleLine2}
          </>
        ) : null}
        {showCaret && !done ? (
          <span className="hero-typing-caret ml-0.5 inline-block align-[-0.08em]" />
        ) : null}
      </span>
    </h1>
  );
}
