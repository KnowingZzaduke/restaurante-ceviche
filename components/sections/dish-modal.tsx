"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { X, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/menu-data"
import type { MenuItem } from "@/types/menu"

const TAG_STYLES: Record<string, string> = {
  especialidad: "bg-brand-gold/15 text-brand-gold-dark dark:text-brand-gold border-brand-gold/30",
  nuevo:        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  vegetariano:  "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  picante:      "bg-brand-coral/15 text-brand-coral-dark dark:text-brand-coral border-brand-coral/30",
}

interface DishModalProps {
  dish: MenuItem | null
  onClose: () => void
}

export function DishModal({ dish, onClose }: DishModalProps) {
  const locale = useLocale()
  const t = useTranslations("menu.tags")

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [dish])

  const name = dish ? (locale === "en" ? dish.nameEn : dish.name) : ""
  const description = dish ? (locale === "en" ? dish.descriptionEn : dish.description) : ""

  const scrollToReservas = () => {
    onClose()
    setTimeout(() => {
      document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <AnimatePresence>
      {dish && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — bottom sheet en mobile, centrado en desktop */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={name}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className={cn(
              "fixed z-50 bg-card w-full overflow-hidden shadow-2xl",
              "bottom-0 left-0 right-0 rounded-t-3xl",
              "sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2",
              "sm:max-w-lg sm:rounded-3xl sm:w-[calc(100%-2rem)]"
            )}
          >
            {/* Imagen */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted">
              <Image
                src={`/images/menu/${dish.id}.jpg`}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
              {/* Gradient fallback */}
              {/* <div
                className="absolute inset-0"
                style={{ background: dish.gradient }}
                aria-hidden="true"
              /> */}
              {/* Overlay degradado para legibilidad del precio */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Precio sobre la imagen */}
              <div className="absolute bottom-4 left-4">
                <span className="font-heading font-bold text-2xl text-white drop-shadow">
                  {formatPrice(dish.price)}
                </span>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Tag badge */}
              {dish.tag && (
                <div className="absolute top-3 left-3">
                  <span
                    className={cn(
                      "inline-block px-2.5 py-1 rounded-full text-xs font-semibold border",
                      TAG_STYLES[dish.tag]
                    )}
                  >
                    {t(dish.tag)}
                  </span>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-3 leading-snug">
                {name}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {description}
              </p>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToReservas}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-semibold text-sm transition-colors"
                >
                  <UtensilsCrossed size={16} />
                  Reservar mesa
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center h-11 rounded-xl border border-border text-foreground/70 hover:bg-muted font-medium text-sm transition-colors"
                >
                  Cerrar
                </button>
              </div>

              {/* Handle visual en mobile */}
              <div className="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
