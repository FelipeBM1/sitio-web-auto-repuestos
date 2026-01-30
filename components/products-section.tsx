"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCatalog } from "./product-catalog"

const productCategories = [
  {
    id: "accesorios",
    name: "Accesorios",
    image: "/images/Accesorios.jpeg",
  },
  {
    id: "acabado",
    name: "Acabado y brillo",
    image: "/images/Acabado y brillo.jpeg",
  },
  {
    id: "aditivos",
    name: "Aditivos y tratamientos",
    image: "/images/Aditivos y tratamientos.jpeg",
  },
  {
    id: "coolants",
    name: "Coolants",
    image: "/images/Coolants.jpeg",
  },
  {
    id: "lubricantes",
    name: "Lubricantes",
    image: "/images/Lubricantes.jpeg",
  },
  {
    id: "herramientas",
    name: "Herramientas",
    image: "/images/herramientas.webp",
  },
  {
    id: "baterias",
    name: "Baterías",
    image: "/images/Baterias.jpeg",
  },
  {
    id: "frenos",
    name: "Frenos",
    image: "/images/Frenos.jpeg",
  },
]

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (selectedCategory) {
    return <ProductCatalog category={selectedCategory} onBack={() => setSelectedCategory(null)} />
  }

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">NUESTROS PRODUCTOS</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                  <Button
                    onClick={() => setSelectedCategory(category.id)}
                    variant="outline"
                    className="w-full text-secondary border-secondary hover:bg-secondary hover:text-white"
                  >
                    VER MÁS
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
