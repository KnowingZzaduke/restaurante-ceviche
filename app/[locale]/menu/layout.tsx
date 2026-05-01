import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === "en"

  return {
    title: en ? "Full Menu" : "Menú completo",
    description: en
      ? "Explore the complete menu of La Cevichería del Mar: starters, mains, desserts and cocktails. Peruvian-Colombian fusion in Cartagena de Indias."
      : "Explora el menú completo de La Cevichería del Mar: entradas, platos principales, postres y cócteles. Fusión peruana-colombiana en Cartagena de Indias.",
    openGraph: {
      title: en
        ? "Full Menu | La Cevichería del Mar"
        : "Menú Completo | La Cevichería del Mar",
      url: en ? "/en/menu" : "/menu",
    },
  }
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
