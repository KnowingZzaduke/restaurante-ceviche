@AGENTS.md

# La Cevichería del Mar — Demo Restaurante

Prototipo profesional de sitio web para restaurante ficticio en Cartagena. Objetivo triple: demo de ventas a clientes PYMEs, pieza de portafolio y plantilla reutilizable.

**Dev server:** `npm run dev` → `http://localhost:3001` (3000 lo usa el portafolio)
**Repo:** `https://github.com/KnowingZzaduke/restaurante-ceviche.git`

---

## Stack y gotchas críticos

| Paquete | Versión | Gotcha — leer antes de tocar |
|---|---|---|
| Next.js | 16.2.4 | `middleware.ts` deprecado → usar `proxy.ts` con export nombrado `proxy` |
| Tailwind CSS | v4 | Sin `tailwind.config.ts` — colores en `@theme inline` en `globals.css` |
| shadcn/ui | 4.x | Usa `@base-ui/react` — `Button` **sin `asChild`** — usar `buttonVariants` en `<a>` |
| next-intl | 4.11.0 | Toggle de idioma usa `createNavigation` de `@/navigation.ts`, NO `next/navigation` |
| framer-motion | 12.38.0 | `ease` siempre `"easeOut" as const`; importar `type Variants` explícitamente |
| lucide-react | v1.x | Sin iconos de marca (Github, Linkedin) — usar SVG inline |
| zod | 4.4.1 | `z.string().email()` y `z.infer<>` funcionan igual que v3 |
| sonner | 2.0.7 | `<Toaster />` ya está en `app/[locale]/layout.tsx` |
| date-fns | 4.1.0 | Importar locales: `import { es, enUS } from "date-fns/locale"` |

---

## Internacionalización (next-intl v4) — patrón establecido

```
navigation.ts          ← createNavigation(routing) — para el language toggle
proxy.ts               ← createMiddleware(routing) — reemplaza middleware.ts
i18n/routing.ts        ← defineRouting({ locales: ['es','en'], defaultLocale: 'es', localePrefix: 'as-needed' })
i18n/request.ts        ← getRequestConfig con requestLocale awaiteado
messages/es.json       ← todas las cadenas en español
messages/en.json       ← todas las cadenas en inglés
app/[locale]/layout.tsx ← NextIntlClientProvider wrapping todo
```

- **Client Components:** `useTranslations("namespace")`, `useLocale()`
- **Server Components:** `getTranslations("namespace")`, `getLocale()`
- **Toggle de idioma:** `useRouter()` + `usePathname()` desde `@/navigation` (NO next/navigation), luego `router.replace(pathname, { locale: nextLocale })`
- Rutas: `/` = español, `/en` = inglés, `/en/menu` = menú en inglés

---

## Paleta de colores (brand)

Definida en `app/globals.css` → `@theme inline`. Uso directo en Tailwind: `bg-brand-navy`, `text-brand-gold`, etc.

| Token | Hex | Uso |
|---|---|---|
| `brand-navy` | `#1E3A5F` | Color principal, headers oscuros |
| `brand-navy-dark` | `#0F2540` | Hero bg, Process section, Contact bg |
| `brand-navy-light` | `#2A4D7A` | Hover states |
| `brand-gold` | `#D4A24C` | CTAs, precios, highlights, tabs activos |
| `brand-gold-dark` | `#B8882E` | Hover botones gold |
| `brand-coral` | `#E8896A` | Tag "picante", errores suaves |
| `brand-cream` | `#FAF7F2` | Background claro principal |
| `brand-warm-gray` | `#6B6259` | Texto secundario |

Dark mode: `--background: #0F1A2A`, `--primary: #4A7BA8`, `--accent: #E5B563`

---

## Tipografía

- Títulos: **Playfair Display** → clase `font-heading`
- Cuerpo/UI: **Plus Jakarta Sans** → clase `font-sans` (default)

---

## Constantes del restaurante

- **WhatsApp:** `573001234567`
- **Email:** `reservas@laceviceriadelmar.com`
- **Dirección:** Calle del Cuartel #36-77, Centro Histórico, Cartagena de Indias
- **Horarios:** Martes–Domingo 12:00 PM – 11:00 PM · Cerrado lunes

