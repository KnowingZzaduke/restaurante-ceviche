"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { MapPin, Clock, Phone, Mail, Send } from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Validation schema ─────────────────────────────── */
const schema = z.object({
  nombre:  z.string().min(2, "Mínimo 2 caracteres"),
  email:   z.string().email("Email inválido"),
  mensaje: z.string().min(10, "Mínimo 10 caracteres").max(500, "Máximo 500 caracteres"),
})
type FormData = z.infer<typeof schema>

/* ── Input styles (sobre fondo oscuro) ─────────────── */
const inputCls = cn(
  "w-full px-4 rounded-xl border bg-white/6 text-white text-sm",
  "border-white/12 placeholder:text-white/30",
  "focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20",
  "transition-colors"
)
const labelCls = "block text-sm font-medium text-white/60 mb-1.5"
const errorCls = "text-xs text-brand-coral mt-1"

/* ── Main component ─────────────────────────────────── */
export function UbicacionSection() {
  const t = useTranslations("ubicacion")
  const locale = useLocale()
  const [sending, setSending] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    setSending(true)
    await new Promise(r => setTimeout(r, 900))
    setSending(false)
    toast.success(t("formExito"))
    reset()
  }

  const INFO = [
    {
      icon: MapPin,
      label: locale === "en" ? "Address" : "Dirección",
      value: `${t("direccion")}\n${t("ciudad")}`,
      href: undefined,
    },
    {
      icon: Clock,
      label: t("horarios"),
      value: `${t("horariosDet")}\n${t("cerrado")}`,
      href: undefined,
    },
    {
      icon: Phone,
      label: t("telefono"),
      value: "+57 300 123 4567",
      href: "tel:+573001234567",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "reservas@laceviceriadelmar.com",
      href: "mailto:reservas@laceviceriadelmar.com",
    },
  ]

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-brand-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            {t("pretitle")}
          </p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ── Columna izquierda: info + mapa ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="flex flex-col gap-6"
          >
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/8"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/12 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/45 text-xs uppercase tracking-wider mb-1 font-medium">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-white/85 text-sm hover:text-brand-gold transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/85 text-sm leading-relaxed whitespace-pre-line">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10 flex-1 min-h-64">
              <iframe
                title="Ubicación La Cevichería del Mar"
                src="https://maps.google.com/maps?q=Centro+Historico+Cartagena+de+Indias+Colombia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-64"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* ── Columna derecha: formulario ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/4 p-7 sm:p-9 h-full">
              <h3 className="font-heading font-bold text-2xl text-white mb-7">
                {t("formTitle")}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                {/* Nombre */}
                <div>
                  <label className={labelCls}>{t("formNombre")} *</label>
                  <input
                    {...register("nombre")}
                    placeholder="Ej. María García"
                    className={cn(inputCls, "h-11", errors.nombre && "border-brand-coral")}
                  />
                  {errors.nombre && <p className={errorCls}>{errors.nombre.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>{t("formEmail")} *</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="tu@email.com"
                    className={cn(inputCls, "h-11", errors.email && "border-brand-coral")}
                  />
                  {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                </div>

                {/* Mensaje */}
                <div>
                  <label className={labelCls}>{t("formMensaje")} *</label>
                  <textarea
                    {...register("mensaje")}
                    rows={5}
                    placeholder="¿En qué podemos ayudarte?"
                    className={cn(inputCls, "resize-none py-3 leading-relaxed", errors.mensaje && "border-brand-coral")}
                  />
                  {errors.mensaje && <p className={errorCls}>{errors.mensaje.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className={cn(
                    "w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all",
                    "bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark",
                    "disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                  )}
                >
                  {sending ? (
                    <span className="w-4 h-4 border-2 border-brand-navy-dark/30 border-t-brand-navy-dark rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {sending ? "Enviando…" : t("formEnviar")}
                </button>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
