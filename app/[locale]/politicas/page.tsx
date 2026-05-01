import type { Metadata } from "next"
import { Link } from "@/navigation"

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laceviceriadelmar.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === "en"
  return {
    title: en ? "Reservation & Cancellation Policy" : "Políticas de Reserva y Cancelación",
    description: en
      ? "Read our reservation and cancellation policies before booking your table at La Cevichería del Mar."
      : "Consulta nuestras políticas de reserva y cancelación antes de reservar tu mesa en La Cevichería del Mar.",
    alternates: {
      canonical: en ? `${SITE}/en/politicas` : `${SITE}/politicas`,
      languages: { es: `${SITE}/politicas`, en: `${SITE}/en/politicas` },
    },
    robots: { index: true, follow: true },
  }
}

/* ── Section block ────────────────────────────────── */
function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h2 className="font-heading font-bold text-xl text-brand-navy dark:text-white">{title}</h2>
      </div>
      <div className="pl-10 space-y-3 text-[15px] leading-relaxed text-brand-warm-gray dark:text-white/70">
        {children}
      </div>
    </div>
  )
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <span className="text-brand-gold mt-0.5 shrink-0">•</span>
      <p>{children}</p>
    </div>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-brand-gold/8 border border-brand-gold/20 text-brand-navy dark:text-white/85 font-medium">
      {children}
    </div>
  )
}

