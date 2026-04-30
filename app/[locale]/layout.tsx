import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { Navbar } from "@/components/shared/navbar"
import { WhatsAppFloat } from "@/components/shared/whatsapp-float"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: {
    template: "%s | La Cevichería del Mar",
    default: "La Cevichería del Mar — Mariscos y Fusión en Cartagena",
  },
  description:
    "Restaurante de mariscos y cevichería con fusión peruana-colombiana en el Centro Histórico de Cartagena de Indias. Reserva tu mesa en línea.",
  keywords: [
    "restaurante cartagena",
    "ceviche cartagena",
    "mariscos cartagena",
    "restaurante centro histórico",
    "fusión peruana colombiana",
    "reservas cartagena",
  ],
  openGraph: {
    type: "website",
    siteName: "La Cevichería del Mar",
    title: "La Cevichería del Mar — Mariscos y Fusión en Cartagena",
    description:
      "Sabores del Caribe, alma del Pacífico. Fusión peruana-colombiana en el corazón de Cartagena de Indias.",
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <Navbar />
        <main>{children}</main>
        <WhatsAppFloat />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
