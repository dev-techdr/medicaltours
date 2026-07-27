import { SITE } from "@/lib/site";

export type EnquiryPayload = {
  reference: string;
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  treatment: string;
  preferredCity: string;
  message: string;
  sourcePage?: string;
  ip?: string;
  enquiryType?: "patient" | "hospital";
  hospitalName?: string;
  accreditation?: string;
  specialties?: string;
  designation?: string;
};

function isHospitalEnquiry(data: EnquiryPayload) {
  return data.enquiryType === "hospital" || Boolean(data.hospitalName);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #E6EDF2;width:38%;vertical-align:top;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6B7C8F;font-family:system-ui,sans-serif">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #E6EDF2;vertical-align:top;font-size:15px;line-height:1.55;color:#143352;font-family:system-ui,sans-serif;font-weight:600">
        ${escapeHtml(value || "—")}
      </td>
    </tr>
  `;
}

function emailShell(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  bodyHtml: string;
  footerNote: string;
}) {
  const brand = SITE.name;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:#EEF3F7">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#EEF3F7;padding:32px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #D7E0E8;border-radius:18px;overflow:hidden">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#1A7A72,#2A9B92);font-size:0;line-height:0">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:system-ui,sans-serif">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.02em;color:#1A7A72">${escapeHtml(brand)}</p>
              <p style="margin:6px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6B7C8F">${escapeHtml(opts.eyebrow)}</p>
              <h1 style="margin:14px 0 0;font-size:28px;line-height:1.2;color:#143352;font-weight:700">${escapeHtml(opts.title)}</h1>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#5B6B7C">${escapeHtml(opts.subtitle)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 28px;font-family:system-ui,sans-serif">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid #E6EDF2;background:#F7FAFC;font-family:system-ui,sans-serif">
              <p style="margin:0;font-size:13px;line-height:1.7;color:#5B6B7C">${opts.footerNote}</p>
              <p style="margin:14px 0 0;font-size:12px;color:#8A97A6">
                © ${year} ${escapeHtml(brand)} · Hyderabad, India<br />
                <a href="${SITE.url}" style="color:#1A7A72;text-decoration:none">${SITE.domain}</a>
                ·
                <a href="tel:${SITE.phone}" style="color:#1A7A72;text-decoration:none">${SITE.phoneDisplay}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Internal notification — received by your care team */
export function teamEnquiryEmail(data: EnquiryPayload) {
  const whatsappLink = `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`;
  const hospital = isHospitalEnquiry(data);

  const detailRows = hospital
    ? [
        detailRow("Hospital", data.hospitalName || "—"),
        detailRow("City", data.preferredCity || "Not specified"),
        detailRow("Accreditation", data.accreditation || "—"),
        detailRow("Specialties", data.specialties || "—"),
        detailRow("Contact person", data.fullName),
        detailRow("Designation", data.designation || "—"),
        detailRow("Phone", data.whatsapp),
        detailRow("Email", data.email),
        detailRow("Source page", data.sourcePage || "Website form"),
      ].join("")
    : [
        detailRow("Patient name", data.fullName),
        detailRow("WhatsApp / phone", data.whatsapp),
        detailRow("Email", data.email),
        detailRow("Country", data.country),
        detailRow("Treatment", data.treatment),
        detailRow("Preferred city", data.preferredCity || "Not specified"),
        detailRow("Source page", data.sourcePage || "Website form"),
      ].join("");

  const bodyHtml = `
    <div style="margin:0 0 18px;padding:14px 16px;border-radius:12px;background:#143352;color:#fff">
      <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.75">Reference</p>
      <p style="margin:6px 0 0;font-size:20px;font-weight:700;letter-spacing:.02em">${escapeHtml(data.reference)}</p>
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${detailRows}
    </table>

    <div style="margin-top:22px;padding:18px;border-radius:14px;background:#F0F9F8;border:1px solid #B8DDD9">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#1A7A72;font-weight:700">${
        hospital ? "Partnership notes" : "Medical condition / message"
      }</p>
      <p style="margin:0;font-size:15px;line-height:1.8;color:#143352;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>

    <div style="margin-top:22px">
      <a href="${whatsappLink}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#25D366;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Reply on WhatsApp</a>
      <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: ${data.reference} — ${SITE.name}`)}" style="display:inline-block;margin-left:8px;padding:12px 18px;border-radius:10px;background:#1A7A72;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Reply by email</a>
    </div>
  `;

  if (hospital) {
    return {
      subject: `Hospital empanelment · ${data.hospitalName || data.fullName} · ${data.preferredCity || "India"}`,
      html: emailShell({
        preheader: `Hospital partnership request ${data.reference}`,
        eyebrow: "Partnerships alert",
        title: "New hospital empanelment request",
        subtitle: "A hospital submitted an MOU / partnership application. Review and reply within 2–3 business days.",
        bodyHtml,
        footerNote: `Submitted from ${SITE.domain}${data.ip ? ` · IP ${escapeHtml(data.ip)}` : ""}. Reply-to is set to the hospital contact’s email.`,
      }),
      text: [
        `Hospital empanelment — ${data.reference}`,
        ``,
        `Hospital: ${data.hospitalName || "—"}`,
        `City: ${data.preferredCity || "—"}`,
        `Accreditation: ${data.accreditation || "—"}`,
        `Specialties: ${data.specialties || "—"}`,
        `Contact: ${data.fullName}`,
        `Designation: ${data.designation || "—"}`,
        `Phone: ${data.whatsapp}`,
        `Email: ${data.email}`,
        `Source page: ${data.sourcePage || "Website form"}`,
        ``,
        `Message:`,
        data.message,
      ].join("\n"),
    };
  }

  return {
    subject: `New patient enquiry · ${data.fullName} · ${data.treatment} (${data.country})`,
    html: emailShell({
      preheader: `New enquiry ${data.reference} from ${data.fullName}`,
      eyebrow: "Care team alert",
      title: "New patient enquiry received",
      subtitle: `A potential patient submitted the website form. Reply within 24–48 hours.`,
      bodyHtml,
      footerNote: `Submitted from ${SITE.domain}${data.ip ? ` · IP ${escapeHtml(data.ip)}` : ""}. Reply-to is set to the patient’s email.`,
    }),
    text: [
      `New patient enquiry — ${data.reference}`,
      ``,
      `Name: ${data.fullName}`,
      `WhatsApp: ${data.whatsapp}`,
      `Email: ${data.email}`,
      `Country: ${data.country}`,
      `Treatment: ${data.treatment}`,
      `Preferred city: ${data.preferredCity || "—"}`,
      `Source page: ${data.sourcePage || "Website form"}`,
      ``,
      `Message:`,
      data.message,
    ].join("\n"),
  };
}

