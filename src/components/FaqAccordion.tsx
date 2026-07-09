import type { FaqItem } from "@/lib/content-types";

// Native <details>/<summary>: accessible, keyboard-operable, no JS required.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.question} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-ink marker:content-none">
            {item.question}
            <span className="shrink-0 text-2xl font-sans font-light text-brand-600 transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
