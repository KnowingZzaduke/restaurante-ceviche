"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { MENU_ITEMS, formatPrice } from "@/lib/menu-data"
import type { MenuItem, MenuCategory } from "@/types/menu"
import { DishModal } from "@/components/sections/dish-modal"
import { Footer } from "@/components/shared/footer"

const TAG_STYLES: Record<string, string> = {
  especialidad: "bg-brand-gold/15 text-brand-gold-dark dark:text-brand-gold border-brand-gold/30",
  nuevo:        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  vegetariano:  "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  picante:      "bg-brand-coral/15 text-brand-coral-dark dark:text-brand-coral border-brand-coral/30",
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

const sectionVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const CATEGORIES: { value: MenuCategory; emoji: string }[] = [
  { value: "entradas",    emoji: "🦞" },
  { value: "principales", emoji: "🐟" },
  { value: "postres",     emoji: "🥭" },
  { value: "cocteles",    emoji: "🍹" },
]

function DishCard({
  item,
  onOpen,
}: {
  item: MenuItem
  onOpen: (item: MenuItem) => void
}) {
  const locale = useLocale()
  const t = useTranslations("menu.tags")
  const name = locale === "en" ? item.nameEn : item.name
  const description = locale === "en" ? item.descriptionEn : item.description

  return (
    <motion.button
      variants={cardVariants}
      onClick={() => onOpen(item)}
      className="group text-left bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-brand-navy/5 transition-shadow w-full cursor-pointer"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={`/images/menu/${item.id}.jpg`}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: item.gradient }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        {item.tag && (
          <div className="absolute top-2.5 left-2.5">
            <span className={cn("inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border", TAG_STYLES[item.tag])}>
              {t(item.tag)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading font-semibold text-sm text-foreground leading-snug group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">
            {name}
          </h3>
          <span className="shrink-0 text-brand-gold font-semibold text-sm">{formatPrice(item.price)}</span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{description}</p>
      </div>
    </motion.button>
  )
}

export default function MenuPage() {
  const t = useTranslations("menu")
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)

  const categoryLabels: Record<MenuCategory, string> = {
    entradas:    t("tabEntradas"),
    principales: t("tabPrincipales"),
    postres:     t("tabPostres"),
    cocteles:    t("tabCocteles"),
  }

  return (
    <>
      {/* Hero del menú */}
      <section
        className="pt-28 pb-16 text-center"
        style={{ background: "linear-gradient(180deg, #0F2540 0%, #1E3A5F 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            {t("pretitle")}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
            Nuestra carta completa
          </h1>
          <p className="text-white/60 text-base max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Categorías */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {CATEGORIES.map(({ value, emoji }) => {
          const items = MENU_ITEMS.filter((i) => i.category === value)
          return (
            <div key={value}>
              {/* Category heading */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="text-3xl" aria-hidden="true">{emoji}</span>
                <h2 className="font-heading font-bold text-3xl text-foreground">
                  {categoryLabels[value]}
                </h2>
                <div className="flex-1 h-px bg-border ml-2" />
              </motion.div>

              {/* Grid */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {items.map((item) => (
                  <DishCard key={item.id} item={item} onOpen={setSelectedDish} />
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* CTA reservas */}
      <div className="bg-brand-cream dark:bg-brand-navy text-center py-16 px-4">
        <p className="text-muted-foreground mb-2 text-sm uppercase tracking-widest font-medium">¿Te antojaste?</p>
        <h2 className="font-heading font-bold text-3xl text-foreground mb-6">Reserva tu mesa ahora</h2>
        <a
          href="/#reservar"
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-semibold transition-colors"
        >
          Reservar mesa
        </a>
      </div>

      <Footer />
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  )
}
