import { NextResponse } from "next/server";
import { Resend } from "resend";
import { patientConfirmationEmail, teamEnquiryEmail } from "@/lib/enquiry-emails";
import { SITE } from "@/lib/site";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL || SITE.email;
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL || "Medical Tours India <onboarding@resend.dev>";

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "yopmail.com",
  "throwam.com",
  "spamgourmet.com",
  "fakeinbox.com",
  "maildrop.cc",
]);

const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function cleanupRateLimitStore(now: number) {
  for (const [ip, attempts] of rateLimitStore.entries()) {
    const recent = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, recent);
    }
  }
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (!resendApiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "The enquiry form is not configured yet. Please try WhatsApp instead.",
      },
      { status: 500 }
    );
  }

  const now = Date.now();
  cleanupRateLimitStore(now);

  const ip = getClientIp(request);
  const attempts = rateLimitStore.get(ip) || [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentAttempts.length >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in an hour or WhatsApp us." },
      { status: 429 }
    );
  }

  const formData = await request.formData();

  if (String(formData.get("company") || "").trim() !== "") {
    return NextResponse.json({ ok: false, error: "Spam protection triggered." }, { status: 400 });
  }

  const fullName = String(formData.get("fullName") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const country = String(formData.get("country") || "").trim();
  const treatment = String(formData.get("treatment") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const preferredCity = String(formData.get("preferredCity") || "").trim();
  const sourcePage = String(formData.get("sourcePage") || "").trim();
  const consent = String(formData.get("consent") || "").trim();

  if (fullName.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
  }

  if (whatsapp.length < 7) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid WhatsApp or phone number." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const emailDomain = email.split("@")[1] || "";
  if (DISPOSABLE_DOMAINS.has(emailDomain)) {
    return NextResponse.json(
      { ok: false, error: "Please use your regular email address, not a temporary inbox." },
      { status: 400 }
    );
  }

  if (country.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your country." }, { status: 400 });
  }

  if (!treatment) {
    return NextResponse.json(
      { ok: false, error: "Please select a treatment interest." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please describe your condition or needs (at least 10 characters)." },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Please confirm consent before submitting." },
      { status: 400 }
    );
  }

  const resend = new Resend(resendApiKey);
  const reference = `MTI-${now.toString().slice(-8)}`;
  const payload = {
    reference,
    fullName,
    whatsapp,
    email,
    country,
    treatment,
    preferredCity,
    message,
    sourcePage: sourcePage || undefined,
    ip,
  };

  const teamMail = teamEnquiryEmail(payload);
  const patientMail = patientConfirmationEmail(payload);

  // 1) Receiver — your care team inbox
  const teamResult = await resend.emails.send({
    from: contactFromEmail,
    to: contactToEmail,
    replyTo: email,
    subject: teamMail.subject,
    html: teamMail.html,
    text: teamMail.text,
  });

  if (teamResult.error) {
    console.error("[contact] team email failed", teamResult.error);
    return NextResponse.json(
      { ok: false, error: "We could not send your enquiry. Please try WhatsApp." },
      { status: 502 }
    );
  }

  // 2) Sender — confirmation to the patient
  const patientResult = await resend.emails.send({
    from: contactFromEmail,
    to: email,
    replyTo: contactToEmail,
    subject: patientMail.subject,
    html: patientMail.html,
    text: patientMail.text,
  });

  if (patientResult.error) {
    console.error("[contact] patient confirmation failed", patientResult.error);
    // Team already notified — treat as success but log confirmation failure
  }

  rateLimitStore.set(ip, [...recentAttempts, now]);

  return NextResponse.json({ ok: true, reference });
}
