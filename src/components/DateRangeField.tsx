"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

export function DateRangeField({ name }: { name: string }) {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const dateFnsLocale = locale === "es" ? es : enUS;

  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fieldId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const displayValue = range?.from
    ? range.to
      ? `${format(range.from, "d MMM", { locale: dateFnsLocale })} – ${format(range.to, "d MMM yyyy", { locale: dateFnsLocale })}`
      : format(range.from, "d MMM yyyy", { locale: dateFnsLocale })
    : "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="relative" ref={wrapperRef}>
      <input type="hidden" name={name} value={displayValue} />
      <button
        type="button"
        id={fieldId}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="w-full border border-ink/15 bg-tint px-4 py-3 text-left text-ink outline-none transition-colors focus:border-brand-600"
      >
        {displayValue || <span className="text-ink/40">{t("datesPlaceholder")}</span>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("dates")}
          className="rdp-surfnsail bg-tint absolute z-20 mt-2 w-max border border-ink/15 p-3 shadow-xl"
        >
          <DayPicker
            mode="range"
            min={1}
            selected={range}
            onSelect={(next) => {
              setRange(next);
              if (next?.from && next?.to) setOpen(false);
            }}
            disabled={{ before: today }}
            defaultMonth={range?.from ?? today}
            locale={dateFnsLocale}
            showOutsideDays
          />
          {range?.from && (
            <button
              type="button"
              onClick={() => setRange(undefined)}
              className="mt-1 text-xs uppercase tracking-wide text-ink/60 transition-colors hover:text-brand-600"
            >
              {t("datesClear")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