/* ── Page ─────────────────────────────────────────── */
export default async function PoliticasPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const en = locale === "en"

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Back link */}
        <Link
          href="/#reservar"
          className="inline-flex items-center gap-2 text-sm text-brand-warm-gray dark:text-white/50 hover:text-brand-navy dark:hover:text-white mb-10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {en ? "Back to reservations" : "Volver a reservas"}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            {en ? "Legal & policies" : "Legal y políticas"}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-brand-navy dark:text-white leading-tight mb-4">
            {en ? "Reservation & Cancellation Policy" : "Políticas de Reserva y Cancelación"}
          </h1>
          <p className="text-brand-warm-gray dark:text-white/60 text-[15px]">
            {en
              ? "Last updated: May 2026 · Please read these policies carefully before confirming your reservation."
              : "Última actualización: mayo 2026 · Por favor lee estas políticas con atención antes de confirmar tu reserva."}
          </p>
        </div>

        <div className="bg-white dark:bg-white/4 rounded-3xl border border-border shadow-sm p-8 sm:p-10">

          {/* Reservas */}
          <Section icon="📅" title={en ? "Reservations" : "Reservas"}>
            <Rule>
              {en
                ? "Reservations can be made up to 30 days in advance through our website, by phone, or via WhatsApp."
                : "Las reservas se pueden realizar con hasta 30 días de anticipación a través de nuestra web, por teléfono o vía WhatsApp."}
            </Rule>
            <Rule>
              {en
                ? "A minimum of 2 guests is required per reservation."
                : "Se requiere un mínimo de 2 personas por reserva."}
            </Rule>
            <Rule>
              {en
                ? "Your reservation is held for 15 minutes past the booked time. After that, the table may be reassigned."
                : "Tu mesa queda reservada durante 15 minutos después de la hora acordada. Pasado ese tiempo, podrá ser reasignada."}
            </Rule>
            <Rule>
              {en
                ? "Reservations are confirmed once you receive your booking code (LCM-XXXXXX) by email."
                : "La reserva se considera confirmada cuando recibes tu código de reserva (LCM-XXXXXX) por correo electrónico."}
            </Rule>
            <Highlight>
              {en
                ? "Monday is our rest day. We are open Tuesday through Sunday, 12:00 PM – 11:00 PM."
                : "Los lunes estamos cerrados. Atendemos de martes a domingo, de 12:00 PM a 11:00 PM."}
            </Highlight>
          </Section>

          <hr className="border-border my-8" />

          {/* Cancelación */}
          <Section icon="❌" title={en ? "Cancellations" : "Cancelaciones"}>
            <Rule>
              {en
                ? "Free cancellation up to 4 hours before your reservation time."
                : "Cancelación gratuita hasta 4 horas antes de la hora de tu reserva."}
            </Rule>
            <Rule>
              {en
                ? "Cancellations made less than 4 hours in advance will incur a charge of 50% of the minimum spend per person (COP $20,000/person)."
                : "Las cancelaciones realizadas con menos de 4 horas de anticipación tendrán un cargo del 50% del consumo mínimo por persona (COP $20.000/persona)."}
            </Rule>
            <Rule>
              {en
                ? "To cancel, contact us at +57 300 123 4567 (WhatsApp or call) or at reservas@laceviceriadelmar.com, stating your booking code."
                : "Para cancelar, comunícate al +57 300 123 4567 (WhatsApp o llamada) o escríbenos a reservas@laceviceriadelmar.com indicando tu código de reserva."}
            </Rule>
          </Section>

          <hr className="border-border my-8" />

          {/* No-show */}
          <Section icon="🚫" title="No-show">
            <Rule>
              {en
                ? "If you do not show up without prior notice, a no-show fee of COP $40,000 per person will be charged to future reservations."
                : "Si no se presenta sin previo aviso, se aplicará un cargo por no-show de COP $40.000 por persona que será descontado en futuras reservas."}
            </Rule>
            <Rule>
              {en
                ? "After 3 no-shows, we reserve the right to decline future reservations."
                : "Después de 3 no-shows consecutivos, nos reservamos el derecho de no aceptar reservas futuras."}
            </Rule>
          </Section>

          <hr className="border-border my-8" />

          {/* Grupos */}
          <Section icon="👥" title={en ? "Groups & Private Events" : "Grupos y Eventos Privados"}>
            <Rule>
              {en
                ? "Groups of 8 or more people require a 20% deposit of the estimated consumption at the time of booking."
                : "Para grupos de 8 o más personas se requiere un depósito del 20% del consumo estimado al momento de reservar."}
            </Rule>
            <Rule>
              {en
                ? "For private events (birthdays, anniversaries, corporate dinners), please contact us at least 72 hours in advance."
                : "Para eventos privados (cumpleaños, aniversarios, cenas corporativas), contáctanos con al menos 72 horas de anticipación."}
            </Rule>
            <Rule>
              {en
                ? "For private events, cancellation must be made at least 48 hours in advance to receive a full deposit refund."
                : "Los eventos privados tienen una política de cancelación de 48 horas de anticipación para el reembolso total del depósito."}
            </Rule>
            <Highlight>
              {en
                ? "For groups of 12 or more, we offer a special set menu. Ask for details on WhatsApp."
                : "Para grupos de 12 o más personas, ofrecemos un menú cerrado especial. Consulta los detalles por WhatsApp."}
            </Highlight>
          </Section>

          <hr className="border-border my-8" />

          {/* Consumo mínimo */}
          <Section icon="💳" title={en ? "Minimum Spend" : "Consumo Mínimo"}>
            <Rule>
              {en
                ? "During peak season (July–August and December–January), a minimum spend of COP $80,000 per person applies on weekends."
                : "En temporada alta (julio–agosto y diciembre–enero), aplica un consumo mínimo de COP $80.000 por persona los fines de semana."}
            </Rule>
            <Rule>
              {en
                ? "No minimum spend applies Monday through Thursday outside peak season."
                : "De lunes a jueves fuera de temporada alta no aplica consumo mínimo."}
            </Rule>
          </Section>

          <hr className="border-border my-8" />

          {/* Modificaciones */}
          <Section icon="✏️" title={en ? "Changes to Reservations" : "Modificaciones"}>
            <Rule>
              {en
                ? "Changes to date, time, or number of guests are free of charge with at least 4 hours' notice."
                : "Los cambios de fecha, hora o número de personas son gratuitos con al menos 4 horas de anticipación."}
            </Rule>
            <Rule>
              {en
                ? "Changes are subject to availability and cannot be guaranteed."
                : "Los cambios están sujetos a disponibilidad y no pueden garantizarse."}
            </Rule>
          </Section>

          <hr className="border-border my-8" />

          {/* Contacto */}
          <div className="rounded-2xl bg-brand-navy/5 dark:bg-white/5 border border-brand-navy/10 dark:border-white/10 p-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy dark:text-white mb-4">
              {en ? "Contact" : "Contacto"}
            </h2>
            <div className="space-y-2 text-sm text-brand-warm-gray dark:text-white/60">
              <p>📞 <a href="tel:+573001234567" className="hover:text-brand-navy dark:hover:text-white transition-colors">+57 300 123 4567</a></p>
              <p>✉️ <a href="mailto:reservas@laceviceriadelmar.com" className="hover:text-brand-navy dark:hover:text-white transition-colors">reservas@laceviceriadelmar.com</a></p>
              <p>📍 Calle del Cuartel #36-77, Centro Histórico, Cartagena de Indias</p>
              <p>🕐 {en ? "Tue–Sun 12:00 PM – 11:00 PM · Closed Mondays" : "Mar–Dom 12:00 PM – 11:00 PM · Cerrado lunes"}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
