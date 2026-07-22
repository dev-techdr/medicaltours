import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { DepthSection } from "@/lib/data";

type DepthSectionsProps = {
  sections: DepthSection[];
  className?: string;
};

export function DepthSections({ sections, className = "" }: DepthSectionsProps) {
  if (!sections.length) return null;

  return (
    <div className={`space-y-12 ${className}`}>
      {sections.map((section) => (
        <Reveal key={section.id}>
          <section aria-labelledby={`depth-${section.id}`} className="max-w-3xl">
            <h2
              id={`depth-${section.id}`}
              className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
            >
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.bullets?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink">
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {section.links?.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-accent hover:border-accent"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        </Reveal>
      ))}
    </div>
  );
}
