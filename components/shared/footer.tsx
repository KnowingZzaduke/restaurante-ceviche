import { useTranslations } from "next-intl"
import { MapPin, Phone, Mail, Clock, UtensilsCrossed } from "lucide-react"
import { NewsletterForm } from "./newsletter-form"

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function TripAdvisorIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.584 1.585a5.78 5.78 0 0 0-.742 2.865 5.813 5.813 0 0 0 5.808 5.806 5.78 5.78 0 0 0 3.81-1.432L12 16.903l1.54-1.431a5.784 5.784 0 0 0 3.811 1.432 5.812 5.812 0 0 0 5.807-5.806 5.78 5.78 0 0 0-.742-2.865L24 6.648h-4.36c-2.307-1.57-4.976-2.353-7.634-2.353zM6.65 8.914a3.188 3.188 0 1 1 0 6.377 3.188 3.188 0 0 1 0-6.377zm10.71 0a3.188 3.188 0 1 1 0 6.377 3.188 3.188 0 0 1 0-6.377zm-10.71 1.597a1.592 1.592 0 1 0 0 3.183 1.592 1.592 0 0 0 0-3.183zm10.71 0a1.592 1.592 0 1 0 0 3.183 1.592 1.592 0 0 0 0-3.183z" />
    </svg>
  )
}

export function Footer() {
  const t = useTranslations("footer")
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
                <UtensilsCrossed size={16} className="text-white" />
              </div>
              <span className="font-heading font-bold text-white text-lg leading-tight">
                La Cevichería del Mar
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">{t("desc")}</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-brand-gold mt-0.5 shrink-0" />
                <span>Calle del Cuartel #36-77, Centro Histórico, Cartagena</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-gold shrink-0" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-gold shrink-0" />
                <span>reservas@laceviceriadelmar.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-brand-gold mt-0.5 shrink-0" />
                <span>Mar–Dom: 12:00 PM – 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Menu column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("colMenu")}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {["Entradas", "Principales", "Postres", "Cócteles", "Menú completo"].map((item) => (
                <li key={item}>
                  <a href="#menu" className="hover:text-brand-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reservas column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("colReservas")}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: "Reservar mesa", href: "#reservar" },
                { label: "Eventos privados", href: "#experiencia" },
                { label: "Menú degustación", href: "#experiencia" },
                { label: "Política de reservas", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-brand-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("colRedes")}
            </h3>
            <div className="flex gap-3 mb-6">
              {[
                { icon: <InstagramIcon />, label: "Instagram", href: "#" },
                { icon: <FacebookIcon />, label: "Facebook", href: "#" },
                { icon: <TripAdvisorIcon />, label: "TripAdvisor", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-gold/20 hover:text-brand-gold flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider + legal */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>{t("legal", { year })}</p>
          <p>
            {t("credito")}{" "}
            <a
              href="https://joseluisarteta.com"
              className="text-brand-gold/60 hover:text-brand-gold transition-colors"
            >
              José Luis Arteta
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
