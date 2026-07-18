import { NextResponse } from "next/server";
import { Resend } from "resend";
import { AFRICAN_COUNTRY_GROUPS } from "@/lib/african-content";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL;

const AFRICAN_COUNTRIES = new Set(
  AFRICAN_COUNTRY_GROUPS.flatMap((group) => group.countries.map((country) => country.toLowerCase()))
);

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
const RATE_LIMIT_MAX = 3;
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function subjectFlag(country: string) {
  const map: Record<string, string> = {
    nigeria: "🇳🇬",
    kenya: "🇰🇪",
    ghana: "🇬🇭",
    ethiopia: "🇪🇹",
    tanzania: "🇹🇿",
    zimbabwe: "🇿🇼",
    sudan: "🇸🇩",
    cameroon: "🇨🇲",
    uganda: "🇺🇬",
    zambia: "🇿🇲",
    southafrica: "🇿🇦",
    rwanda: "🇷🇼",
  };

  const key = country.toLowerCase().replace(/\s+/g, "");
  return map[key] || "🌍";
}

function isJsonPreferred(request: Request) {
  return request.headers.get("accept")?.includes("application/json");
}

function errorResponse(request: Request, message: string, status = 400) {
  if (isJsonPreferred(request)) {
    return NextResponse.json({ ok: false, error: message }, { status });
  }

  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Unable to submit</title>
      <style>
        body{margin:0;font-family:system-ui,sans-serif;background:#F4F6F5;color:#111B1A}
        .wrap{max-width:640px;margin:64px auto;padding:24px}
        .card{background:#fff;border:1px solid #DDE5E3;border-radius:14px;padding:32px;box-shadow:0 18px 40px rgba(17,27,26,.06)}
        a{color:#0A3D35}
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#4A5E5C">Submission error</p>
          <h1 style="margin:0 0 16px;font-size:32px;color:#0A3D35">We could not send your request.</h1>
          <p style="margin:0 0 20px;line-height:1.8;color:#4A5E5C">${escapeHtml(message)}</p>
          <a href="/african">Go back to the form</a>
        </div>
      </div>
    </body>
  </html>`;

  return new NextResponse(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  if (!resendApiKey || !contactToEmail) {
    return errorResponse(request, "The lead form is not configured yet. Please try WhatsApp instead.", 500);
  }

  const now = Date.now();
  cleanupRateLimitStore(now);

  const ip = getClientIp(request);
  const attempts = rateLimitStore.get(ip) || [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentAttempts.length >= RATE_LIMIT_MAX) {
    return errorResponse(request, "Too many submissions from this connection. Please try again in an hour.", 429);
  }

  const formData = await request.formData();

  if (String(formData.get("company") || "").trim() !== "") {
    return errorResponse(request, "Spam protection triggered.", 400);
  }

  const fullName = String(formData.get("fullName") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const patientAge = String(formData.get("patientAge") || "").trim();
  const outsideIndia = String(formData.get("outsideIndia") || "").trim();
  const medicalCondition = String(formData.get("medicalCondition") || "").trim();
  const treatmentType = String(formData.get("treatmentType") || "").trim();
  const urgency = String(formData.get("urgency") || "").trim();
  const travelTimeline = String(formData.get("travelTimeline") || "").trim();
  const visaAssistance = String(formData.get("visaAssistance") || "").trim();
  const homeEstimate = String(formData.get("homeEstimate") || "").trim();
  const heardAbout = String(formData.get("heardAbout") || "").trim();
  const consent = String(formData.get("consent") || "").trim();
  const utmSource = String(formData.get("utm_source") || "").trim();
  const utmMedium = String(formData.get("utm_medium") || "").trim();
  const utmCampaign = String(formData.get("utm_campaign") || "").trim();
  const utmTerm = String(formData.get("utm_term") || "").trim();
  const utmContent = String(formData.get("utm_content") || "").trim();
  const gclid = String(formData.get("gclid") || "").trim();

  if (fullName.length < 3) {
    return errorResponse(request, "Please enter a full name with at least 3 characters.");
  }

  if (medicalCondition.length < 10) {
    return errorResponse(request, "Please describe the medical condition in at least 10 characters.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return errorResponse(request, "Please enter a valid email address.");
  }

  const emailDomain = email.split("@")[1] || "";
  if (DISPOSABLE_DOMAINS.has(emailDomain)) {
    return errorResponse(request, "Please use your regular email address, not a temporary inbox.");
  }

  if (!AFRICAN_COUNTRIES.has(country.toLowerCase())) {
    return errorResponse(request, "Please choose a country from Africa.");
  }

  if (!consent) {
    return errorResponse(request, "Please confirm consent before submitting.");
  }

  const reports = formData
    .getAll("reports")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (reports.length > 5) {
    return errorResponse(request, "Please upload no more than 5 reports.");
  }

  for (const report of reports) {
    if (report.size > 5 * 1024 * 1024) {
      return errorResponse(request, `${report.name} is larger than 5MB.`);
    }
  }

  const resend = new Resend(resendApiKey);
  const reference = `AFR-${now.toString().slice(-8)}`;

  const reportList = reports.length
    ? reports.map((report) => `<li>${escapeHtml(report.name)}</li>`).join("")
    : "<li>No files uploaded</li>";

  const urgencyColor = urgency === "Emergency" ? "#D95F3B" : urgency === "Urgent" ? "#C8841A" : "#0A3D35";

  const html = `
    <div style="margin:0;background:#F4F6F5;padding:32px 16px;font-family:Inter,system-ui,sans-serif;color:#111B1A">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #DDE5E3;border-radius:18px;overflow:hidden;box-shadow:0 22px 50px rgba(17,27,26,0.08)">
        <div style="height:6px;background:#C8841A"></div>
        <div style="padding:32px">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#4A5E5C">African landing lead</p>
          <h1 style="margin:0 0 8px;font-size:34px;line-height:1.1;color:#0A3D35">New patient enquiry from ${escapeHtml(country)}</h1>
          <p style="margin:0;color:#4A5E5C;line-height:1.8">Reference ${reference} · Submitted by ${escapeHtml(fullName)}</p>

          <div style="margin-top:28px;border:1px solid #DDE5E3;border-radius:16px;background:#F9FBFA;padding:20px">
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px">
              ${emailCard("Patient name", fullName)}
              ${emailCard("Country", country)}
              ${emailCard("WhatsApp", whatsapp)}
              ${emailCard("Email", email)}
              ${emailCard("Age", patientAge)}
              ${emailCard("Outside India", outsideIndia)}
              ${emailCard("Treatment type", treatmentType)}
              ${emailCard("Travel timeline", travelTimeline)}
              ${emailCard("Visa assistance", visaAssistance)}
              ${emailCard("Home estimate", homeEstimate)}
              ${emailCard("How heard about us", heardAbout)}
              <div style="border:1px solid #DDE5E3;border-radius:14px;background:#fff;padding:14px">
                <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4A5E5C;margin-bottom:8px">Urgency</div>
                <span style="display:inline-block;border-radius:999px;padding:8px 12px;background:${urgencyColor};color:#fff;font-size:12px;font-weight:600">${escapeHtml(urgency)}</span>
              </div>
            </div>
          </div>

          <div style="margin-top:24px;border-radius:16px;background:#FFF8EC;border:1px solid #F1D4A4;padding:20px">
            <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#A86C10;margin-bottom:10px">Medical condition</div>
            <div style="font-size:15px;line-height:1.9;color:#111B1A">${escapeHtml(medicalCondition)}</div>
          </div>

          <div style="margin-top:24px;border:1px solid #DDE5E3;border-radius:16px;padding:20px">
            <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4A5E5C;margin-bottom:10px">Tracking</div>
            <table style="width:100%;border-collapse:collapse">
              <tbody>
                ${emailRow("UTM source", utmSource || "—")}
                ${emailRow("UTM medium", utmMedium || "—")}
                ${emailRow("UTM campaign", utmCampaign || "—")}
                ${emailRow("UTM term", utmTerm || "—")}
                ${emailRow("UTM content", utmContent || "—")}
                ${emailRow("GCLID", gclid || "—")}
                ${emailRow("IP", ip)}
              </tbody>
            </table>
          </div>

          <div style="margin-top:24px;border:1px solid #DDE5E3;border-radius:16px;padding:20px">
            <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4A5E5C;margin-bottom:10px">Uploaded reports</div>
            <ul style="margin:0;padding-left:18px;line-height:1.8;color:#111B1A">${reportList}</ul>
          </div>
        </div>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "Medical Tours India <onboarding@resend.dev>",
    to: contactToEmail,
    replyTo: email,
    subject: `${subjectFlag(country)} New lead: ${fullName} — ${treatmentType} (${urgency})`,
    html,
    text: [
      `Reference: ${reference}`,
      `Name: ${fullName}`,
      `Country: ${country}`,
      `WhatsApp: ${whatsapp}`,
      `Email: ${email}`,
      `Age: ${patientAge}`,
      `Outside India: ${outsideIndia}`,
      `Treatment type: ${treatmentType}`,
      `Urgency: ${urgency}`,
      `Travel timeline: ${travelTimeline}`,
      `Visa assistance: ${visaAssistance}`,
      `Home estimate: ${homeEstimate}`,
      `How heard about us: ${heardAbout}`,
      `Medical condition: ${medicalCondition}`,
      `UTM source: ${utmSource || "—"}`,
      `UTM medium: ${utmMedium || "—"}`,
      `UTM campaign: ${utmCampaign || "—"}`,
      `GCLID: ${gclid || "—"}`,
      `Files: ${reports.map((report) => report.name).join(", ") || "None"}`,
    ].join("\n"),
  });

  rateLimitStore.set(ip, [...recentAttempts, now]);

  if (isJsonPreferred(request)) {
    return NextResponse.json({ ok: true, reference });
  }

  return NextResponse.redirect(new URL("/thank-you", request.url), 303);
}

function emailCard(label: string, value: string) {
  return `
    <div style="border:1px solid #DDE5E3;border-radius:14px;background:#fff;padding:14px">
      <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4A5E5C;margin-bottom:8px">${escapeHtml(label)}</div>
      <div style="font-size:14px;line-height:1.7;color:#111B1A">${escapeHtml(value || "—")}</div>
    </div>
  `;
}

function emailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-top:1px solid #DDE5E3;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#4A5E5C">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-top:1px solid #DDE5E3;text-align:right;color:#111B1A">${escapeHtml(value)}</td>
    </tr>
  `;
}
