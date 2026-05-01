"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { MessageCircle, Home, CheckCircle, Download } from "lucide-react"
import { buildWhatsAppShareUrl } from "@/lib/availability"
import type { ReservationData } from "@/types/reservation"

/* ── Confetti ───────────────────────────────────── */
interface Particle {
  id: number; x: number; color: string
  size: number; duration: number; delay: number; rotate: number
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

/* ── Download helper ────────────────────────────── */
function generateReceiptHTML(data: ReservationData, labels: Record<string, string>) {
  const dateStr = data.date.toLocaleDateString(undefined, {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })
  return `<!DOCTYPE html>
<html lang="${labels.lang}">
<head>
<meta charset="UTF-8">
<title>${labels.titulo} ${data.code}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; background: #FAF7F2; color: #1A1A1A; display: flex; justify-content: center; padding: 40px 16px; }
  .receipt { background: #fff; border: 1px solid #E5DDD5; border-radius: 16px; padding: 40px; max-width: 480px; width: 100%; }
  .header { text-align: center; border-bottom: 2px solid #D4A24C; padding-bottom: 24px; margin-bottom: 24px; }
  .logo { font-size: 22px; font-weight: bold; color: #1E3A5F; }
  .address { font-size: 12px; color: #6B6259; margin-top: 4px; }
  .title { font-size: 18px; color: #6B6259; margin-top: 16px; text-transform: uppercase; letter-spacing: 2px; font-family: sans-serif; font-weight: 600; }
  .code-box { text-align: center; background: #FFF8EC; border: 2px solid #D4A24C; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
  .code-label { font-size: 11px; color: #6B6259; font-family: sans-serif; text-transform: uppercase; letter-spacing: 2px; }
  .code { font-size: 28px; font-weight: bold; color: #1E3A5F; letter-spacing: 4px; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 10px 0; border-bottom: 1px solid #F0EBE3; font-size: 14px; vertical-align: top; }
  td:first-child { color: #6B6259; width: 40%; font-family: sans-serif; }
  td:last-child { font-weight: 600; text-align: right; }
  .footer { text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #E5DDD5; font-size: 12px; color: #6B6259; font-family: sans-serif; }
  @media print { body { padding: 0; background: white; } .receipt { border: none; border-radius: 0; } }
</style>
</head>
<body>
<div class="receipt">
  <div class="header">
    <div class="logo">🍽️ ${labels.restaurante}</div>
    <div class="address">${labels.direccion}</div>
    <div class="title">${labels.titulo}</div>
  </div>
  <div class="code-box">
    <div class="code-label">${labels.codigo}</div>
    <div class="code">${data.code}</div>
  </div>
  <table>
    <tr><td>${labels.nombre}</td><td>${data.nombre}</td></tr>
    <tr><td>${labels.fecha}</td><td>${dateStr}</td></tr>
    <tr><td>${labels.hora}</td><td>${data.time}</td></tr>
    <tr><td>${labels.personas}</td><td>${data.guests}</td></tr>
    <tr><td>${labels.zona}</td><td>${labels[`zona_${data.zone}`] ?? data.zone}</td></tr>
    <tr><td>${labels.telefono}</td><td>${data.telefono}</td></tr>
    <tr><td>${labels.email}</td><td>${data.email}</td></tr>
    ${data.ocasion ? `<tr><td>${labels.ocasion}</td><td>${labels[`oc_${data.ocasion}`] ?? data.ocasion}</td></tr>` : ""}
    ${data.comentarios ? `<tr><td>${labels.comentarios}</td><td>${data.comentarios}</td></tr>` : ""}
  </table>
  <div class="footer">
    <p>+57 300 123 4567 · reservas@laceviceriadelmar.com</p>
    <p style="margin-top:6px">${labels.nota} +57 300 123 4567</p>
  </div>
</div>
</body>
</html>`
}

/* ── Main component ─────────────────────────────── */
interface StepConfirmacionProps {
  data: ReservationData
  onReset: () => void
}

export function StepConfirmacion({ data, onReset }: StepConfirmacionProps) {
  const t = useTranslations("reservas.confirmacion")
  const locale = useLocale()

  const dateStr = data.date.toLocaleDateString(locale === "en" ? "en-US" : "es-CO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })

  const waUrl = buildWhatsAppShareUrl({
    date: data.date, time: data.time,
    guests: data.guests, nombre: data.nombre, code: data.code,
  })

  const handleDownload = () => {
    const labels = {
      lang: locale,
      titulo: t("descargarTitulo"),
      restaurante: t("descargarRestaurante"),
      direccion: t("descargarDireccion"),
      codigo: t("codigo"),
      nombre: t("nombre"),
      fecha: t("fecha"),
      hora: t("hora"),
      personas: t("personas"),
      zona: t("zona"),
      telefono: t("telefono"),
      email: "Email",
      ocasion: t("ocasion"),
      comentarios: locale === "en" ? "Comments" : "Comentarios",
      nota: t("nota"),
      zona_sala: t("zonaSala"),
      zona_terraza: t("zonaTerr"),
      "zona_sin-preferencia": t("zonaSin"),
      oc_cumpleanos: t("ocCumple"),
      oc_aniversario: t("ocAniv"),
      oc_romantica: t("ocRom"),
      oc_negocios: t("ocNeg"),
      oc_otra: t("ocOtra"),
    }
    const html = generateReceiptHTML(data, labels)
    const htmlWithPrint = html.replace(
      "</body>",
      `<script>window.addEventListener("load",function(){window.print();})</script></body>`
    )
    const blob = new Blob([htmlWithPrint], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  return (
    <div className="relative">
      <Confetti />

      {/* Checkmark */}
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

        {/* Código */}
        <div className="text-center my-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("codigo")}</p>
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
          <DataRow label={t("personas")} value={`${data.guests}`} />
          <DataRow label={t("zona")} value={
            data.zone === "sala" ? t("zonaSala")
            : data.zone === "terraza" ? t("zonaTerr")
            : t("zonaSin")
          } />
          <DataRow label={t("nombre")} value={data.nombre} />
          <DataRow label={t("telefono")} value={data.telefono} />
          {data.ocasion && (
            <DataRow label={t("ocasion")} value={
              data.ocasion === "cumpleanos" ? t("ocCumple")
              : data.ocasion === "aniversario" ? t("ocAniv")
              : data.ocasion === "romantica" ? t("ocRom")
              : data.ocasion === "negocios" ? t("ocNeg")
              : t("ocOtra")
            } />
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
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-medium text-sm transition-colors"
          >
            <Download size={16} />
            {t("btnDescargar")}
          </button>
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
