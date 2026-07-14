import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "px-10 py-4 bg-brand-400 text-sea-900 text-[11px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-gold-light transition-colors duration-300",
  secondary:
    "px-10 py-4 bg-transparent border-2 border-brand-600 text-brand-600 text-[11px] tracking-[0.22em] uppercase font-sans font-semibold hover:bg-brand-600 hover:text-sea-900 transition-all duration-300",
  ghost: "px-7 py-3.5 bg-transparent text-ink border border-ink/15 text-sm font-semibold tracking-wide hover:border-ink/40 transition-colors duration-200",
};

type LinkProps = ComponentProps<typeof Link>;

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkProps & { variant?: ButtonVariant }) {
  return <Link {...props} className={`inline-flex items-center justify-center ${buttonStyles[variant]} ${className}`} />;
}
