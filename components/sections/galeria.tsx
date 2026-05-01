"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react"

const GALLERY = [
  { id: 1, h: 320, gradient: "from-amber-800 to-orange-600",  emoji: "🍋", label: "Ceviche clásico en presentación artística" },
  { id: 2, h: 220, gradient: "from-blue-900 to-teal-700",     emoji: "🌅", label: "Terraza con vista al centro histórico"    },
  { id: 3, h: 268, gradient: "from-orange-800 to-amber-600",  emoji: "🐟", label: "Tiradito nikkei"                          },
  { id: 4, h: 296, gradient: "from-teal-900 to-cyan-700",     emoji: "🏛️", label: "Interior de la casona colonial"          },
  { id: 5, h: 220, gradient: "from-rose-900 to-rose-700",     emoji: "🦞", label: "Cazuela de mariscos"                     },
  { id: 6, h: 280, gradient: "from-purple-900 to-violet-700", emoji: "🍹", label: "Cócteles tropicales"                     },
  { id: 7, h: 244, gradient: "from-zinc-700 to-zinc-500",     emoji: "👨‍🍳", label: "Chef en cocina abierta"                },
  { id: 8, h: 288, gradient: "from-emerald-900 to-green-700", emoji: "🥭", label: "Postre de coco y mango"                  },
]

export function GaleriaSection() {
  const t = useTranslations("galeria")
  const [idx, setIdx] = useState<number | null>(null)

  const close = useCallback(() => setIdx(null), [])
  const prev  = useCallback(() => setIdx(i => i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length), [])
  const next  = useCallback(() => setIdx(i => i === null ? 0 : (i + 1) % GALLERY.length), [])

  useEffect(() => {
    if (idx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close()
      if (e.key === "ArrowLeft")   prev()
      if (e.key === "ArrowRight")  next()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [idx, close, prev, next])

  useEffect(() => {
    document.body.style.overflow = idx !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [idx])

  const active = idx !== null ? GALLERY[idx] : null

  return (
    <>
      <section id="galeria" className="py-20 sm:py-28 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

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
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Masonry columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {GALLERY.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" as const }}
                onClick={() => setIdx(i)}
                className="break-inside-avoid mb-3 block w-full group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ height: item.h }}
                aria-label={item.label}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                {/* Imagen real — se oculta si no existe */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/galeria-${item.id}.jpg`}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
                {/* Placeholder cuando no hay foto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/70 pointer-events-none">
                  <span className="text-4xl drop-shadow">{item.emoji}</span>
                  <span className="text-xs font-medium text-center px-6 drop-shadow leading-relaxed">{item.label}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mt-10"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {t("verInstagram")}
            </a>
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {idx !== null && active && (
          <>
            <motion.div
              key="lb-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm"
              onClick={close}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
              {/* Panel */}
              <motion.div
                key={`lb-item-${idx}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{ aspectRatio: "4/3" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient}`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/galeria-${active.id}.jpg`}
                  alt={active.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 pointer-events-none">
                  <span className="text-6xl sm:text-7xl drop-shadow">{active.emoji}</span>
                  <span className="text-base sm:text-lg font-medium text-center px-8 drop-shadow">{active.label}</span>
                </div>
                {/* Counter */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium pointer-events-none">
                  {idx + 1} / {GALLERY.length}
                </div>
              </motion.div>

              {/* Close */}
              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors pointer-events-auto"
              >
                <X size={20} />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Foto anterior"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors pointer-events-auto"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Foto siguiente"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors pointer-events-auto"
              >
                <ChevronRight size={22} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-auto">
                {GALLERY.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                    aria-label={`Foto ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === idx ? "bg-white w-5" : "bg-white/40 w-1.5 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
