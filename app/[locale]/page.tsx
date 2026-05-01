import { HeroSection }         from "@/components/sections/hero"
import { HistoriaSection }      from "@/components/sections/historia"
import { MenuDestacadoSection } from "@/components/sections/menu-destacado"
import { GaleriaSection }       from "@/components/sections/galeria"
import { ExperienciaSection }   from "@/components/sections/experiencia"
import { TestimoniosSection }   from "@/components/sections/testimonios"
import { ReservasSection }      from "@/components/sections/reservas"
import { UbicacionSection }     from "@/components/sections/ubicacion"
import { Footer }               from "@/components/shared/footer"

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laceviceriadelmar.com"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  "@id": SITE,
  name: "La Cevichería del Mar",
  description:
    "Restaurante de mariscos y fusión peruana-colombiana en el Centro Histórico de Cartagena de Indias. Ceviches auténticos, platos principales y cócteles tropicales.",
  url: SITE,
  telephone: "+573001234567",
  email: "reservas@laceviceriadelmar.com",
  foundingDate: "2013",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle del Cuartel #36-77",
    addressLocality: "Cartagena de Indias",
    addressRegion: "Bolívar",
    postalCode: "130001",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.4236,
    longitude: -75.5481,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "23:00",
    },
  ],
  servesCuisine: ["Peruana", "Colombiana", "Mariscos", "Fusión"],
  priceRange: "$$$",
  image: `${SITE}/images/hero-bg.jpg`,
  menu: `${SITE}/menu`,
  acceptsReservations: "True",
  hasMap: "https://maps.google.com/?q=Calle+del+Cuartel+36-77+Cartagena+de+Indias",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "250",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: ["https://instagram.com/laceviceriadelmar"],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <HistoriaSection />
      <MenuDestacadoSection />
      <GaleriaSection />
      <ExperienciaSection />
      <TestimoniosSection />
      <ReservasSection />
      <UbicacionSection />
      <Footer />
    </>
  )
}
