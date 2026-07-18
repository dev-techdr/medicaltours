"use client";

import { useEffect, useState } from "react";

type AfricanMobileStickyBarProps = {
  targetId: string;
};

export function AfricanMobileStickyBar({ targetId }: AfricanMobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (window.matchMedia("(min-width: 768px)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#b74f31] bg-[#D95F3B] px-4 py-3 text-white shadow-[0_-12px_30px_rgba(17,27,26,0.18)] transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href="#lead-form"
        className="flex items-center justify-center rounded-[14px] border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold tracking-[-0.01em]"
      >
        Get Free Estimate
      </a>
    </div>
  );
}
