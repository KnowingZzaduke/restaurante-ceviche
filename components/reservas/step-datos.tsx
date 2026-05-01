"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import type { ReservationOcasion } from "@/types/reservation"

const schema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  telefono: z
    .string()
    .min(7, "Teléfono inválido")
    .regex(/^[+\d\s()-]{7,20}$/, "Formato inválido"),
  email: z.string().email("Email inválido"),
  ocasion: z.string().optional(),
  comentarios: z.string().max(300, "Máximo 300 caracteres").optional(),
  politicas: z
    .boolean()
    .refine((v) => v === true, { message: "Debes aceptar las políticas" }),
})

type FormData = z.infer<typeof schema>

interface StepDatosProps {
  nombre: string
  telefono: string
  email: string
  ocasion: string
  comentarios: string
  sending?: boolean
  onBack: () => void
  onSubmit: (data: {
    nombre: string
    telefono: string
    email: string
    ocasion: ReservationOcasion
    comentarios: string
  }) => void
}

const inputClass = cn(
  "w-full h-11 px-3.5 rounded-xl border border-border bg-background text-foreground text-sm",
  "placeholder:text-muted-foreground/60",
  "focus:outline-none focus:border-brand-navy dark:focus:border-brand-gold focus:ring-2 focus:ring-brand-navy/20 dark:focus:ring-brand-gold/20",
  "transition-colors"
)

const errorClass = "text-xs text-brand-coral mt-1"

export function StepDatos({
  nombre,
  telefono,
  email,
  ocasion,
  comentarios,
  sending = false,
  onBack,
  onSubmit,
}: StepDatosProps) {
  const t = useTranslations("reservas.datos")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nombre, telefono, email, ocasion, comentarios, politicas: false },
  })

  const onValid = (data: FormData) => {
    onSubmit({
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      ocasion: (data.ocasion ?? "") as ReservationOcasion,
      comentarios: data.comentarios ?? "",
    })
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("nombre")} *
        </label>
        <input
          {...register("nombre")}
          placeholder="Ej. María García"
          className={cn(inputClass, errors.nombre && "border-brand-coral focus:border-brand-coral")}
        />
        {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
      </div>

      {/* Teléfono + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("telefono")} *
          </label>
          <input
            {...register("telefono")}
            type="tel"
            placeholder="+57 300 123 4567"
            className={cn(inputClass, errors.telefono && "border-brand-coral")}
          />
          {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("email")} *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="tu@email.com"
            className={cn(inputClass, errors.email && "border-brand-coral")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Ocasión */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("ocasion")}
        </label>
        <select
          {...register("ocasion")}
          className={cn(inputClass, "cursor-pointer")}
        >
          <option value="">{t("ocNinguna")}</option>
          <option value="cumpleanos">{t("ocCumple")} 🎂</option>
          <option value="aniversario">{t("ocAniv")} 💍</option>
          <option value="romantica">{t("ocRom")} 🌹</option>
          <option value="negocios">{t("ocNeg")} 💼</option>
          <option value="otra">{t("ocOtra")} ✨</option>
        </select>
      </div>

      {/* Comentarios */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("comentarios")}
        </label>
        <textarea
          {...register("comentarios")}
          rows={3}
          placeholder="Alergias, peticiones especiales, decoración..."
          className={cn(
            inputClass,
            "h-auto resize-none py-3 leading-relaxed"
          )}
        />
        {errors.comentarios && <p className={errorClass}>{errors.comentarios.message}</p>}
      </div>

      {/* Políticas */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
        <input
          {...register("politicas")}
          type="checkbox"
          id="politicas"
          className="mt-0.5 w-4 h-4 accent-brand-gold cursor-pointer shrink-0"
        />
        <label htmlFor="politicas" className="text-sm text-muted-foreground cursor-pointer leading-snug">
          {t("politicas")}.{" "}
          <a href="#" className="text-brand-navy dark:text-brand-gold underline">
            {t("leerPoliticas")}
          </a>
        </label>
      </div>
      {errors.politicas && <p className={errorClass}>{errors.politicas.message}</p>}

      {/* Botones */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-12 rounded-xl border border-border text-foreground/70 hover:bg-muted font-medium text-sm transition-colors"
        >
          {t("btnVolver")}
        </button>
        <button
          type="submit"
          disabled={sending}
          className="flex-1 h-12 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-semibold text-sm transition-all active:scale-[0.98] shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {sending ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4a8 8 0 010-16z" />
              </svg>
              {t("btnEnviando")}
            </span>
          ) : t("btnSig")}
        </button>
      </div>
    </form>
  )
}
