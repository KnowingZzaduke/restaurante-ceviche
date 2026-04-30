"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Send, Check } from "lucide-react"

export function NewsletterForm() {
  const t = useTranslations("footer")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const subs = JSON.parse(localStorage.getItem("newsletter_subs") || "[]") as string[]
    if (!subs.includes(email)) {
      localStorage.setItem("newsletter_subs", JSON.stringify([...subs, email]))
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <Check size={16} />
        <span>{t("newsletterOk")}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletterPlaceholder")}
        required
        className="flex-1 h-9 px-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors min-w-0"
      />
      <button
        type="submit"
        aria-label={t("newsletterBtn")}
        className="w-9 h-9 rounded-lg bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark flex items-center justify-center shrink-0 transition-colors"
      >
        <Send size={15} />
      </button>
    </form>
  )
}
