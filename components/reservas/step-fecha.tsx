"use client"

import { useTranslations, useLocale } from "next-intl"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { getSlotAvailability } from "@/lib/availability"
import { TIME_SLOTS, type ReservationZone } from "@/types/reservation"
import { Minus, Plus } from "lucide-react"
import { es, enUS } from "date-fns/locale"

interface StepFechaProps {
  date: Date | undefined
  time: string
  guests: number
  zone: ReservationZone
  onDateChange: (date: Date | undefined) => void
  onTimeChange: (time: string) => void
  onGuestsChange: (guests: number) => void
  onZoneChange: (zone: ReservationZone) => void
  onNext: () => void
}

export function StepFecha({
  date,
  time,
  guests,
  zone,
  onDateChange,
  onTimeChange,
  onGuestsChange,
  onZoneChange,
  onNext,
}: StepFechaProps) {
  const t = useTranslations("reservas.fecha")
  const locale = useLocale()
  const calLocale = locale === "en" ? enUS : es

  const availability = date ? getSlotAvailability(date) : {}
  const canContinue = !!date && !!time

  const isMonday = (d: Date) => d.getDay() === 1
  const isPast = (d: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return d < today
  }

  const zones: { value: ReservationZone; label: string; emoji: string }[] = [
    { value: "sala", label: t("zonaSala"), emoji: "🏛️" },
    { value: "terraza", label: t("zonaTerr"), emoji: "🌴" },
    { value: "sin-preferencia", label: t("zonaSin"), emoji: "✨" },
  ]

  return (
    <div className="space-y-6">
      {/* ── Calendario ── */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">
          {t("selecciona")}
        </p>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            locale={calLocale}
            disabled={(d) => isPast(d) || isMonday(d)}
            className="rounded-2xl border border-border bg-card p-3"
          />
        </div>
        {date && isMonday(date) && (
          <p className="text-xs text-brand-coral text-center mt-2">
            {t("cerrado")}
          </p>
        )}
      </div>

      {/* ── Horarios ── */}
      {date && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            {t("horarioTitle")}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {TIME_SLOTS.map((slot) => {
              const available = availability[slot] !== false
              const selected = time === slot
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!available}
                  onClick={() => onTimeChange(slot)}
                  className={cn(
                    "h-10 rounded-xl text-sm font-medium transition-all",
                    selected
                      ? "bg-brand-gold text-brand-navy-dark font-bold shadow-md scale-105"
                      : available
                        ? "bg-muted hover:bg-brand-navy/10 dark:hover:bg-brand-gold/10 text-foreground border border-border hover:border-brand-navy/30"
                        : "bg-muted/40 text-muted-foreground/40 cursor-not-allowed line-through"
                  )}
                >
                  {slot}
                </button>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{t("horarioHint")}</p>
        </div>
      )}

      {/* ── Personas ── */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">{t("personas")}</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onGuestsChange(Math.max(1, guests - 1))}
            disabled={guests <= 1}
            className="w-10 h-10 rounded-xl border border-border bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <span className="font-heading font-bold text-2xl w-10 text-center text-foreground">
            {guests}
          </span>
          <button
            type="button"
            onClick={() => onGuestsChange(Math.min(12, guests + 1))}
            disabled={guests >= 12}
            className="w-10 h-10 rounded-xl border border-border bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
          <span className="text-sm text-muted-foreground">
            {t("personasSuffix")} · {t("personasMax")}
          </span>
        </div>
      </div>

      {/* ── Zona ── */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">{t("zona")}</p>
        <div className="grid grid-cols-3 gap-2">
          {zones.map(({ value, label, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => onZoneChange(value)}
              className={cn(
                "flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm font-medium transition-all",
                zone === value
                  ? "border-brand-gold bg-brand-gold/10 text-brand-navy dark:text-brand-gold"
                  : "border-border bg-muted/40 hover:border-brand-navy/30 text-foreground/70"
              )}
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-xs leading-tight text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className={cn(
          "w-full h-12 rounded-xl font-semibold text-base transition-all",
          canContinue
            ? "bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark shadow-md hover:shadow-lg active:scale-[0.98]"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        {t("btnSig")}
      </button>
    </div>
  )
}