/** Confirmation — sent to the patient (or hospital contact) who submitted the form */
export function patientConfirmationEmail(data: EnquiryPayload) {
  const firstName = data.fullName.split(/\s+/)[0] || data.fullName;
  const hospital = isHospitalEnquiry(data);
  const waHref = `${SITE.whatsappUrl}?text=${encodeURIComponent(
    hospital
      ? `Hi, I submitted hospital empanelment ${data.reference} for ${data.hospitalName || "our hospital"}.`
      : `Hi, I submitted enquiry ${data.reference}. Looking forward to your guidance.`
  )}`;

  if (hospital) {
    const bodyHtml = `
      <p style="margin:0;font-size:16px;line-height:1.75;color:#143352">
        Dear ${escapeHtml(firstName)},
      </p>
      <p style="margin:14px 0 0;font-size:15px;line-height:1.75;color:#5B6B7C">
        Thank you for applying to partner with <strong style="color:#143352">${SITE.name}</strong>. We have received the empanelment request for ${escapeHtml(data.hospitalName || "your hospital")} and our partnerships team will review it shortly.
      </p>

      <div style="margin:22px 0;padding:16px 18px;border-radius:14px;background:#F7FAFC;border:1px solid #E6EDF2">
        <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6B7C8F">Your reference</p>
        <p style="margin:8px 0 0;font-size:22px;font-weight:700;color:#1A7A72">${escapeHtml(data.reference)}</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#5B6B7C">Please keep this for follow-up calls or email threads.</p>
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
        ${detailRow("Hospital", data.hospitalName || "—")}
        ${detailRow("City", data.preferredCity || "—")}
        ${detailRow("Accreditation", data.accreditation || "—")}
        ${detailRow("Contact on file", data.whatsapp)}
      </table>

      <div style="margin-top:22px;padding:18px;border-radius:14px;background:#FFF8EC;border:1px solid #F1D4A4">
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#A86C10">What happens next</p>
        <ol style="margin:0;padding-left:18px;color:#143352;font-size:14px;line-height:1.85">
          <li>Our partnerships team reviews accreditation, specialties, and capacity (typically within 2–3 business days).</li>
          <li>We schedule a discovery call to discuss international patient volumes and MOU terms.</li>
          <li>If aligned, we draft an MOU and onboard your hospital into the referral workflow.</li>
        </ol>
      </div>

      <div style="margin-top:22px">
        <a href="mailto:${SITE.email}?subject=${encodeURIComponent(`Re: ${data.reference} — Hospital Empanelment`)}" style="display:inline-block;padding:13px 20px;border-radius:10px;background:#1A7A72;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Email partnerships</a>
        <a href="tel:${SITE.phone}" style="display:inline-block;margin-left:8px;padding:13px 20px;border-radius:10px;background:#143352;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Call ${SITE.phoneDisplay}</a>
      </div>
    `;

    return {
      subject: `Hospital empanelment received · ${data.reference} · ${SITE.name}`,
      html: emailShell({
        preheader: `Thanks ${firstName} — empanelment ${data.reference} is with our partnerships team.`,
        eyebrow: "Partnership confirmation",
        title: "We’ve received your empanelment request",
        subtitle: "Our team will review your hospital profile and follow up soon.",
        bodyHtml,
        footerNote: `This is an automated confirmation. For urgent partnership queries, email ${SITE.email} or call ${SITE.phoneDisplay}.`,
      }),
      text: [
        `Dear ${firstName},`,
        ``,
        `Thank you for applying to partner with ${SITE.name}.`,
        `Reference: ${data.reference}`,
        `Hospital: ${data.hospitalName || "—"}`,
        `City: ${data.preferredCity || "—"}`,
        ``,
        `What happens next:`,
        `1. Partnerships review within 2–3 business days.`,
        `2. Discovery call on volumes and MOU terms.`,
        `3. MOU draft and referral onboarding if aligned.`,
        ``,
        `Email: ${SITE.email}`,
        `Call: ${SITE.phoneDisplay}`,
        ``,
        `— ${SITE.name}, Hyderabad`,
      ].join("\n"),
    };
  }

  const bodyHtml = `
    <p style="margin:0;font-size:16px;line-height:1.75;color:#143352">
      Dear ${escapeHtml(firstName)},
    </p>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.75;color:#5B6B7C">
      Thank you for contacting <strong style="color:#143352">${SITE.name}</strong>. We have received your enquiry and our Hyderabad care team will review your details shortly.
    </p>

    <div style="margin:22px 0;padding:16px 18px;border-radius:14px;background:#F7FAFC;border:1px solid #E6EDF2">
      <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6B7C8F">Your reference</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:700;color:#1A7A72">${escapeHtml(data.reference)}</p>
      <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#5B6B7C">Please keep this for follow-up calls or WhatsApp messages.</p>
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${detailRow("Treatment interest", data.treatment)}
      ${detailRow("Country", data.country)}
      ${detailRow("Preferred city", data.preferredCity || "We’ll suggest based on your case")}
      ${detailRow("WhatsApp on file", data.whatsapp)}
    </table>

    <div style="margin-top:22px;padding:18px;border-radius:14px;background:#FFF8EC;border:1px solid #F1D4A4">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#A86C10">What happens next</p>
      <ol style="margin:0;padding-left:18px;color:#143352;font-size:14px;line-height:1.85">
        <li>A care coordinator reviews your message (typically within 24–48 hours).</li>
        <li>We shortlist accredited hospital options and a written cost estimate.</li>
        <li>We guide you on medical visa, travel, and stay if you choose to proceed.</li>
      </ol>
    </div>

    <div style="margin-top:22px">
      <a href="${waHref}" style="display:inline-block;padding:13px 20px;border-radius:10px;background:#25D366;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Chat with us on WhatsApp</a>
      <a href="tel:${SITE.phone}" style="display:inline-block;margin-left:8px;padding:13px 20px;border-radius:10px;background:#143352;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Call ${SITE.phoneDisplay}</a>
    </div>

    <p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:#5B6B7C">
      If you have medical reports ready, WhatsApp them with your reference number — it helps us arrange a faster opinion.
    </p>
  `;

  return {
    subject: `We received your enquiry · ${data.reference} · ${SITE.name}`,
    html: emailShell({
      preheader: `Thanks ${firstName} — your enquiry ${data.reference} is with our care team.`,
      eyebrow: "Enquiry confirmation",
      title: "We’ve received your request",
      subtitle: "You’re not navigating medical travel alone — our team will follow up soon.",
      bodyHtml,
      footerNote: `This is an automated confirmation. For urgent help, WhatsApp or call ${SITE.phoneDisplay}.`,
    }),
    text: [
      `Dear ${firstName},`,
      ``,
      `Thank you for contacting ${SITE.name}. We have received your enquiry.`,
      `Reference: ${data.reference}`,
      ``,
      `Treatment: ${data.treatment}`,
      `Country: ${data.country}`,
      ``,
      `What happens next:`,
      `1. A coordinator reviews your message within 24–48 hours.`,
      `2. We share hospital options and a written estimate.`,
      `3. We support visa, travel, and stay if you proceed.`,
      ``,
      `WhatsApp: ${SITE.whatsappUrl}`,
      `Call: ${SITE.phoneDisplay}`,
      ``,
      `— ${SITE.name}, Hyderabad`,
    ].join("\n"),
  };
}
