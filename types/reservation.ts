export type ReservationZone = "sala" | "terraza" | "sin-preferencia"
export type ReservationOcasion =
  | ""
  | "cumpleanos"
  | "aniversario"
  | "romantica"
  | "negocios"
  | "otra"

export interface ReservationData {
  // Step 1
  date: Date
  time: string
  guests: number
  zone: ReservationZone
  // Step 2
  nombre: string
  telefono: string
  email: string
  ocasion: ReservationOcasion
  comentarios: string
  // Generated
  code: string
  createdAt: string
}

export const TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const
