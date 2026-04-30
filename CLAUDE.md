@AGENTS.md

# La Cevichería del Mar — Demo Restaurante

Prototipo profesional de sitio web para restaurante ficticio en Cartagena. Objetivo triple: demo de ventas a clientes PYMEs, pieza de portafolio y plantilla reutilizable.

## Stack y versiones exactas

| Paquete | Versión | Gotcha crítico |
|---|---|---|
| Next.js | 16.2.4 | `middleware.ts` deprecado → usar `proxy.ts` con export nombrado `proxy` |
| Tailwind CSS | v4 | Sin `tailwind.config.ts` — colores en `@theme inline` en CSS |
| shadcn/ui | 4.x | Usa `@base-ui/react` — Button sin `asChild`, usar `buttonVariants` en `<a>` |
| next-intl | 4.11.0 | `getRequestConfig` recibe `{requestLocale: Promise<string|undefined>}`, awaitar |
| framer-motion | 12.38.0 | `ease` necesita `as const`; importar `Variants` explícitamente |
| lucide-react | v1.x | Sin iconos de marca (Github, Linkedin) — usar SVG inline |
| zod | 4.4.1 | `z.string().email()` funciona; `z.infer<typeof schema>` igual |
| sonner | 2.0.7 | `<Toaster />` en layout locale, `toast.success()` en cliente |

## Internacionalización (next-intl v4)

- Locales: `es` (default, sin prefijo de URL), `en` → `/en/...`
- `proxy.ts` (raíz) maneja el routing — reemplaza `middleware.ts`
- Client Components: `useTranslations("namespace")`, `useLocale()`
- Server Components: `getTranslations("namespace")`, `getLocale()`

## Paleta de colores

Definida en `app/globals.css` en `@theme inline`. Uso: `bg-brand-navy`, `text-brand-gold`, etc.

- `brand-navy` #1E3A5F · `brand-navy-dark` #0F2540 · `brand-navy-light` #2A4D7A
- `brand-gold` #D4A24C · `brand-gold-dark` #B8882E · `brand-gold-light` #E8BB6B
- `brand-coral` #E8896A · `brand-cream` #FAF7F2 · `brand-warm-gray` #6B6259

Dark mode: bg `#0F1A2A`, primary `#4A7BA8`, accent `#E5B563`

## Tipografía

- Títulos: Playfair Display → clase `font-heading`
- Cuerpo/UI: Plus Jakarta Sans → clase `font-sans` (default)

## Imagen del Hero

Necesita `/public/images/hero-bg.jpg`. Buscar en Unsplash: `"ceviche seafood cartagena"` o `"seafood platter elegant"`. Mínimo 1920×1080px.

## Constantes del restaurante

- WhatsApp: `573001234567`
- Email: `reservas@laceviceriadelmar.com`
- Dirección: Calle del Cuartel #36-77, Centro Histórico, Cartagena
- Horarios: Mar–Dom 12:00 PM – 11:00 PM (Cerrado lunes)

## Estado por sesión

- ✅ Sesión 1: Setup, next-intl v4, paleta, fuentes, Navbar, Hero, Footer
- ⏳ Sesión 2: Historia + Menú destacado con tabs
- ⏳ Sesión 3: Sistema de reservas (3 pasos, localStorage)
- ⏳ Sesión 4: Galería + Experiencia + Testimonios
- ⏳ Sesión 5: Ubicación + Contacto + pulido
- ⏳ Sesión 6: Páginas /menu y /reservar
- ⏳ Sesión 7: SEO Schema.org + sitemap + Vercel

## Comandos

```bash
npm run dev    # localhost:3000
npm run build  # build producción
```
