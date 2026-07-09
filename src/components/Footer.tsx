import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const tCommon = useTranslations("Common");

  return (
    <footer className="bg-tint-dark text-bone">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo dark />
              <Image
                src="/surfnsail.png"
                alt={site.name}
                width={794}
                height={189}
                className="h-5 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-100/80">
              {tFooter("tagline")}
            </p>
          </div>

          <div>
            <p className="eyebrow text-sand-200">{tFooter("quickLinks")}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-sand-100/90">
              <li><Link href="/about" className="hover:text-bone">{tNav("about")}</Link></li>
              <li><Link href="/fleet" className="hover:text-bone">{tNav("fleet")}</Link></li>
              <li><Link href="/packages" className="hover:text-bone">{tNav("packages")}</Link></li>
              <li><Link href="/reviews" className="hover:text-bone">{tNav("reviews")}</Link></li>
              <li><Link href="/faq" className="hover:text-bone">{tNav("faq")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sand-200">{tFooter("contact")}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-sand-100/90">
              <li>{tFooter("address")}</li>
              <li><a href={site.phoneHref} className="hover:text-bone">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-bone">{site.email}</a></li>
              <li><a href={site.whatsappHref} className="hover:text-bone">{tCommon("whatsapp")}</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sand-200">{tFooter("followUs")}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-sand-100/90">
              <li><a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Instagram</a></li>
              <li><a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Facebook</a></li>
            </ul>
            <div className="mt-6">
              <LanguageSwitcher dark />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-bone/10 pt-6 text-xs text-sand-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {tFooter("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
