import Image from "next/image";
import { Reveal } from "./Reveal";
import { Container } from "./ui";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

// Photo-less page header used everywhere except the home page and the
// activity pages (those keep the full-bleed Hero — see brief: only routes
// with genuinely new hero photography earn a full-screen image, the rest of
// the site reads as a quieter, typographic editorial page). The oversized
// watermark sail mark stands in for a hero image instead of stretching a
// generic lifestyle photo across the top of every page.
export function PageIntro({ eyebrow, title, subtitle }: PageIntroProps) {
  return (
    <div className="relative overflow-hidden border-b border-ink/10 bg-tint pb-16 pt-36 sm:pb-20 sm:pt-44">
      <Image
        src="/logo-icon.png"
        alt=""
        aria-hidden="true"
        width={874}
        height={777}
        className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-auto rotate-6 opacity-[0.05] sm:h-[34rem]"
      />
      <Container className="relative">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-brand-600">
            <span className="h-px w-8 bg-brand-600/70" />
            {eyebrow}
          </p>
          <h1 className="max-w-2xl font-display text-[length:var(--text-display)] leading-[0.95] tracking-tight text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">{subtitle}</p>
          )}
        </Reveal>
      </Container>
    </div>
  );
}
