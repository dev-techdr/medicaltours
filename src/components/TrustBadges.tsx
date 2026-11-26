import { IconTile, TrustSignalIcon } from "@/components/HomeIcons";
import { SITE, TRUST_SIGNALS } from "@/lib/site";

type TrustBadgesProps = {
  variant?: "bar" | "grid";
};

export function TrustBadges({ variant = "bar" }: TrustBadgesProps) {
  if (variant === "grid") {
    return (
      <div className="divider-grid sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_SIGNALS.map((signal) => (
          <div key={signal.label} className="flex items-start gap-3">
            <IconTile>
              <TrustSignalIcon icon={signal.icon} />
            </IconTile>
            <p className="text-sm font-semibold leading-snug text-navy">{signal.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/25 pt-5">
      <li className="text-sm font-medium text-white">{SITE.hospitalCount} hospital partners</li>
      <li className="hidden text-white/50 sm:inline" aria-hidden>
        ·
      </li>
      <li className="text-sm font-medium text-white">{SITE.teamCount} care team</li>
      <li className="hidden text-white/50 sm:inline" aria-hidden>
        ·
      </li>
      <li className="text-sm font-medium text-white">{SITE.patientCount} patients assisted</li>
    </ul>
  );
}