---

## Estructura de archivos (estado actual)

```
cevicheria-del-mar/
├── proxy.ts                        ← i18n routing (Next.js 16)
├── navigation.ts                   ← createNavigation para language toggle
├── next.config.ts                  ← withNextIntl plugin + turbopack root
├── i18n/routing.ts + request.ts
├── messages/es.json + en.json      ← todas las cadenas bilingües
│
├── app/
│   ├── globals.css                 ← paleta brand + Tailwind v4
│   ├── layout.tsx                  ← root layout (fuentes)
│   └── [locale]/
│       ├── layout.tsx              ← NextIntlClientProvider + ThemeProvider + Navbar + Toaster
│       ├── page.tsx                ← home: Hero → Historia → Menú → Reservas → Footer
│       └── menu/page.tsx           ← menú completo con todas las categorías
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx                ✅ Full-screen, bilingüe, CTAs, badge TripAdvisor
│   │   ├── historia.tsx            ✅ 2 columnas, stats animados, imagen con fallback gradient
│   │   ├── menu-destacado.tsx      ✅ Tabs (4 categorías), cards con modal on click
│   │   ├── dish-modal.tsx          ✅ Bottom sheet mobile / centrado desktop, bilingüe
│   │   └── reservas.tsx            ✅ Layout 2 columnas, form sticky, info cards
│   │
│   ├── reservas/
│   │   ├── reservation-form.tsx    ✅ Stepper 3 pasos con AnimatePresence slide
│   │   ├── step-fecha.tsx          ✅ Calendar (bloquea lunes/pasado), slots, personas, zona
│   │   ├── step-datos.tsx          ✅ react-hook-form + zod v4, validación completa
│   │   └── step-confirmacion.tsx   ✅ Confetti, código LCM-XXXXXX, descarga HTML, WhatsApp
│   │
│   └── shared/
│       ├── navbar.tsx              ✅ Sticky, transparente→sólido, mobile menu, toggles
│       ├── footer.tsx              ✅ Columnas, social icons SVG, horarios, newsletter
│       ├── language-toggle.tsx     ✅ Usa createNavigation (next-intl v4)
│       ├── theme-toggle.tsx        ✅ Moon/Sun, estado mounted
│       ├── theme-provider.tsx      ✅ next-themes, defaultTheme="light"
│       ├── whatsapp-float.tsx      ✅ Botón flotante con pulse ring
│       └── newsletter-form.tsx     ✅ Guarda en localStorage
│
├── lib/
│   ├── menu-data.ts                ✅ 15 platos tipados, getByCategory(), formatPrice()
│   ├── availability.ts             ✅ Disponibilidad determinista, generateReservationCode(), buildWhatsAppShareUrl()
│   └── utils.ts                    ← cn() helper
│
├── types/
│   ├── menu.ts                     ✅ MenuItem, MenuCategory, MenuTag
│   └── reservation.ts              ✅ ReservationData, TIME_SLOTS, ReservationZone
│
└── public/images/
    ├── hero-bg.jpg                 ⚠️ PENDIENTE foto real (Unsplash: "ceviche seafood cartagena")
    ├── historia-chef.jpg           ⚠️ PENDIENTE foto real (Unsplash: "chef latin restaurant kitchen")
    └── menu/[id].jpg               ⚠️ PENDIENTE (15 fotos, IDs en lib/menu-data.ts)
```

---

## Secciones completadas vs pendientes

### ✅ Completadas (en `app/[locale]/page.tsx`)
1. **Hero** — full-screen, gradient overlay, pretitle, H1 serif, 2 CTAs, WhatsApp link, badge TripAdvisor, scroll indicator
2. **Historia** — 2 columnas imagen+texto, frame decorativo gold, badge "2013", 3 stats animados
3. **Menú destacado** — 4 tabs con `@base-ui/react Tabs`, cards con gradiente fallback, modal al click (bottom sheet mobile)
4. **Reservas** — 3 pasos: calendario + slots + zona · formulario validado · confirmación con confetti + descarga HTML
5. **Footer** — columnas, social SVG, newsletter localStorage, crédito

