import type { Testimonial } from "@/lib/data";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <blockquote className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-1 text-accent" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <span key={index} aria-hidden>
            ★
          </span>
        ))}
      </div>
      <p className="mt-3 text-base leading-relaxed text-navy">&ldquo;{testimonial.summary}&rdquo;</p>
      <p className="mt-3 text-sm text-muted">{testimonial.outcome}</p>
      <footer className="mt-5 border-t border-line pt-4">
        <p className="text-sm font-semibold text-navy">{testimonial.patientName}</p>
        <p className="text-sm text-muted">
          {testimonial.country} · {testimonial.treatment} · {testimonial.hospital}
        </p>
      </footer>
    </blockquote>
  );
}
