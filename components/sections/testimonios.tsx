"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const REVIEWS = [
  {
    name: "María González",
    location: "Bogotá, Colombia",
    initials: "MG",
    rating: 5,
    source: "TripAdvisor",
    sourceCls: "bg-green-500/10 text-green-600 dark:text-green-400",
    avatarGradient: "from-brand-gold to-amber-500",
    text: "Una experiencia gastronómica inolvidable. El ceviche clásico es simplemente perfecto, y la atención del equipo hizo nuestra noche muy especial. ¡Volveremos sin duda!",
  },
  {
    name: "James Mitchell",
    location: "New York, USA",
    initials: "JM",
    rating: 5,
    source: "Google",
    sourceCls: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    avatarGradient: "from-blue-600 to-blue-400",
    text: "Absolutely stunning. The fusion of Peruvian and Colombian flavors is unlike anything I've tasted. The terrace view of the historic center makes it even more magical.",
  },
  {
    name: "Ana Lucía Herrera",
    location: "Medellín, Colombia",
    initials: "AL",
    rating: 5,
    source: "TripAdvisor",
    sourceCls: "bg-green-500/10 text-green-600 dark:text-green-400",
    avatarGradient: "from-brand-coral to-rose-400",
    text: "El menú degustación de 7 tiempos fue un viaje sensorial completo. El maridaje de vinos estuvo impecable. Perfecto para celebraciones especiales en familia.",
  },
  {
    name: "Pierre Dupont",
    location: "París, Francia",
    initials: "PD",
    rating: 5,
    source: "Google",
    sourceCls: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    avatarGradient: "from-purple-600 to-violet-400",
    text: "Magnifique restaurant! La cazuela de mariscos m'a rappelé les saveurs de la Méditerranée avec une âme caribéenne unique. Un service impeccable du début à la fin.",
  },
  {
    name: "Valentina Ríos",
    location: "Cali, Colombia",
    initials: "VR",
    rating: 5,
    source: "TripAdvisor",
    sourceCls: "bg-green-500/10 text-green-600 dark:text-green-400",
    avatarGradient: "from-emerald-600 to-teal-400",
    text: "Vine por el cumpleaños de mi mamá y el equipo nos sorprendió con detalles increíbles. La decoración, la comida y el ambiente lo tienen todo. ¡Definitivamente 10/10!",
  },
  {
    name: "Sophie Müller",
    location: "Berlín, Alemania",
    initials: "SM",
    rating: 5,
    source: "Google",
    sourceCls: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    avatarGradient: "from-cyan-600 to-teal-400",
    text: "One of the best seafood restaurants I have ever visited. The tiradito nikkei was a true revelation. Cartagena is absolutely worth visiting just for this place.",
  },
]

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir * 50, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: (dir: number) => ({ x: dir * -50, opacity: 0, transition: { duration: 0.22 } }),
}

export function TestimoniosSection() {
  const t = useTranslations("testimonios")
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)

  const prev = () => { setDir(-1); setCur(c => (c - 1 + REVIEWS.length) % REVIEWS.length) }
  const next = () => { setDir(1);  setCur(c => (c + 1) % REVIEWS.length) }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDir(1)
      setCur(c => (c + 1) % REVIEWS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [paused])

  const review = REVIEWS[cur]

  return (
    <section className="py-20 sm:py-28 bg-brand-cream dark:bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            {t("pretitle")}
          </p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-foreground leading-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cur}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-card rounded-3xl border border-border p-8 sm:p-10 shadow-md"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-lg sm:text-xl text-foreground leading-relaxed mb-8 italic">
                "{review.text}"
              </blockquote>

              {/* Author row */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.avatarGradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${review.sourceCls}`}>
                  {review.source}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <button
              onClick={prev}
              aria-label="Reseña anterior"
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > cur ? 1 : -1); setCur(i) }}
                  aria-label={`Reseña ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === cur
                      ? "bg-brand-gold w-6"
                      : "bg-border w-1.5 hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Reseña siguiente"
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
