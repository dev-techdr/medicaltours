type AnswerBlockProps = {
  children: React.ReactNode;
  label?: string;
};

/** Answer-first paragraph for AEO / featured snippets (40–60 words ideal). */
export function AnswerBlock({ children, label = "In short" }: AnswerBlockProps) {
  return (
    <div className="rounded-[var(--radius)] border border-line bg-white px-5 py-5 shadow-[var(--shadow-soft)] sm:px-6 sm:py-6">
      <p className="data-label">{label}</p>
      <p className="mt-2.5 text-base leading-relaxed text-ink sm:text-lg">{children}</p>
    </div>
  );
}
