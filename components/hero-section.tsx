"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onNavigate: (section: "inicio" | "productos" | "quienes-somos" | "contacto") => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden font-sans">
      {/* Fondo */}
      <Image
        src="/images/image.png"
        alt="Fondo Auto Repuestos Carlos"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Contenido */}
      <div className="relative container px-4 md:px-8 pt-40 md:pt-48 pb-14">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* IZQUIERDA: NO TOCAR (tal cual) */}
          <div className="max-w-2xl">
            <h1 className="text-white font-extrabold tracking-tight leading-[1.02] text-5xl sm:text-6xl lg:text-7xl">
              REPUESTOS Y
              <br />
              ACCESORIOS
              <br />
              PARA VEHÍCULOS
            </h1>

            <div className="mt-7 max-w-xl">
              <p className="text-white/92 font-semibold text-base sm:text-lg lg:text-xl leading-relaxed">
                Más de 20 años suministrando repuestos automotrices de calidad, con servicio oportuno y precios
                competitivos.
              </p>

              <Button
                onClick={() => onNavigate("quienes-somos")}
                className="mt-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 h-auto text-base lg:text-lg font-semibold"
              >
                Saber más de nosotros <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* DERECHA: mejor organizado + texto mejorado */}
          <div className="w-full md:max-w-xl md:justify-self-end relative md:min-h-[520px]">
            {/* En móvil queda normal; en md+ lo ubicamos abajo */}
            <div className="mt-10 md:mt-0 md:absolute md:right-0 md:bottom-10 text-center">
              {/* Texto mejorado */}
              <p className="text-white font-semibold text-lg sm:text-xl lg:text-2xl leading-snug max-w-lg mx-auto">
                Ofrecemos una amplia gama de repuestos para todo tipo de vehículos
              </p>

              <p className="mt-2 text-white/85 font-semibold text-sm sm:text-base lg:text-lg max-w-lg mx-auto leading-relaxed">
                Encuentra frenos, filtros, suspensión, lubricantes y accesorios con asesoría personalizada y
                entrega rápida.
              </p>

              <Button
                onClick={() => onNavigate("productos")}
                className="mt-5 w-full sm:w-[360px] lg:w-[420px] rounded-full bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 h-auto text-base lg:text-lg font-semibold"
              >
                Ver Productos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
