"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { buttonStyles, type ButtonVariant } from "./Button";

// Every "book now" / "request to book" CTA opens this instead of navigating
// straight to the enquiry form — most guests just want to ping us on
// WhatsApp or email rather than fill out a form. The plain "Contact" nav
// link is untouched and still goes to /contact for people who do want the
// full form.
export function BookNowButton({
  variant,
  className = "",
  wrapperClassName = "",
  align = "left",
  openUp = false,
  onSelect,
  children,
}: {
  variant?: ButtonVariant;
  className?: string;
  wrapperClassName?: string;
  align?: "left" | "right";
  openUp?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}) {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select() {
    setOpen(false);
    onSelect?.();
  }

  return (
    <div ref={ref} className={`relative inline-block ${wrapperClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center justify-center ${variant ? buttonStyles[variant] : ""} ${className}`}
      >
        {children}
      </button>
      {open && (
        <div
          className={`absolute z-20 w-52 border border-white/10 bg-sea-800 py-2 shadow-lg shadow-black/20 ${
            openUp ? "bottom-full mb-2" : "top-full mt-2"
          } ${align === "right" ? "right-0" : "left-0"}`}
        >
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={select}
            className="block px-4 py-2.5 text-sm text-bone transition-colors hover:bg-white/5"
          >
            {t("whatsapp")}
          </a>
          <a href={`mailto:${site.email}`} onClick={select} className="block px-4 py-2.5 text-sm text-bone transition-colors hover:bg-white/5">
            {t("email")}
          </a>
        </div>
      )}
    </div>
  );
}
