import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white/70 pb-[max(3.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block max-w-full">
              <Image
                src={SITE.footerLogo}
                alt={SITE.name}
                width={220}
                height={44}
                className="h-9 w-auto max-w-[200px] object-contain object-left sm:h-10"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Helping international patients and families plan treatment in India with clear costs,
              trusted hospitals, and end-to-end support.
            </p>
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a
                href={`tel:${SITE.phone}`}
                className="font-medium text-white transition-colors duration-150 hover:text-accent-light"
              >
                Call {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white transition-colors duration-150 hover:text-accent-light"
              >
                WhatsApp {SITE.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-white transition-colors duration-150 hover:text-accent-light"
              >
                {SITE.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-white/45">Hyderabad, India</p>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Follow us
              </p>
              <div className="mt-3">
                <SocialLinks variant="dark" />
              </div>
            </div>
          </div>

          <FooterColumn title="Treatments" links={FOOTER_LINKS.treatments} />
          <FooterColumn title="Countries" links={FOOTER_LINKS.countries} />
          <FooterColumn title="For Patients" links={FOOTER_LINKS.patients} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
        </div>

        <div className="mt-12 space-y-3 border-t border-white/10 pt-6 text-sm text-white/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved. A brand of{" "}
              <a
                href="https://www.techdr.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-accent-light"
              >
                {SITE.legalName}
              </a>
              .
            </p>
            <p>Partnered with {SITE.hospitalCount} hospitals across India.</p>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed text-white/35">
            {SITE.ownershipDeclaration}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/55 transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
