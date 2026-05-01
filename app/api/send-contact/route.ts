import { NextResponse } from "next/server"

interface ContactPayload {
  nombre: string
  email: string
  mensaje: string
}

function buildRestaurantEmail(p: ContactPayload): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><title>Nuevo mensaje de contacto</title></head>
<body style="margin:0;padding:24px;background:#f9f9f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <div style="background:#1E3A5F;padding:24px 32px;">
    <p style="margin:0;font-size:12px;color:#D4A24C;letter-spacing:3px;text-transform:uppercase;">La Cevichería del Mar</p>
    <h2 style="margin:8px 0 0;font-size:20px;color:#fff;font-weight:700;">📬 Nuevo mensaje de contacto</h2>
  </div>
  <div style="padding:28px 32px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
      <tr style="background:#FAFAFA;">
        <td style="padding:12px 16px;color:#6B6259;width:30%;border-bottom:1px solid #F0EBE3;">Nombre</td>
        <td style="padding:12px 16px;font-weight:600;color:#1A1A1A;border-bottom:1px solid #F0EBE3;">${p.nombre}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;color:#6B6259;border-bottom:1px solid #F0EBE3;">Email</td>
        <td style="padding:12px 16px;border-bottom:1px solid #F0EBE3;"><a href="mailto:${p.email}" style="color:#1E3A5F;font-weight:600;">${p.email}</a></td>
      </tr>
    </table>
    <div style="background:#FFF8EC;border:1px solid #E5DDD5;border-left:3px solid #D4A24C;border-radius:0 8px 8px 0;padding:16px 20px;">
      <p style="margin:0 0 6px;font-size:11px;color:#6B6259;text-transform:uppercase;letter-spacing:2px;">Mensaje</p>
      <p style="margin:0;font-size:14px;color:#3D3228;line-height:1.7;white-space:pre-wrap;">${p.mensaje}</p>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#6B6259;">Responde directamente a <a href="mailto:${p.email}" style="color:#1E3A5F;">${p.email}</a></p>
  </div>
  <div style="background:#0F2540;padding:18px 32px;text-align:center;">
    <p style="margin:0;font-size:12px;color:#4A7BA8;">+57 300 123 4567 · reservas@laceviceriadelmar.com</p>
  </div>
</div>
</body>
</html>`
}

function buildAutoReplyEmail(p: ContactPayload): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><title>Recibimos tu mensaje</title></head>
<body style="margin:0;padding:32px 16px;background:#F5EDD8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#1E3A5F;padding:32px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#D4A24C;letter-spacing:3px;text-transform:uppercase;">La Cevichería del Mar</p>
          <h1 style="margin:10px 0 0;font-size:22px;color:#fff;font-weight:700;">¡Hola, ${p.nombre.split(" ")[0]}! 👋</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <p style="margin:0 0 20px;color:#3D3228;font-size:15px;line-height:1.7;">
            Recibimos tu mensaje y te responderemos a la brevedad posible. Nuestro equipo está disponible de <strong>martes a domingo</strong>, de 12:00 PM a 11:00 PM.
          </p>
          <div style="background:#FFF8EC;border:1px solid #E5DDD5;border-left:3px solid #D4A24C;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:11px;color:#6B6259;text-transform:uppercase;letter-spacing:2px;">Tu mensaje</p>
            <p style="margin:0;font-size:13px;color:#3D3228;line-height:1.6;white-space:pre-wrap;">${p.mensaje}</p>
          </div>
          <p style="margin:0;font-size:13px;color:#6B6259;line-height:1.6;">
            ¿Necesitas una respuesta urgente? Escríbenos al <a href="https://wa.me/573001234567" style="color:#1E3A5F;font-weight:600;">+57 300 123 4567</a> por WhatsApp.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#0F2540;padding:24px 32px;text-align:center;">
          <p style="margin:0 0 6px;font-size:13px;color:#D4A24C;">Te esperamos en Cartagena</p>
          <p style="margin:0;font-size:12px;color:#4A7BA8;">Calle del Cuartel #36-77, Centro Histórico</p>
          <p style="margin:6px 0 0;font-size:11px;color:#2A4D7A;">Este email fue enviado automáticamente. No respondas a este mensaje.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.FROM_EMAIL ?? "La Cevichería del Mar <onboarding@resend.dev>"
    const restaurantEmail = process.env.RESTAURANT_EMAIL ?? "reservas@laceviceriadelmar.com"

    const payload: ContactPayload = await request.json()

    const [restaurantResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: restaurantEmail,
        replyTo: payload.email,
        subject: `📬 Nuevo mensaje de ${payload.nombre} — La Cevichería del Mar`,
        html: buildRestaurantEmail(payload),
      }),
      resend.emails.send({
        from: fromEmail,
        to: payload.email,
        subject: "Recibimos tu mensaje — La Cevichería del Mar",
        html: buildAutoReplyEmail(payload),
      }),
    ])

    if (restaurantResult.error) {
      return NextResponse.json({ error: restaurantResult.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("send-contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