### ⏳ Sesión 4 — pendiente (próxima sesión)
- **Galería** — grid asimétrico/masonry de 8-10 fotos, lightbox al click, botón Instagram
- **Experiencia/Servicios especiales** — 3 cards: Eventos privados, Menú degustación, Maridaje
- **Testimonios** — carrusel de 5-6 reseñas ficticias (colombianos + extranjeros), estrellas, fuente (TripAdvisor/Google)

### ⏳ Sesión 5
- **Ubicación + Contacto** — 2 columnas: mapa Google Maps embed + info + formulario de contacto
- **Pulido general** — espaciados, hover states, transiciones, revisión mobile

### ⏳ Sesión 6
- **Página `/menu` completa** — ya existe estructura básica, ampliar con filtros y búsqueda
- **Página `/reservar` dedicada** — standalone con el formulario de 3 pasos

### ⏳ Sesión 7
- **SEO** — Schema.org (Restaurant + LocalBusiness), metadata por página, Open Graph
- **Sitemap.xml** + `robots.txt`
- **Deploy a Vercel** — configurar dominio, variables de entorno

---

## Decisiones de diseño tomadas

- **Modal de plato:** bottom sheet en mobile (`rounded-t-3xl`, anclado al bottom), centrado en desktop. `Escape` o click fuera cierra.
- **Reservas background:** gradiente cálido `#FAF7F2 → #F5EDD8` en la sección, no navy (contrasta con las secciones oscuras adyacentes).
- **Código de reserva:** formato `LCM-XXXXXX` (caracteres alfanuméricos sin O/0/I/1 para evitar confusión).
- **Descarga de reserva:** archivo `.html` auto-contenido con CSS inline, abre en navegador y se puede imprimir como PDF. Sin dependencias extra.
- **Google Calendar:** eliminado por solicitud del cliente — no lo usa el público objetivo.
- **Disponibilidad simulada:** hash determinista `(día × 17 + mes × 11 + índice × 7) % 10` — mismo día siempre muestra mismo resultado.

---

## Imágenes necesarias (todas en `/public/images/`)

| Archivo | Buscar en Unsplash |
|---|---|
| `hero-bg.jpg` | `"ceviche seafood cartagena colombia"` · mín 1920×1080 |
| `historia-chef.jpg` | `"chef latin restaurant kitchen"` · mín 800×1000 |
| `galeria-1.jpg` a `galeria-8.jpg` | `"cartagena colombia restaurant"`, `"seafood platter elegant"`, `"restaurant terrace tropical"` |
| `menu/ceviche-clasico.jpg` | `"ceviche peru classic"` |
| `menu/tiradito-nikkei.jpg` | `"tiradito nikkei peru"` |
| `menu/causa-cangrejo.jpg` | `"causa peruana"` |
| `menu/carpaccio-pulpo.jpg` | `"octopus carpaccio elegant"` |
| `menu/arroz-coco-camarones.jpg` | `"coconut rice shrimp"` |
| `menu/pescado-cartagenera.jpg` | `"fried fish caribbean"` |
| `menu/cazuela-mariscos.jpg` | `"seafood casserole"` |
| `menu/risotto-langostinos.jpg` | `"prawn risotto"` |
| `menu/cocada-mango.jpg` | `"coconut dessert mango"` |
| `menu/ceviche-dulce.jpg` | `"tropical fruit dessert"` |
| `menu/helado-coco.jpg` | `"coconut ice cream artisan"` |
| `menu/mojito-maracuya.jpg` | `"passion fruit mojito cocktail"` |
| `menu/caipirinha-tropical.jpg` | `"caipirinha tropical"` |
| `menu/margarita-tamarindo.jpg` | `"tamarind margarita cocktail"` |

---

## Comandos

```bash
npm run dev    # http://localhost:3001
npm run build  # build de producción (debe ser limpio antes de cada sesión)
npx tsc --noEmit  # verificar tipos antes de commit
git add -A && git commit -m "..." && git push
```
