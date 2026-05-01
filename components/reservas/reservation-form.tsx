"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateReservationCode, saveReservation } from "@/lib/availability"
import type { ReservationZone, ReservationOcasion, ReservationData } from "@/types/reservation"
import { StepFecha } from "./step-fecha"
import { StepDatos } from "./step-datos"
import { StepConfirmacion } from "./step-confirmacion"
import { toast } from "sonner"

/* ── Step indicator ─────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  const t = useTranslations("reservas")
  const steps = [t("step1"), t("step2"), t("step3")]

  return (
    <div className="flex items-center mb-8">
      {steps.map((label, idx) => {
        const n = idx + 1
        const done = n < current
        const active = n === current
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  done
                    ? "bg-brand-gold text-brand-navy-dark"
                    : active
                      ? "bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy-dark ring-4 ring-brand-navy/20 dark:ring-brand-gold/20"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check size={15} /> : n}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block text-center leading-none",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 mb-5 sm:mb-6 transition-all duration-500",
                  done ? "bg-brand-gold" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Slide variants ─────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

/* ── Main form ──────────────────────────────────── */
export function ReservationForm() {
  const locale = useLocale()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [direction, setDirection] = useState(1)
  const [confirmed, setConfirmed] = useState<ReservationData | null>(null)

  // Step 1 state
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [zone, setZone] = useState<ReservationZone>("sin-preferencia")

  // Step 2 state
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [ocasion, setOcasion] = useState("")
  const [comentarios, setComentarios] = useState("")

  const goTo = (next: 1 | 2 | 3) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const [sending, setSending] = useState(false)

  const handleStep2Submit = async (data: {
    nombre: string
    telefono: string
    email: string
    ocasion: ReservationOcasion
    comentarios: string
  }) => {
    setSending(true)
    setNombre(data.nombre)
    setTelefono(data.telefono)
    setEmail(data.email)
    setOcasion(data.ocasion)
    setComentarios(data.comentarios)

    const code = generateReservationCode()
    const reservation: ReservationData = {
      date: date!,
      time,
      guests,
      zone,
      ...data,
      code,
      createdAt: new Date().toISOString(),
    }

    saveReservation({
      ...reservation,
      date: reservation.date.toISOString(),
    })

    try {
      const res = await fetch("/api/send-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...reservation,
          date: reservation.date.toISOString(),
          locale,
        }),
      })

      const dateLocale = locale === "en" ? "en-US" : "es-CO"
      if (res.ok) {
        toast.success(code, {
          description: locale === "en"
            ? `Confirmation sent to ${data.email}`
            : `Confirmación enviada a ${data.email}`,
          duration: 6000,
        })
      } else {
        toast.success(code, {
          description: `${date?.toLocaleDateString(dateLocale)} · ${time}`,
          duration: 6000,
        })
        console.error("Email send failed:", await res.text())
      }
    } catch {
      const dateLocale = locale === "en" ? "en-US" : "es-CO"
      toast.success(code, {
        description: `${date?.toLocaleDateString(dateLocale)} · ${time}`,
        duration: 6000,
      })
    } finally {
      setSending(false)
    }

    setConfirmed(reservation)
    goTo(3)
  }

  const handleReset = () => {
    setStep(1)
    setDirection(-1)
    setDate(undefined)
    setTime("")
    setGuests(2)
    setZone("sin-preferencia")
    setNombre("")
    setTelefono("")
    setEmail("")
    setOcasion("")
    setComentarios("")
    setConfirmed(null)
    // Scroll al inicio de la sección
    document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-card rounded-3xl border border-border shadow-xl p-6 sm:p-8 w-full max-w-lg mx-auto">
      {step < 3 && <StepIndicator current={step} />}

      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <StepFecha
              date={date}
              time={time}
              guests={guests}
              zone={zone}
              onDateChange={setDate}
              onTimeChange={setTime}
              onGuestsChange={setGuests}
              onZoneChange={setZone}
              onNext={() => goTo(2)}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <StepDatos
              nombre={nombre}
              telefono={telefono}
              email={email}
              ocasion={ocasion}
              comentarios={comentarios}
              sending={sending}
              onBack={() => goTo(1)}
              onSubmit={handleStep2Submit}
            />
          </motion.div>
        )}

        {step === 3 && confirmed && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <StepConfirmacion data={confirmed} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
