import { HeroSection } from "@/components/sections/hero"
import { HistoriaSection } from "@/components/sections/historia"
import { MenuDestacadoSection } from "@/components/sections/menu-destacado"
import { ReservasSection } from "@/components/sections/reservas"
import { Footer } from "@/components/shared/footer"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HistoriaSection />
      <MenuDestacadoSection />
      <ReservasSection />
      {/* Sesión 4: GaleriaSection */}
      {/* Sesión 4: ExperienciaSection */}
      {/* Sesión 4: TestimoniosSection */}
      {/* Sesión 5: UbicacionSection */}
      <Footer />
    </>
  )
}
