import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconClipboard({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M9 4h6M9 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

export function IconPlane({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M10.5 19.5 17 12l-6.5-7.5M17 12H3" />
      <path d="m17 12 4 2.5M17 12l4-2.5" />
    </svg>
  );
}

export function IconShieldCheck({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 3 5 6v6c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.7-3.8" />
    </svg>
  );
}

export function IconSearch({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function IconReceipt({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M7 3h10v18l-2-1.2L13 21l-2-1.2L9 21l-2-1.2V3Z" />
      <path d="M10 8h4M10 12h4M10 16h2" />
    </svg>
  );
}

export function IconClock({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5l3 1.5" />
    </svg>
  );
}

export function IconUserOff({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.5c1.2-3 3.5-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
      <path d="m4 4 16 16" />
    </svg>
  );
}

export function IconStethoscope({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M7 3v6a5 5 0 0 0 10 0V3" />
      <path d="M7 5H5.5A2.5 2.5 0 0 0 3 7.5V9a6 6 0 0 0 6 6h1" />
      <circle cx="17" cy="17" r="3" />
      <path d="M17 14v-1a3 3 0 0 0-3-3" />
    </svg>
  );
}

export function IconHotel({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01" />
    </svg>
  );
}

export function IconLanguages({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M5 8h8M9 8c0 5-2 8-6 10M7.5 11.5C9 14 11 15.5 14 16" />
      <path d="m14 8 5 12M18.2 18H21M12.5 20l1.2-3" />
    </svg>
  );
}

export function IconHeartPulse({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      <path d="M8.5 11h2l1.2-2 1.6 4 1.2-2H16" />
    </svg>
  );
}

export function IconFileSearch({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M8 3h6l4 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4h4M10.5 14.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM13.2 15.2l1.5 1.5" />
    </svg>
  );
}

export function IconRoute({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M8 7.5c4 0 4 9 10 9" />
    </svg>
  );
}

export function IconConcierge({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M4 18h16M6 18V10a6 6 0 0 1 12 0v8" />
      <path d="M9 10V8a3 3 0 0 1 6 0v2M12 4v2" />
    </svg>
  );
}

export function IconHeart({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

export function IconShield({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 3 5 6v6c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
    </svg>
  );
}

export function IconTooth({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M7.3 4.5C8.6 4 10 4 12 5c2-1 3.4-1 4.7-.5 1.7.7 2.5 2.3 2.3 4.7-.3 3.6-2 10.8-4.2 10.8-1 0-1.3-1.3-1.6-2.7-.3-1.6-.6-3.2-1.2-3.2s-.9 1.6-1.2 3.2c-.3 1.4-.6 2.7-1.6 2.7-2.2 0-3.9-7.2-4.2-10.8-.2-2.4.6-4 2.3-4.7Z" />
    </svg>
  );
}

export function IconSpark({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    </svg>
  );
}

export function IconPath({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M5 19c4-8 10-8 14-14M6 8h5M13 15h5" />
    </svg>
  );
}

export function IconDrop({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 3s5 5.4 5 9a5 5 0 1 1-10 0c0-3.6 5-9 5-9Z" />
    </svg>
  );
}

export function IconFace({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 21a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm-3-7c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2M9 10h.01M15 10h.01" />
    </svg>
  );
}

export function IconMapPin({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export function IconHospital({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6" />
      <path d="M12 9v4M10 11h4" />
    </svg>
  );
}

export function IconUsers({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="9" cy="8" r="2.8" />
      <circle cx="17" cy="9.5" r="2.2" />
      <path d="M4.5 19c.8-2.8 2.6-4.2 4.5-4.2s3.7 1.4 4.5 4.2" />
      <path d="M14.5 17.5c.5-1.8 1.7-2.8 3-2.8 1.8 0 3.2 1.4 3.5 4.3" />
    </svg>
  );
}

export function IconBadgeCheck({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M12 3 5 6v6c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.7-3.8" />
    </svg>
  );
}

const TRUST_SIGNAL_ICON_MAP = {
  hospital: IconHospital,
  coordinators: IconUsers,
  accreditation: IconBadgeCheck,
  coordination: IconRoute,
} as const;

export type TrustSignalIconKey = keyof typeof TRUST_SIGNAL_ICON_MAP;

export function TrustSignalIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: TrustSignalIconKey;
  className?: string;
}) {
  const Icon = TRUST_SIGNAL_ICON_MAP[icon];
  return <Icon className={className} />;
}

/** Soft accent tile used next to section item titles */
export function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-accent-light text-accent">
      {children}
    </span>
  );
}

const TREATMENT_ICONS: Record<string, (props: IconProps) => ReactNode> = {
  Bariatric: IconPath,
  Oncology: IconShield,
  ENT: IconSpark,
  Cosmetic: IconFace,
  Dental: IconTooth,
  Cardiology: IconHeart,
  Orthopedics: IconPath,
  Transplant: IconDrop,
  IVF: IconSpark,
  Fertility: IconSpark,
  Neurosurgery: IconShield,
  Ophthalmology: IconSpark,
};

export function TreatmentCategoryIcon({
  category,
  className = "h-5 w-5",
}: {
  category: string;
  className?: string;
}) {
  const Icon = TREATMENT_ICONS[category] ?? IconStethoscope;
  return <Icon className={className} />;
}
