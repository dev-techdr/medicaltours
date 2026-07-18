import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ReactNode } from "react";

const components = {
  h2: (props: { children?: ReactNode }) => (
    <h2
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
};

type MdxContentProps = {
  source: string;
  className?: string;
};

export function MdxContent({ source, className = "" }: MdxContentProps) {
  if (!source.trim()) return null;

  return (
    <div className={`max-w-3xl ${className}`}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
