"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { type Variants } from "framer-motion"

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

export function HistoriaSection() {
  const t = useTranslations("historia")

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ]

  return (
    <section
      id="nosotros"
      className="py-20 sm:py-28 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Imagen ── */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Frame decorativo */}
            <div
              className="absolute -top-4 -left-4 w-2/3 h-2/3 rounded-3xl border-2 border-brand-gold/30 z-0"
              aria-hidden="true"
            />

            {/* Contenedor de imagen */}
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] bg-brand-navy/10">
              <Image
                src="/images/chef.jpg"
                alt="Chef Andrés Maturana en la cocina de La Cevichería del Mar"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Fallback gradient visible mientras no hay imagen */}
              {/* <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #1E3A5F 0%, #2A4D7A 40%, #D4A24C 100%)",
                }}
              /> */}
            </div>

            {/* Badge flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="absolute -bottom-5 -right-4 z-20 bg-brand-gold rounded-2xl px-5 py-4 shadow-xl shadow-brand-gold/20"
            >
              <p className="font-heading font-bold text-3xl text-brand-navy-dark leading-none">
                2013
              </p>
              <p className="text-brand-navy-dark/70 text-xs font-medium mt-0.5">
                Fundado en Cartagena
              </p>
            </motion.div>
          </motion.div>

          {/* ── Texto ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {t("pretitle")}
            </p>

            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-6">
              {t("title")}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("p1")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {t("p2")}
            </p>

            {/* Stats */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <p className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy dark:text-brand-gold leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
