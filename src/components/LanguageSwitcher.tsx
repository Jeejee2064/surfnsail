"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");

  return (
    <div
      className={`flex items-center gap-1 text-sm font-medium ${dark ? "text-bone" : "text-ink"}`}
      role="group"
      aria-label={t("switchLanguage")}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === locale ? "true" : undefined}
            className={`px-1 py-1 uppercase tracking-wide transition-opacity hover:opacity-100 ${
              loc === locale ? "opacity-100 underline underline-offset-4" : "opacity-50"
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
