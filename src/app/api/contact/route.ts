import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  dates: string;
  partySize: string;
  message: string;
  company: string; // honeypot — must stay empty
  locale: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The marketing site is static files on a separate host (cPanel), so this
// route gets called cross-origin. Only the site's own domains may call it.
const ALLOWED_ORIGINS = new Set([
  site.url,
  site.url.replace("https://", "https://www."),
  "http://localhost:3000",
]);

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  return {};
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}

export async function POST(request: Request) {
  const headers = corsHeaders(request.headers.get("origin"));

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400, headers });
  }

  const { name, email, dates, partySize, message, company, locale } = body;

  // Honeypot: real users never fill this hidden field.
  if (company) {
    return Response.json({ ok: true }, { headers });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: "missing_fields" }, { status: 400, headers });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400, headers });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json({ error: "server_misconfigured" }, { status: 500, headers });
  }

  const resend = new Resend(apiKey);
  const isEs = locale === "es";

  const { error } = await resend.emails.send({
    from: `Surfnsail Website <enquiries@${site.emailDomain}>`,
    to: site.email,
    replyTo: email,
    subject: `${isEs ? "Nueva consulta" : "New enquiry"} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Preferred dates: ${dates || "—"}`,
      `Party size: ${partySize || "—"}`,
      `Locale: ${locale || "en"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error", error);
    return Response.json({ error: "send_failed" }, { status: 502, headers });
  }

  // Confirmation copy back to the client. Best-effort: the enquiry has
  // already reached the business above, so a failure here shouldn't fail
  // the whole request — just log it.
  const { error: confirmationError } = await resend.emails.send({
    from: `${site.name} <enquiries@${site.emailDomain}>`,
    to: email,
    replyTo: site.email,
    subject: isEs ? "Hemos recibido tu consulta — Surfnsail" : "We've received your enquiry — Surfnsail",
    text: [
      isEs ? `Hola ${name},` : `Hi ${name},`,
      "",
      isEs
        ? "Gracias por contactar a Surfnsail. Hemos recibido tu consulta y nuestro equipo te responderá en breve."
        : "Thanks for reaching out to Surfnsail. We've received your enquiry and our team will get back to you shortly.",
      "",
      isEs ? "Resumen de tu consulta:" : "Summary of your enquiry:",
      `${isEs ? "Fechas preferidas" : "Preferred dates"}: ${dates || "—"}`,
      `${isEs ? "Tamaño del grupo" : "Party size"}: ${partySize || "—"}`,
      "",
      message,
      "",
      isEs
        ? `Si necesitas contactarnos antes, escríbenos a ${site.email} o por WhatsApp: ${site.phone}.`
        : `If you need to reach us sooner, email ${site.email} or WhatsApp us at ${site.phone}.`,
      "",
      site.legalName,
      site.url,
    ].join("\n"),
  });

  if (confirmationError) {
    console.error("Resend confirmation error", confirmationError);
  }

  return Response.json({ ok: true }, { headers });
}
