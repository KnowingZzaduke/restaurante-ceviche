import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { Navbar } from "@/components/shared/navbar"
import { WhatsAppFloat } from "@/components/shared/whatsapp-float"
import { Toaster } from "sonner"

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laceviceriadelmar.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === "en"

  const title = en
    ? "La Cevichería del Mar — Seafood & Fusion in Cartagena"
    : "La Cevichería del Mar — Mariscos y Fusión en Cartagena"

  const description = en
    ? "Peruvian-Colombian fusion restaurant in the Historic Center of Cartagena de Indias. Fresh seafood, authentic ceviche and tropical cocktails. Book your table online."
    : "Restaurante de mariscos y cevichería con fusión peruana-colombiana en el Centro Histórico de Cartagena de Indias. Reserva tu mesa en línea."

  const canonical = en ? `${SITE}/en` : SITE

  return {
    title: {
      template: `%s | La Cevichería del Mar`,
      default: title,
    },
    description,
    keywords: en
      ? ["cartagena restaurant", "ceviche cartagena", "seafood cartagena", "peruvian colombian fusion", "book table cartagena"]
      : ["restaurante cartagena", "ceviche cartagena", "mariscos cartagena", "restaurante centro histórico", "fusión peruana colombiana", "reservas restaurante cartagena"],
    alternates: {
      canonical,
      languages: {
        es: SITE,
        en: `${SITE}/en`,
        "x-default": SITE,
      },
    },
    openGraph: {
      type: "website",
      siteName: "La Cevichería del Mar",
      url: canonical,
      locale: en ? "en_US" : "es_CO",
      title,
      description: en
        ? "Caribbean flavors, Pacific soul. Peruvian-Colombian fusion in the heart of Cartagena de Indias."
        : "Sabores del Caribe, alma del Pacífico. Fusión peruana-colombiana en el corazón de Cartagena de Indias.",
      images: [
        {
          url: `${SITE}/images/hero-bg.jpg`,
          width: 1920,
          height: 1080,
          alt: "La Cevichería del Mar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: en
        ? "Peruvian-Colombian fusion in Cartagena de Indias. Book your table now."
        : "Fusión peruana-colombiana en Cartagena de Indias. Reserva tu mesa ahora.",
      images: [`${SITE}/images/hero-bg.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  }
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
