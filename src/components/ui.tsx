import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`eyebrow ${dark ? "text-sand-200" : "text-brand-600"}`}>{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  heading,
  body,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${dark ? "text-sand-200" : "text-brand-600"}`}>{eyebrow}</p>
      )}
      <h2
        className={`font-display text-[length:var(--text-h2)] leading-[0.95] tracking-tight ${
          dark ? "text-bone" : "text-ink"
        }`}
      >
        {heading}
      </h2>
      {body && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-sand-100/90" : "text-ink/70"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
