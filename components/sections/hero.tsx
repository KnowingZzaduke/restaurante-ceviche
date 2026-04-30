"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ChevronDown, Star, MessageCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const WHATSAPP_NUMBER = "573001234567"
const WHATSAPP_MESSAGE = "Hola, me gustaría hacer una reserva en La Cevichería del Mar."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function HeroSection() {
  const t = useTranslations("hero")

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ceviche de mariscos La Cevichería del Mar"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Multi-layer gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-3xl">

          {/* Pre-title */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-brand-gold text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-5"
          >
            {t("pretitle")}
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-bold text-white leading-[1.1] mb-5"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              {t("title")}
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-brand-gold">
              {t("titleAccent")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => handleScroll("reservar")}
              className={cn(
                "inline-flex items-center justify-center h-12 px-7 rounded-xl font-semibold text-base transition-all active:scale-95",
                "bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark"
              )}
            >
              {t("ctaPrimary")}
            </button>

            <button
              onClick={() => handleScroll("menu")}
              className="inline-flex items-center justify-center h-12 px-7 rounded-xl font-semibold text-base border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              {t("ctaSecondary")}
            </button>
          </motion.div>

          {/* WhatsApp link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-5"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              <MessageCircle size={15} />
              {t("whatsapp")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Tripadvisor badge — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-24 right-4 sm:right-8 z-10"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-sm border border-white/20">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="text-brand-gold fill-brand-gold" />
            ))}
          </div>
          <span className="text-white text-xs font-medium">{t("badge")}</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("nosotros")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white/80 transition-colors flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        aria-label={t("scroll")}
      >
        <span className="text-xs tracking-widest uppercase hidden sm:block">
          {t("scroll")}
        </span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  )
}
