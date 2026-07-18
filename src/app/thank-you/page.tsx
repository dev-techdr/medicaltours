import Link from "next/link";
import { SITE } from "@/lib/site";

export default function ThankYouPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[var(--radius)] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
        <p className="data-label justify-center">Thank you</p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          Your enquiry has been received
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Our care team will review your details and get back within 24–48 hours with hospital
          options and next steps.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Message on WhatsApp
          </a>
          <Link href="/" className="btn btn-outline">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
