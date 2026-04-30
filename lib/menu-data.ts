import type { MenuItem } from "@/types/menu"

export const MENU_ITEMS: MenuItem[] = [
  // ── Entradas ──────────────────────────────────────
  {
    id: "ceviche-clasico",
    name: "Ceviche Clásico del Mar",
    nameEn: "Classic Seafood Ceviche",
    description:
      "Pescado blanco fresco, leche de tigre tradicional, camote glaseado, choclo cusqueño",
    descriptionEn:
      "Fresh white fish, traditional leche de tigre, glazed sweet potato, Cusco corn",
    price: 42000,
    category: "entradas",
    tag: "especialidad",
    gradient: "linear-gradient(135deg, #1E6B5E 0%, #2D9B85 100%)",
  },
  {
    id: "tiradito-nikkei",
    name: "Tiradito Nikkei",
    nameEn: "Nikkei Tiradito",
    description:
      "Pesca del día en finas láminas, leche de tigre amarilla, ají amarillo, sésamo tostado",
    descriptionEn:
      "Catch of the day in thin slices, yellow leche de tigre, ají amarillo, toasted sesame",
    price: 48000,
    category: "entradas",
    tag: "picante",
    gradient: "linear-gradient(135deg, #8B4513 0%, #D4A24C 100%)",
  },
  {
    id: "causa-cangrejo",
    name: "Causa Tropical de Cangrejo",
    nameEn: "Tropical Crab Causa",
    description:
      "Causa amarilla cremosa, cangrejo azul del Caribe, palta y mango",
    descriptionEn:
      "Creamy yellow causa, Caribbean blue crab, avocado and mango",
    price: 38000,
    category: "entradas",
    tag: "vegetariano",
    gradient: "linear-gradient(135deg, #F5A623 0%, #F7D794 100%)",
  },
  {
    id: "carpaccio-pulpo",
    name: "Carpaccio de Pulpo a la Parrilla",
    nameEn: "Grilled Octopus Carpaccio",
    description:
      "Pulpo grillado en finas láminas, aceite de oliva con limón, alcaparras, rúcula",
    descriptionEn:
      "Grilled octopus in thin slices, lemon olive oil, capers, arugula",
    price: 52000,
    category: "entradas",
    gradient: "linear-gradient(135deg, #4A2040 0%, #8B4B6E 100%)",
  },

  // ── Principales ───────────────────────────────────
  {
    id: "arroz-coco-camarones",
    name: "Arroz con Coco y Camarones Tigre",
    nameEn: "Coconut Rice with Tiger Shrimp",
    description:
      "Arroz cocido en leche de coco con camarones tigre flameados al ron añejo",
    descriptionEn:
      "Rice cooked in coconut milk with tiger shrimp flambéed in aged rum",
    price: 68000,
    category: "principales",
    gradient: "linear-gradient(135deg, #2C5F2E 0%, #97BC62 100%)",
  },
  {
    id: "pescado-cartagenera",
    name: "Pescado a la Cartagenera",
    nameEn: "Cartagena-Style Fish",
    description:
      "Pesca del día con suero costeño, plátano maduro y ensalada tropical",
    descriptionEn:
      "Catch of the day with coastal cream, ripe plantain and tropical salad",
    price: 75000,
    category: "principales",
    tag: "especialidad",
    gradient: "linear-gradient(135deg, #1E3A5F 0%, #4A7BA8 100%)",
  },
  {
    id: "cazuela-mariscos",
    name: "Cazuela de Mariscos del Caribe",
    nameEn: "Caribbean Seafood Casserole",
    description:
      "Pulpo, camarones, calamares, mejillones en salsa de tomate y vino blanco",
    descriptionEn:
      "Octopus, shrimp, squid, mussels in tomato sauce and white wine",
    price: 89000,
    category: "principales",
    gradient: "linear-gradient(135deg, #7C1D1D 0%, #C0392B 100%)",
  },
  {
    id: "risotto-langostinos",
    name: "Risotto de Langostinos al Limón",
    nameEn: "Lemon Prawn Risotto",
    description:
      "Arroz arborio cremoso, langostinos del Caribe, limón confitado y parmesano",
    descriptionEn:
      "Creamy arborio rice, Caribbean prawns, candied lemon and parmesan",
    price: 82000,
    category: "principales",
    tag: "nuevo",
    gradient: "linear-gradient(135deg, #5C4033 0%, #A0856C 100%)",
  },

  // ── Postres ───────────────────────────────────────
  {
    id: "cocada-mango",
    name: "Cocada Cremosa con Mango Maduro",
    nameEn: "Creamy Cocada with Ripe Mango",
    description:
      "Cocada tradicional cartagenera con coulis de mango y helado de vainilla",
    descriptionEn:
      "Traditional Cartagena cocada with mango coulis and vanilla ice cream",
    price: 24000,
    category: "postres",
    tag: "especialidad",
    gradient: "linear-gradient(135deg, #D4A24C 0%, #F7D794 100%)",
  },
  {
    id: "ceviche-dulce",
    name: "Ceviche Dulce de Frutas Tropicales",
    nameEn: "Sweet Tropical Fruit Ceviche",
    description:
      "Mango, papaya, maracuyá y piña en almíbar de jengibre con menta fresca",
    descriptionEn:
      "Mango, papaya, passion fruit and pineapple in ginger syrup with fresh mint",
    price: 22000,
    category: "postres",
    gradient: "linear-gradient(135deg, #E8896A 0%, #F5B89A 100%)",
  },
  {
    id: "helado-coco",
    name: "Helado Artesanal de Coco",
    nameEn: "Artisan Coconut Ice Cream",
    description:
      "Helado de coco hecho en casa con virutas de chocolate y crocante de almendras",
    descriptionEn:
      "Homemade coconut ice cream with chocolate shavings and almond brittle",
    price: 18000,
    category: "postres",
    gradient: "linear-gradient(135deg, #3D2B1F 0%, #8B6355 100%)",
  },

  // ── Cócteles ──────────────────────────────────────
  {
    id: "mojito-maracuya",
    name: "Mojito de Maracuyá",
    nameEn: "Passion Fruit Mojito",
    description: "Ron blanco, maracuyá fresca, hierbabuena, lima",
    descriptionEn: "White rum, fresh passion fruit, spearmint, lime",
    price: 28000,
    category: "cocteles",
    tag: "especialidad",
    gradient: "linear-gradient(135deg, #1A5E3A 0%, #2ECC71 100%)",
  },
  {
    id: "caipirinha-tropical",
    name: "Caipiriña Tropical",
    nameEn: "Tropical Caipirinha",
    description: "Cachaça, mango, lima, azúcar morena",
    descriptionEn: "Cachaça, mango, lime, brown sugar",
    price: 26000,
    category: "cocteles",
    gradient: "linear-gradient(135deg, #F39C12 0%, #F7DC6F 100%)",
  },
  {
    id: "margarita-tamarindo",
    name: "Margarita de Tamarindo",
    nameEn: "Tamarind Margarita",
    description: "Tequila reposado, tamarindo, sal de chile en el borde",
    descriptionEn: "Reposado tequila, tamarind, chili salt rim",
    price: 30000,
    category: "cocteles",
    gradient: "linear-gradient(135deg, #8E44AD 0%, #C39BD3 100%)",
  },
]

export function getByCategory(category: string) {
  return MENU_ITEMS.filter((item) => item.category === category)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price)
}
