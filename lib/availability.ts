import { TIME_SLOTS } from "@/types/reservation"

/** Devuelve qué slots están disponibles para una fecha dada.
 *  Usa un hash determinista (no Math.random) para que el mismo día
 *  siempre muestre la misma disponibilidad — hace el demo creíble. */
export function getSlotAvailability(date: Date): Record<string, boolean> {
  const d = date.getDate()
  const m = date.getMonth()
  const dow = date.getDay() // 0=Dom, 6=Sáb

  const availability: Record<string, boolean> = {}

  TIME_SLOTS.forEach((slot, idx) => {
    // Hash determinista basado en fecha + índice del slot
    const hash = (d * 17 + m * 11 + idx * 7) % 10
    availability[slot] = hash >= 3 // ~70 % disponible
  })

  // Fines de semana: los horarios más populares están ocupados
  if (dow === 0 || dow === 6) {
    availability["20:00"] = false
    availability["20:30"] = false
    availability["21:00"] = false
  }

  // Viernes también lleno en la noche
  if (dow === 5) {
    availability["20:30"] = false
    availability["21:00"] = false
  }

  return availability
}

/** Genera un código de reserva único con formato LCM-XXXXXX */
export function generateReservationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // sin O/0/I/1 para evitar confusión
  let code = "LCM-"
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

/** Guarda la reserva en localStorage */
export function saveReservation(data: object): void {
  if (typeof window === "undefined") return
  const existing = JSON.parse(localStorage.getItem("lcm_reservations") ?? "[]")
  localStorage.setItem("lcm_reservations", JSON.stringify([...existing, data]))
}

/** Construye la URL de WhatsApp con resumen de reserva */
export function buildWhatsAppShareUrl(params: {
  date: Date
  time: string
  guests: number
  nombre: string
  code: string
}): string {
  const { date, time, guests, nombre, code } = params
  const dateStr = date.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
  const msg = `¡Hola! Confirmo mi reserva en La Cevichería del Mar:\n\n🍽️ *La Cevichería del Mar*\n📋 Código: *${code}*\n📅 ${dateStr} a las ${time}\n👥 ${guests} persona${guests !== 1 ? "s" : ""}\n👤 ${nombre}`
  return `https://wa.me/573001234567?text=${encodeURIComponent(msg)}`
}
