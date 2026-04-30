"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { getByCategory, formatPrice } from "@/lib/menu-data"
import type { MenuItem, MenuCategory } from "@/types/menu"
import { DishModal } from "./dish-modal"

/* ── Animaciones ───────────────────────────────────── */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
}

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

/* ── Tag styles ────────────────────────────────────── */
const TAG_STYLES: Record<string, string> = {
  especialidad: "bg-brand-gold/15 text-brand-gold-dark dark:text-brand-gold border-brand-gold/30",
  nuevo:        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  vegetariano:  "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  picante:      "bg-brand-coral/15 text-brand-coral-dark dark:text-brand-coral border-brand-coral/30",
}

/* ── Dish card ─────────────────────────────────────── */
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
      className="group text-left bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-brand-navy/6 dark:hover:shadow-brand-gold/5 transition-shadow w-full cursor-pointer"
      aria-label={`Ver detalles de ${name}`}
    >
      {/* Imagen */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={`/images/menu/${item.id}.jpg`}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient fallback */}
        {/* <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: item.gradient }}
          aria-hidden="true"
        /> */}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

        {item.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={cn(
                "inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border",
                TAG_STYLES[item.tag]
              )}
            >
              {t(item.tag)}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-semibold text-base text-foreground leading-snug group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">
            {name}
          </h3>
          <span className="shrink-0 font-semibold text-brand-gold dark:text-brand-gold-light text-sm pt-0.5">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <p className="mt-3 text-xs font-medium text-brand-navy/60 dark:text-brand-gold/60 group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">
          Ver detalles →
        </p>
      </div>
    </motion.button>
  )
}

/* ── Grid por categoría ────────────────────────────── */
function DishGrid({
  category,
  onOpen,
}: {
  category: MenuCategory
  onOpen: (item: MenuItem) => void
}) {
  const items = getByCategory(category)

  return (
    <motion.div
      key={category}
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {items.map((item) => (
        <DishCard key={item.id} item={item} onOpen={onOpen} />
      ))}
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────────── */
export function MenuDestacadoSection() {
  const t = useTranslations("menu")
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)

  const categories: { value: MenuCategory; label: string }[] = [
    { value: "entradas",    label: t("tabEntradas") },
    { value: "principales", label: t("tabPrincipales") },
    { value: "postres",     label: t("tabPostres") },
    { value: "cocteles",    label: t("tabCocteles") },
  ]

  return (
    <>
      <section id="menu" className="py-20 sm:py-28 bg-brand-cream dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
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

          {/* Tabs */}
          <Tabs defaultValue="entradas">
            <div className="flex justify-center mb-10">
              <TabsList
                variant="line"
                className="h-auto gap-0 bg-transparent border-b border-border rounded-none w-full max-w-lg"
              >
                {categories.map(({ value, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={cn(
                      "flex-1 rounded-none pb-3 pt-1 text-sm sm:text-base font-medium h-auto",
                      "text-muted-foreground hover:text-foreground",
                      "data-active:text-brand-navy dark:data-active:text-brand-gold",
                      "after:bg-brand-gold after:h-[2px] after:bottom-0"
                    )}
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map(({ value }) => (
              <TabsContent key={value} value={value}>
                <DishGrid category={value} onOpen={setSelectedDish} />
              </TabsContent>
            ))}
          </Tabs>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href="/menu"
              className="inline-flex items-center justify-center h-11 px-8 rounded-xl border-2 border-brand-navy dark:border-brand-gold text-brand-navy dark:text-brand-gold font-semibold text-sm hover:bg-brand-navy hover:text-white dark:hover:bg-brand-gold dark:hover:text-brand-navy-dark transition-colors"
            >
              {t("verCompleto")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal fuera del section para evitar z-index issues */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  )
}
