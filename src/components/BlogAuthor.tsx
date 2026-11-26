import Image from "next/image";
import Link from "next/link";
import { BLOG_AUTHOR, SITE } from "@/lib/site";

type BlogAuthorProps = {
  variant?: "byline" | "card";
  date?: string;
};

export function BlogAuthor({ variant = "byline", date }: BlogAuthorProps) {
  const profileHref = BLOG_AUTHOR.profilePath;

  if (variant === "card") {
    return (
      <aside className="max-w-3xl rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <p className="data-label">Written by</p>
        <div className="mt-4 flex min-w-0 gap-4">
          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-neutral sm:h-24 sm:w-20">
            <Image
              src={BLOG_AUTHOR.image}
              alt={BLOG_AUTHOR.name}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          </div>
          <div className="min-w-0">
            <Link
              href={profileHref}
              className="font-display text-lg font-medium tracking-tight text-navy hover:text-accent"
            >
              {BLOG_AUTHOR.name}
            </Link>
            <p className="mt-0.5 text-sm font-semibold text-accent">
              {BLOG_AUTHOR.role}, {SITE.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{BLOG_AUTHOR.bio}</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral">
        <Image
          src={BLOG_AUTHOR.image}
          alt=""
          fill
          className="object-cover object-top"
          sizes="40px"
        />
      </div>
      <div className="min-w-0 text-sm">
        <p className="font-medium text-navy">
          <span className="text-muted">By </span>
          <Link href={profileHref} className="hover:text-accent">
            {BLOG_AUTHOR.name}
          </Link>
        </p>
        <p className="text-muted">
          {BLOG_AUTHOR.role}
          {date ? (
            <>
              <span aria-hidden> · </span>
              <time dateTime={date}>{date}</time>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}
