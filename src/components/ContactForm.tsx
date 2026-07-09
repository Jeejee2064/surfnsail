"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      dates: String(data.get("dates") ?? ""),
      partySize: String(data.get("partySize") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="border border-brand-600/30 bg-brand-600/10 px-6 py-5 text-brand-600">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, left blank; bots tend to fill every field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">{t("name")}</span>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-ink/15 bg-tint px-4 py-3 text-ink outline-none transition-colors focus:border-brand-600"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">{t("email")}</span>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-ink/15 bg-tint px-4 py-3 text-ink outline-none transition-colors focus:border-brand-600"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">{t("dates")}</span>
          <input
            name="dates"
            type="text"
            className="w-full border border-ink/15 bg-tint px-4 py-3 text-ink outline-none transition-colors focus:border-brand-600"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">{t("partySize")}</span>
          <input
            name="partySize"
            type="text"
            className="w-full border border-ink/15 bg-tint px-4 py-3 text-ink outline-none transition-colors focus:border-brand-600"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">{t("message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-ink/15 bg-tint px-4 py-3 text-ink outline-none transition-colors focus:border-brand-600"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-400 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-sea-900 transition-colors duration-300 hover:bg-gold-light disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
