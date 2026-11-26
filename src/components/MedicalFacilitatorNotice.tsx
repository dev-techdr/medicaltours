import Link from "next/link";
import { MEDICAL_FACILITATOR_NOTICE } from "@/lib/site";

type MedicalFacilitatorNoticeProps = {
  className?: string;
};

export function MedicalFacilitatorNotice({
  className = "",
}: MedicalFacilitatorNoticeProps) {
  return (
    <aside
      className={`rounded-[var(--radius-sm)] border border-line bg-neutral/40 px-5 py-4 text-sm leading-relaxed text-muted ${className}`}
      aria-label="Medical facilitator notice"
    >
      {MEDICAL_FACILITATOR_NOTICE}{" "}
      <Link href="/medical-disclaimer" className="font-semibold text-accent hover:underline">
        Read our medical disclaimer.
      </Link>
    </aside>
  );
}
