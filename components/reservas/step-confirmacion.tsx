"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Calendar, MessageCircle, Home, CheckCircle } from "lucide-react"
import { buildGoogleCalendarUrl, buildWhatsAppShareUrl } from "@/lib/availability"
import type { ReservationData } from "@/types/reservation"

/* ── Confetti ───────────────────────────────────── */
interface Particle {
  id: number
  x: number
  color: string
  size: number
  duration: number
  delay: number
  rotate: number
}

function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ["#D4A24C", "#E8896A", "#1E3A5F", "#4A7BA8", "#2ECC71", "#E5B563"]
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 0.8,
        rotate: Math.random() * 720,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{ left: `${p.x}%`, top: -12, width: p.size, height: p.size, background: p.color }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, p.rotate], opacity: [1, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  )
}

/* ── Data row ───────────────────────────────────── */
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  )
}

/* ── Component ──────────────────────────────────── */
interface StepConfirmacionProps {
  data: ReservationData
  onReset: () => void
}

const ZONE_LABELS: Record<string, string> = {
  sala: "Sala interior",
  terraza: "Terraza",
  "sin-preferencia": "Sin preferencia",
}

const OCASION_LABELS: Record<string, string> = {
  cumpleanos: "Cumpleaños 🎂",
  aniversario: "Aniversario 💍",
  romantica: "Cita romántica 🌹",
  negocios: "Negocios 💼",
  otra: "Otra ocasión ✨",
}

export function StepConfirmacion({ data, onReset }: StepConfirmacionProps) {
  const t = useTranslations("reservas.confirmacion")

  const dateStr = data.date.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const gcalUrl = buildGoogleCalendarUrl({
    date: data.date,
    time: data.time,
    guests: data.guests,
    code: data.code,
    zone: data.zone,
  })

  const waUrl = buildWhatsAppShareUrl({
    date: data.date,
    time: data.time,
    guests: data.guests,
    nombre: data.nombre,
    code: data.code,
  })

  return (
    <div className="relative">
      <Confetti />

      {/* Checkmark animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="flex justify-center mb-5"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h3 className="font-heading font-bold text-2xl text-center text-foreground mb-1">
          {t("titulo")}
        </h3>

        {/* Código de reserva */}
        <div className="text-center my-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            {t("codigo")}
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-gold/10 border border-brand-gold/40">
            <span className="font-heading font-bold text-2xl tracking-widest text-brand-navy dark:text-brand-gold">
              {data.code}
            </span>
          </div>
        </div>

        {/* Email simulado */}
        <p className="text-center text-sm text-muted-foreground mb-5">
          {t("subtitulo")}{" "}
          <span className="font-medium text-foreground">{data.email}</span>
        </p>

        {/* Resumen */}
        <div className="bg-muted/50 rounded-2xl border border-border p-4 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("resumen")}
          </p>
          <DataRow label={t("fecha")} value={dateStr} />
          <DataRow label={t("hora")} value={data.time} />
          <DataRow label={t("personas")} value={`${data.guests} persona${data.guests !== 1 ? "s" : ""}`} />
          <DataRow label={t("zona")} value={ZONE_LABELS[data.zone] ?? data.zone} />
          <DataRow label={t("nombre")} value={data.nombre} />
          <DataRow label={t("telefono")} value={data.telefono} />
          {data.ocasion && (
            <DataRow
              label={t("ocasion")}
              value={OCASION_LABELS[data.ocasion] ?? data.ocasion}
            />
          )}
        </div>

        {/* Nota */}
        <p className="text-xs text-muted-foreground text-center mb-5">
          {t("nota")}{" "}
          <a href="tel:+573001234567" className="text-brand-navy dark:text-brand-gold font-medium">
            +57 300 123 4567
          </a>
        </p>

        {/* Acciones */}
        <div className="flex flex-col gap-2.5">
          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-medium text-sm transition-colors"
          >
            <Calendar size={16} />
            {t("btnCalendar")}
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl font-medium text-sm transition-colors"
            style={{ backgroundColor: "#25D366", color: "white" }}
          >
            <MessageCircle size={16} fill="white" />
            {t("btnWhatsApp")}
          </a>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border text-foreground/70 hover:bg-muted font-medium text-sm transition-colors"
          >
            <Home size={16} />
            {t("btnInicio")}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
