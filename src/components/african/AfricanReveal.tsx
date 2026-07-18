"use client";

import { type ReactNode } from "react";

type AfricanRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "scale";
  as?: "div" | "section" | "article" | "li";
  eager?: boolean;
};

/**
 * Lightweight entrance wrapper for the African ads landing page.
 * Content stays visible by default — never hide copy behind opacity:0
 * (Google Ads visitors must see text immediately).
 */
export function AfricanReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: AfricanRevealProps) {
  return (
    <Tag
      className={`african-enter ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
