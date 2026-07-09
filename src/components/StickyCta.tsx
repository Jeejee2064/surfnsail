import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/lib/site";

export function StickyCta() {
  const t = useTranslations("Nav");

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden lg:block">
        <WhatsAppButton />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-white/10 bg-sea-900/95 px-4 py-3 backdrop-blur lg:hidden">
        <WhatsAppButton className="shrink-0 p-3" />
        <Link
          href={site.bookingHref}
          className="flex-1 rounded-full bg-brand-400 px-5 py-3 text-center text-sm font-semibold text-sea-900 transition-colors hover:bg-gold-light"
        >
          {t("bookNow")}
        </Link>
      </div>
    </>
  );
}
