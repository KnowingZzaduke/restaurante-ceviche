"use client"

import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"
import { Users, ChefHat, Wine } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

interface CardData {
  icon: LucideIcon
  title: string
  desc: string
  iconBg: string
  iconColor: string
  hoverBorder: string
  glow: string
}

export function ExperienciaSection() {
  const t = useTranslations("experiencia")

  const cards: CardData[] = [
    {
      icon: Users,
      title: t("card1Title"),
      desc: t("card1Desc"),
      iconBg: "bg-brand-gold/15",
      iconColor: "text-brand-gold",
      hoverBorder: "hover:border-brand-gold/40",
      glow: "group-hover:shadow-brand-gold/10",
    },
    {
      icon: ChefHat,
      title: t("card2Title"),
      desc: t("card2Desc"),
      iconBg: "bg-brand-coral/15",
      iconColor: "text-brand-coral",
      hoverBorder: "hover:border-brand-coral/40",
      glow: "group-hover:shadow-brand-coral/10",
    },
    {
      icon: Wine,
      title: t("card3Title"),
      desc: t("card3Desc"),
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      hoverBorder: "hover:border-blue-500/40",
      glow: "group-hover:shadow-blue-500/10",
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-brand-navy-dark">
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

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className={[
                  "group relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-8",
                  "transition-all duration-300",
                  "hover:bg-white/8 hover:shadow-xl",
                  card.hoverBorder,
                  card.glow,
                ].join(" ")}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={26} className={card.iconColor} />
                </div>

                {/* Text */}
                <h3 className="font-heading font-bold text-xl text-white mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {card.desc}
                </p>

                {/* Decorative bottom line */}
                <div className={`absolute bottom-0 left-8 right-8 h-px ${card.iconBg} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`} />
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
