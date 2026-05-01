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
| lucide-react | v1.x | Sin iconos de marca (Github, Linkedin, Instagram) — usar SVG inline |
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
messages/es.json       ← todas las cadenas bilingües en español
messages/en.json       ← todas las cadenas bilingües en inglés
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
| `brand-navy-dark` | `#0F2540` | Hero bg, Experiencia bg, Contact bg |
| `brand-navy-light` | `#2A4D7A` | Hover states |
| `brand-gold` | `#D4A24C` | CTAs, precios, highlights, tabs activos |
| `brand-gold-dark` | `#B8882E` | Hover botones gold |
| `brand-coral` | `#E8896A` | Tag "picante", errores suaves |
| `brand-cream` | `#FAF7F2` | Background claro principal (Testimonios, Reservas) |
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
│   ├── layout.tsx                  ← root layout (fuentes + metadataBase)
│   ├── sitemap.ts                  ✅ Genera /sitemap.xml con 4 rutas (es/en × home/menu)
│   ├── robots.ts                   ✅ Genera /robots.txt apuntando al sitemap
│   └── [locale]/
│       ├── layout.tsx              ← generateMetadata bilingüe: title template, OG, Twitter Card, hreflang, robots
│       ├── page.tsx                ← home + JSON-LD Schema.org Restaurant/LocalBusiness
│       └── menu/
│           ├── layout.tsx          ✅ generateMetadata específico del menú (es/en)
│           └── page.tsx            ← menú completo con todas las categorías
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx                ✅ Full-screen, bilingüe, CTAs, badge TripAdvisor
│   │   ├── historia.tsx            ✅ 2 columnas, stats animados, imagen con fallback gradient — id="nosotros"
│   │   ├── menu-destacado.tsx      ✅ Tabs (4 categorías), cards con modal on click — id="menu"
│   │   ├── dish-modal.tsx          ✅ Bottom sheet mobile / centrado desktop, bilingüe
│   │   ├── galeria.tsx             ✅ Masonry CSS columns (3/2/1), lightbox completo, gradientes fallback, CTA Instagram SVG
│   │   ├── experiencia.tsx         ✅ 3 cards sobre brand-navy-dark: Eventos, Degustación, Maridaje
│   │   ├── testimonios.tsx         ✅ Carrusel 6 reseñas, auto-play 5s, AnimatePresence slide, dots + flechas
│   │   ├── reservas.tsx            ✅ Layout 2 columnas, form sticky, info cards — id="reservar"
│   │   └── ubicacion.tsx           ✅ 2 columnas: info cards + Google Maps embed | formulario validado + toast — id="contacto"
│   │
│   ├── reservas/
│   │   ├── reservation-form.tsx    ✅ Stepper 3 pasos con AnimatePresence slide
│   │   ├── step-fecha.tsx          ✅ Calendar (bloquea lunes/pasado), slots, personas, zona
│   │   ├── step-datos.tsx          ✅ react-hook-form + zod v4, validación completa
│   │   └── step-confirmacion.tsx   ✅ Confetti, código LCM-XXXXXX, abre PDF en nueva pestaña, WhatsApp
│   │
│   └── shared/
│       ├── navbar.tsx              ✅ Sticky, transparente→sólido, mobile menu, toggles; navega a home si sección no existe en página actual
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
    ├── hero-bg.jpg                 ⚠️ PENDIENTE (Unsplash: "ceviche seafood cartagena colombia" · mín 1920×1080)
    ├── chef.jpg                    ⚠️ PENDIENTE (Unsplash: "chef latin restaurant kitchen" · mín 800×1000)
    ├── galeria-1.jpg … galeria-8.jpg  ⚠️ PENDIENTE — gradientes activos como fallback
    └── menu/[id].jpg               ⚠️ PENDIENTE (15 fotos, IDs en lib/menu-data.ts)
