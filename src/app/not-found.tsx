import Link from "next/link";
import { Container } from "@/components/Container";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="py-20">
      <p className="data-label">Page not found</p>
      <h1 className="mt-2 font-display text-4xl font-medium text-navy">We can&apos;t find that page</h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for does not exist. Start from the homepage or contact us for help.
      </p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          WhatsApp us
        </a>
      </div>
    </Container>
  );
}
