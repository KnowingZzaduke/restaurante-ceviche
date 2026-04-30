"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, UtensilsCrossed } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { buttonVariants } from "@/components/ui/button"

const WHATSAPP_NUMBER = "573001234567"
const WHATSAPP_MESSAGE = "Hola, me gustaría hacer una reserva en La Cevichería del Mar."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function Navbar() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const prefix = locale === "en" ? "/en" : ""

  const navLinks = [
    { label: t("inicio"), href: `${prefix}/#inicio` },
    { label: t("menu"), href: `${prefix}/#menu` },
    { label: t("galeria"), href: `${prefix}/#galeria` },
    { label: t("nosotros"), href: `${prefix}/#nosotros` },
    { label: t("contacto"), href: `${prefix}/#contacto` },
  ]

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.split("#")[1]
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 shrink-0"
          aria-label="La Cevichería del Mar - Inicio"
        >
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              scrolled ? "bg-brand-navy" : "bg-brand-gold"
            )}
          >
            <UtensilsCrossed size={16} className="text-white" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className={cn(
                "font-heading font-bold text-base tracking-tight transition-colors",
                scrolled ? "text-brand-navy dark:text-brand-gold" : "text-white"
              )}
            >
              La Cevichería del Mar
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                scrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageToggle
            className={cn(scrolled ? "text-foreground/70" : "text-white/80")}
          />
          <ThemeToggle />
          <a
            href="#reservar"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(`${prefix}/#reservar`)
            }}
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-semibold border-0 px-4"
            )}
          >
            {t("reservar")}
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-1">
          <LanguageToggle
            className={cn(scrolled ? "text-foreground/70" : "text-white/80")}
          />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú"
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            )}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-background/98 backdrop-blur-md border-b border-border"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#reservar"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(`${prefix}/#reservar`)
                  }}
                  className="inline-flex items-center justify-center h-10 rounded-lg bg-brand-gold text-brand-navy-dark font-semibold text-sm hover:bg-brand-gold-dark transition-colors"
                >
                  {t("reservar")}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 rounded-lg border border-border text-foreground/70 text-sm hover:bg-muted transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
