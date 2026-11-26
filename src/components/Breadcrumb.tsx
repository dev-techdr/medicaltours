import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/types";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** Use on dark hero backgrounds */
  tone?: "default" | "onDark";
};

export function Breadcrumb({ items, tone = "default" }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];
  const onDark = tone === "onDark";

  return (
    <nav aria-label="Breadcrumb" className="mb-6 min-w-0">
      <JsonLd data={breadcrumbSchema(allItems)} />
      <ol
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm ${
          onDark ? "text-white/65" : "text-muted"
        }`}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={item.href} className="flex min-w-0 max-w-full items-center gap-1.5">
              {index > 0 && (
                <span className={`shrink-0 ${onDark ? "text-white/35" : "text-line"}`}>/</span>
              )}
              {isLast ? (
                <span
                  className={`truncate font-medium ${onDark ? "text-white" : "text-navy"}`}
                  aria-current="page"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`shrink-0 transition-colors duration-150 ${
                    onDark ? "hover:text-white" : "hover:text-accent"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