```

---

## Secciones completadas vs pendientes

### ✅ Completadas (en `app/[locale]/page.tsx`)
1. **Hero** — full-screen, gradient overlay, pretitle, H1 serif, 2 CTAs, WhatsApp link, badge TripAdvisor, scroll indicator
2. **Historia** — 2 columnas imagen+texto, frame decorativo gold, badge "2013", 3 stats animados · `id="nosotros"`
3. **Menú destacado** — 4 tabs con `@base-ui/react Tabs`, cards con imagen/fallback gradient, modal bottom-sheet mobile · `id="menu"`
4. **Galería** — masonry CSS `columns`, 8 fotos con gradientes fallback + `<img onError>`, lightbox con prev/next/dots/keyboard, CTA Instagram · `id="galeria"`
5. **Experiencia** — 3 cards sobre `brand-navy-dark` (Eventos privados, Menú degustación, Maridaje), ícono animado, línea decorativa hover
6. **Testimonios** — carrusel 6 reseñas bilingüe, auto-play 5 s (pausa en hover), transición slide direccional, dots + flechas
7. **Reservas** — 3 pasos: calendario + slots + zona · formulario validado · confirmación con confetti + PDF (nueva pestaña + auto-print) · `id="reservar"`
8. **Ubicación + Contacto** — 2 columnas: 4 info cards (dirección, horarios, teléfono, email) + Google Maps embed | formulario react-hook-form + zod + sonner toast · `id="contacto"`
9. **Footer** — columnas, social SVG, newsletter localStorage, crédito
10. **Pulido sesión 5** — lightbox galería: `pointer-events-none` en contenedor para que clic en overlay cierre; testimonios: dirección de slide corregida en `prev()`/dot clicks

### ✅ Sesión 7 — SEO completo
- **Metadata bilingüe** — `generateMetadata` en `[locale]/layout.tsx`: title template, description, keywords, hreflang (`alternates.languages`), canonical, `robots: index/follow`
- **Open Graph + Twitter Card** — imagen `hero-bg.jpg`, locale `es_CO`/`en_US`, url por locale
- **Schema.org JSON-LD** — `Restaurant` + `LocalBusiness` en home page: nombre, dirección, geo, horarios, priceRange, aggregateRating, menu url
- **`/sitemap.xml`** — 4 rutas: `/`, `/en`, `/menu`, `/en/menu` con prioridades y changeFrequency
- **`/robots.txt`** — permite todo, apunta al sitemap
- **`metadataBase`** — configurado en root layout, lee `NEXT_PUBLIC_SITE_URL` (env var de Vercel)
- **Menu layout** — `app/[locale]/menu/layout.tsx` con metadata específico de la página

### ⏳ Pendiente
- **Página `/menu` completa** — ampliar con filtros por categoría/tag y barra de búsqueda (sesión 6 aplazada)
- **Página `/reservar` dedicada** — standalone con el formulario de 3 pasos
- **Deploy a Vercel** — ver sección "Deploy" más abajo

---

## Decisiones de diseño tomadas

- **Modal de plato:** bottom sheet en mobile (`rounded-t-3xl`, anclado al bottom), centrado en desktop. `Escape` o click fuera cierra.
- **Reservas background:** gradiente cálido `#FAF7F2 → #F5EDD8`, no navy (contrasta con secciones oscuras adyacentes).
- **Código de reserva:** formato `LCM-XXXXXX` (alfanumérico sin O/0/I/1 para evitar confusión).
- **Descarga de reserva:** abre nueva pestaña con HTML auto-contenido + `window.print()` automático → usuario guarda como PDF. Sin dependencias extra.
- **Google Calendar:** eliminado — no lo usa el público objetivo.
- **Disponibilidad simulada:** hash determinista `(día × 17 + mes × 11 + índice × 7) % 10` — mismo día siempre muestra mismo resultado.
- **Galería fallback:** `<img onError>` oculta la imagen si no existe el archivo; el gradiente de fondo siempre es visible. Cuando se añadan las fotos reales, aparecen automáticamente.
- **Navbar en páginas internas:** `handleNavClick` usa `window.location.href = href` cuando el elemento no existe en la página actual (ej. `/menu` redirige a `/#galeria`). El logo también navega a home si no está en ella.
- **Alternancia de fondos (ritmo visual):** Hero dark → Historia light → Menú cream → Galería white → Experiencia dark → Testimonios cream → Reservas warm → Footer dark.

---

## Imágenes pendientes (todas en `/public/images/`)

| Archivo | Buscar en Unsplash |
|---|---|
| `hero-bg.jpg` | `"ceviche seafood cartagena colombia"` · mín 1920×1080 |
| `chef.jpg` | `"chef latin restaurant kitchen"` · mín 800×1000 |
| `galeria-1.jpg` | `"ceviche plating artistic"` |
| `galeria-2.jpg` | `"restaurant terrace cartagena"` |
| `galeria-3.jpg` | `"tiradito seafood elegant"` |
| `galeria-4.jpg` | `"colonial restaurant interior"` |
| `galeria-5.jpg` | `"seafood casserole"` |
| `galeria-6.jpg` | `"tropical cocktails bar"` |
| `galeria-7.jpg` | `"chef open kitchen"` |
| `galeria-8.jpg` | `"coconut mango dessert"` |
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

## Deploy a Vercel

### Variable de entorno obligatoria
| Variable | Valor en producción | Para qué |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://tudominio.com` | metadataBase, sitemap, Schema.org URLs |

### Pasos
1. `npm run build` — verificar build limpio localmente
2. Conectar repo en **vercel.com → New Project → Import Git Repository**
3. Vercel auto-detecta Next.js — no se necesita `vercel.json`
4. En **Settings → Environment Variables** agregar `NEXT_PUBLIC_SITE_URL` con el dominio real
5. **Redeploy** después de agregar la variable para que el sitemap y Schema.org usen la URL correcta
6. En **Settings → Domains** conectar el dominio personalizado si se tiene

### Checklist post-deploy
- [ ] Verificar `https://tudominio.com/sitemap.xml` — debe listar 4 URLs
- [ ] Verificar `https://tudominio.com/robots.txt` — debe apuntar al sitemap
- [ ] Validar Schema.org en [schema.org/validator](https://validator.schema.org)
- [ ] Validar Open Graph en [opengraph.xyz](https://www.opengraph.xyz) o similar
- [ ] Enviar sitemap a Google Search Console

---

## Comandos

```bash
npm run dev       # http://localhost:3001
npm run build     # build de producción (verificar antes de cada deploy)
npx tsc --noEmit  # verificar tipos antes de commit
git add -A && git commit -m "..." && git push
```
