"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface ProductCatalogProps {
  category: string
  onBack: () => void
}

type CatalogItem = { id: string; name: string; image: string }

const PLACEHOLDER = "/images/image.png"

const categoryProducts: Record<string, CatalogItem[]> = {
  catalogo: [
    { id: "accesorios", name: "Accesorios", image: "/images/accesorios1.jpg" },
    { id: "baterias", name: "Baterías", image: "/images/Baterias-1.jpeg" },
    { id: "cables", name: "Cables", image: "/images/cables2.webp" },
    { id: "carroceria", name: "Carrocería", image: "/images/carroceria.webp"  },
    { id: "correas", name: "Correas", image: "/images/correas1.jpeg" },
    { id: "filtros", name: "Filtros", image: "/images/filtroaceite.webp" },
    { id: "herramientas", name: "Herramientas", image: "/images/herramientas-1.webp" },
    { id: "juntas", name: "Juntas", image: "/images/junta.jpg" },
    { id: "lubricantes-quimicos", name: "Lubricantes y químicos", image: "/images/Lubricantes-1.jpeg" },
    { id: "mangueras", name: "Mangueras", image: "/images/maguera1.jpg" },
    { id: "partes-motor", name: "Partes del motor", image: "/images/motor1.jpeg" },
    { id: "radiadores", name: "Radiadores", image: "/images/radiadore.png" },
    { id: "rodamientos", name: "Rodamientos", image: "/images/rodamientos2.jpg"  },
    { id: "sistema-freno", name: "Partes del sistema de freno", image: "/images/frenos2.jpg" },
    { id: "sistema-electrico", name: "Partes del sistema eléctrico", image: "/images/sistemaelectrico1.PNG" },
    { id: "suspensiones", name: "Partes de suspensiones", image: "/images/suspension.jpg" },
    { id: "transmisiones", name: "Partes de transmisiones", image: "/images/transmision.jpg" },
  ],
}

export function ProductCatalog({ category, onBack }: ProductCatalogProps) {
  // Mostramos siempre el listado de las 17 categorías
  const products = categoryProducts["catalogo"]

  const phone = "18092401530"
  const categoryTitle = "Catálogo"

  const whatsappLink = (itemName: string) => {
    const text = `Hola, estoy interesado en: ${itemName}. ¿Me puedes ayudar con disponibilidad y precios?`
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Volver a Categorías
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{categoryTitle}</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={product.image || PLACEHOLDER}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-4 text-balance">{product.name}</h3>

                {/* Botón de WhatsApp sigue sindo el mismo */}
                <a href={whatsappLink(product.name)} target="_blank" rel="noreferrer">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Pedir por WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
