"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale()
  const t = useTranslations("nav")
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleSwitch = () => {
    const nextLocale = locale === "es" ? "en" : "es"
    startTransition(() => {
      // Strip current locale prefix if present, then add new one
      const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/"
      const newPath = nextLocale === "es" ? pathWithoutLocale : `/en${pathWithoutLocale}`
      router.replace(newPath)
    })
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label="Cambiar idioma"
      className={cn(
        "h-8 px-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors",
        "border border-current/20 hover:bg-foreground/8",
        isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {t("langSwitch")}
    </button>
  )
}
