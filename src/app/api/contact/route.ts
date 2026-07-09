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

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, email, dates, partySize, message, company, locale } = body;

  // Honeypot: real users never fill this hidden field.
  if (company) {
    return Response.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const isEs = locale === "es";

  const { error } = await resend.emails.send({
    from: `Surfnsail Website <enquiries@${site.domain}>`,
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
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
