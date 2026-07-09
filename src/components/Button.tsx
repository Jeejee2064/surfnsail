import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-brand-400 text-sea-900 hover:bg-gold-light",
  secondary: "bg-transparent text-brand-600 border-2 border-brand-600 hover:bg-brand-600 hover:text-sea-900",
  ghost: "bg-transparent text-ink border border-ink/15 hover:border-ink/40",
};

type LinkProps = ComponentProps<typeof Link>;

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkProps & { variant?: Variant }) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${styles[variant]} ${className}`}
    />
  );
}
