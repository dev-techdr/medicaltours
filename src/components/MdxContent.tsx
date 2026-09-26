import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ReactNode } from "react";
import remarkGfm from "remark-gfm";

export function mdxHeadingId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

const components = {
  h2: (props: { children?: ReactNode }) => (
    <h2
      id={mdxHeadingId(String(props.children ?? ""))}
      className="mt-10 font-display text-2xl font-medium tracking-tight text-navy"
      {...props}
    />
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3 className="mt-8 font-display text-xl font-medium text-navy" {...props} />
  ),
  p: (props: { children?: ReactNode }) => (
    <p className="mt-4 text-base leading-relaxed text-ink" {...props} />
  ),
  ul: (props: { children?: ReactNode }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-ink" {...props} />
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink" {...props} />
  ),
  li: (props: { children?: ReactNode }) => <li className="leading-relaxed" {...props} />,
  a: (props: { href?: string; children?: ReactNode }) => {
    const href = props.href ?? "#";
    const className = "font-medium text-accent underline-offset-2 hover:underline";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {props.children}
        </Link>
      );
    }
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  },
  strong: (props: { children?: ReactNode }) => (
    <strong className="font-semibold text-navy" {...props} />
  ),
  blockquote: (props: { children?: ReactNode }) => (
    <blockquote
      className="mt-6 border-l-4 border-accent bg-accent-light/50 py-2 pl-4 text-ink"
      {...props}
    />
  ),
  table: (props: { children?: ReactNode }) => (
    <div className="mt-6 overflow-x-auto rounded-[var(--radius)] border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm text-ink" {...props} />
    </div>
  ),
  thead: (props: { children?: ReactNode }) => (
    <thead className="bg-navy/5 text-navy" {...props} />
  ),
  tbody: (props: { children?: ReactNode }) => <tbody {...props} />,
  tr: (props: { children?: ReactNode }) => (
    <tr className="border-b border-line last:border-b-0" {...props} />
  ),
  th: (props: { children?: ReactNode }) => (
    <th className="px-4 py-3 font-semibold" {...props} />
  ),
  td: (props: { children?: ReactNode }) => (
    <td className="px-4 py-3 align-top leading-relaxed" {...props} />
  ),
  img: (props: { src?: string; alt?: string }) => (
    // Content images are local markdown assets, not remote URLs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.src}
      alt={props.alt ?? ""}
      className="mt-6 w-full rounded-[var(--radius)] object-cover"
    />
  ),
};

type MdxContentProps = {
  source: string;
  className?: string;
};

export function MdxContent({ source, className = "" }: MdxContentProps) {
  if (!source.trim()) return null;

  return (
    <div className={`max-w-3xl ${className}`}>
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
