export type MenuTag = "especialidad" | "nuevo" | "vegetariano" | "picante"
export type MenuCategory = "entradas" | "principales" | "postres" | "cocteles"

export interface MenuItem {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  category: MenuCategory
  tag?: MenuTag
  /** CSS gradient string for placeholder image */
  gradient: string
}
