import { NextResponse } from "next/server"

interface ReservationPayload {
  code: string
  nombre: string
  email: string
  telefono: string
  date: string
  time: string
  guests: number
  zone: string
  ocasion?: string
  comentarios?: string
  locale: string
}

function zoneName(zone: string, locale: string) {
  const map: Record<string, Record<string, string>> = {
    sala:              { es: "Salón interior", en: "Indoor dining room" },
    terraza:           { es: "Terraza",        en: "Terrace" },
    "sin-preferencia": { es: "Sin preferencia", en: "No preference" },
  }
  return map[zone]?.[locale] ?? zone
}

function ocasionName(ocasion: string, locale: string) {
  const map: Record<string, Record<string, string>> = {
    cumpleanos:  { es: "Cumpleaños 🎂",       en: "Birthday 🎂" },
    aniversario: { es: "Aniversario 💍",      en: "Anniversary 💍" },
    romantica:   { es: "Cena romántica 🌹",   en: "Romantic dinner 🌹" },
    negocios:    { es: "Reunión de negocios 💼", en: "Business meeting 💼" },
    otra:        { es: "Otra ocasión ✨",      en: "Other occasion ✨" },
  }
  return map[ocasion]?.[locale] ?? ocasion
}

function buildClientEmail(p: ReservationPayload): string {
  const isEs = p.locale !== "en"
  const dateStr = new Date(p.date).toLocaleDateString(
    isEs ? "es-CO" : "en-US",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  )
  const zone = zoneName(p.zone, p.locale)
  const ocasion = p.ocasion ? ocasionName(p.ocasion, p.locale) : ""

  const labels = isEs
    ? {
        greeting: `Hola, ${p.nombre.split(" ")[0]}`,
        body: "Tu reserva en <strong>La Cevichería del Mar</strong> ha sido confirmada. Aquí tienes todos los detalles:",
        code: "Código de reserva",
        fecha: "Fecha",
        hora: "Hora",
        personas: "Personas",
        zona: "Zona",
        ocasion: "Ocasión especial",
        tel: "Teléfono",
        comentarios: "Comentarios",
        nota: "¿Necesitas modificar o cancelar? Contáctanos al <strong>+57 300 123 4567</strong> con al menos 2 horas de anticipación.",
        footer: "Te esperamos con el mar en la mesa.",
        footerNote: "Este email fue enviado automáticamente. No respondas a este mensaje.",
      }
    : {
        greeting: `Hello, ${p.nombre.split(" ")[0]}`,
        body: "Your reservation at <strong>La Cevichería del Mar</strong> has been confirmed. Here are your details:",
        code: "Reservation code",
        fecha: "Date",
        hora: "Time",
        personas: "Guests",
        zona: "Seating area",
        ocasion: "Special occasion",
        tel: "Phone",
        comentarios: "Comments",
        nota: "Need to modify or cancel? Contact us at <strong>+57 300 123 4567</strong> at least 2 hours in advance.",
        footer: "We look forward to having you at our table.",
        footerNote: "This email was sent automatically. Please do not reply to this message.",
      }

  const rows = [
    ["fecha", dateStr],
    ["hora", p.time],
    ["personas", String(p.guests)],
    ["zona", zone],
    ...(p.ocasion ? [["ocasion", ocasion]] : []),
    ["tel", p.telefono],
    ...(p.comentarios ? [["comentarios", p.comentarios]] : []),
  ] as [string, string][]

  return `<!DOCTYPE html>
<html lang="${p.locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${labels.greeting}</title>
</head>
<body style="margin:0;padding:0;background:#F5EDD8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EDD8;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#1E3A5F;padding:32px 32px 24px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#D4A24C;letter-spacing:3px;text-transform:uppercase;">La Cevichería del Mar</p>
          <h1 style="margin:8px 0 0;font-size:24px;color:#ffffff;font-weight:700;line-height:1.3;">${labels.greeting} 🎉</h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:32px;">
          <p style="margin:0 0 24px;color:#3D3228;font-size:15px;line-height:1.6;">${labels.body}</p>

          <!-- Code box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td align="center" style="background:#FFF8EC;border:2px solid #D4A24C;border-radius:12px;padding:16px 24px;">
                <p style="margin:0 0 4px;font-size:11px;color:#6B6259;letter-spacing:2px;text-transform:uppercase;">${labels.code}</p>
                <p style="margin:0;font-size:28px;font-weight:700;color:#1E3A5F;letter-spacing:4px;">${p.code}</p>
              </td>
            </tr>
          </table>

          <!-- Details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5DDD5;border-radius:12px;overflow:hidden;">
            ${rows
              .map(
                ([key, value], i) => `
            <tr style="background:${i % 2 === 0 ? "#FAFAFA" : "#ffffff"};">
              <td style="padding:12px 16px;font-size:13px;color:#6B6259;width:40%;border-bottom:1px solid #F0EBE3;">${labels[key as keyof typeof labels] ?? key}</td>
              <td style="padding:12px 16px;font-size:13px;color:#1A1A1A;font-weight:600;border-bottom:1px solid #F0EBE3;">${value}</td>
            </tr>`
              )
              .join("")}
          </table>

          <!-- Note -->
          <p style="margin:24px 0 0;padding:16px;background:#FFF8EC;border-left:3px solid #D4A24C;border-radius:0 8px 8px 0;font-size:13px;color:#3D3228;line-height:1.6;">${labels.nota}</p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#0F2540;padding:24px 32px;text-align:center;">
          <p style="margin:0 0 8px;font-size:14px;color:#D4A24C;">${labels.footer}</p>
          <p style="margin:0;font-size:12px;color:#4A7BA8;">Calle del Cuartel #36-77, Centro Histórico, Cartagena</p>
          <p style="margin:8px 0 0;font-size:12px;color:#4A7BA8;">+57 300 123 4567 · reservas@laceviceriadelmar.com</p>
          <p style="margin:16px 0 0;font-size:11px;color:#2A4D7A;">${labels.footerNote}</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function buildRestaurantEmail(p: ReservationPayload): string {
  const dateStr = new Date(p.date).toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })
  const zone = zoneName(p.zone, "es")
  const ocasion = p.ocasion ? ocasionName(p.ocasion, "es") : "—"

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><title>Nueva reserva ${p.code}</title></head>
<body style="margin:0;padding:24px;background:#f9f9f9;font-family:sans-serif;">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #ddd;">
  <h2 style="color:#1E3A5F;margin-top:0;">Nueva reserva — ${p.code}</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:8px 0;color:#666;width:35%;">Nombre</td><td style="font-weight:600;">${p.nombre}</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Email</td><td><a href="mailto:${p.email}">${p.email}</a></td></tr>
    <tr><td style="padding:8px 0;color:#666;">Teléfono</td><td>${p.telefono}</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Fecha</td><td style="font-weight:600;">${dateStr}</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Hora</td><td style="font-weight:600;">${p.time}</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Personas</td><td>${p.guests}</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Zona</td><td>${zone}</td></tr>
    <tr><td style="padding:8px 0;color:#666;">Ocasión</td><td>${ocasion}</td></tr>
    ${p.comentarios ? `<tr><td style="padding:8px 0;color:#666;">Comentarios</td><td>${p.comentarios}</td></tr>` : ""}
  </table>
</div>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.FROM_EMAIL ?? "La Cevichería del Mar <onboarding@resend.dev>"
    const restaurantEmail = process.env.RESTAURANT_EMAIL ?? "reservas@laceviceriadelmar.com"

    const payload: ReservationPayload = await request.json()

    const isEs = payload.locale !== "en"
    const subject = isEs
      ? `✅ Confirmación de reserva ${payload.code} — La Cevichería del Mar`
      : `✅ Reservation confirmation ${payload.code} — La Cevichería del Mar`

    const [clientResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: payload.email,
        subject,
        html: buildClientEmail(payload),
      }),
      resend.emails.send({
        from: fromEmail,
        to: restaurantEmail,
        subject: `🔔 Nueva reserva ${payload.code} — ${payload.nombre} · ${new Date(payload.date).toLocaleDateString("es-CO")} ${payload.time}`,
        html: buildRestaurantEmail(payload),
      }),
    ])

    if (clientResult.error) {
      return NextResponse.json({ error: clientResult.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("send-reservation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
