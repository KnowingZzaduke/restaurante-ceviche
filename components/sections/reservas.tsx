"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Clock } from "lucide-react"
import { ReservationForm } from "@/components/reservas/reservation-form"

export function ReservasSection() {
  const t = useTranslations("reservas")

  return (
    <section
      id="reservar"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #FAF7F2 0%, #F5EDD8 50%, #FAF7F2 100%)",
      }}
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#D4A24C" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "#1E3A5F" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {t("pretitle")}
            </p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-brand-navy leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-brand-warm-gray text-base sm:text-lg leading-relaxed mb-8">
              {t("subtitle")}
            </p>

            {/* Badge tiempo de confirmación */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-brand-gold/30 shadow-sm">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>
              <Clock size={14} className="text-brand-warm-gray" />
              <span className="text-sm font-medium text-brand-navy">
                {t("badge")}
              </span>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { emoji: "📅", label: "Mar – Dom", sub: "12:00 – 23:00" },
                { emoji: "👥", label: "Hasta 12", sub: "personas por mesa" },
                { emoji: "📍", label: "Centro Histórico", sub: "Cartagena" },
                { emoji: "🎉", label: "Ocasiones", sub: "especiales" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-4 border border-border shadow-sm"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <p className="font-semibold text-sm text-brand-navy mt-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ReservationForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
