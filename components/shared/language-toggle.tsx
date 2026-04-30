"use client"

import { useLocale, useTranslations } from "next-intl"
import { useTransition } from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "@/navigation"

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
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label="Cambiar idioma / Switch language"
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
