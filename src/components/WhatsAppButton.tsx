import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function WhatsAppButton({ className = "" }: { className?: string }) {
  const t = useTranslations("Common");
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className={`inline-flex items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/10 transition-transform hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.37c0-4.55 3.71-8.26 8.27-8.26 2.21 0 4.28.86 5.85 2.42a8.2 8.2 0 0 1 2.42 5.84c0 4.56-3.71 8.23-8.28 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14 0-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.24-.86.85-.86 2.06 0 1.22.88 2.4 1 2.56.13.17 1.73 2.65 4.2 3.71.58.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
      </svg>
    </a>
  );
}
