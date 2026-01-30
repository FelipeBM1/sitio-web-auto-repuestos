"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface HeaderProps {
  currentSection: string
  onNavigate: (section: "inicio" | "productos" | "quienes-somos" | "contacto") => void
}

export function Header({ currentSection, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHome = currentSection === "inicio"

  const navItems = [
    { id: "productos", label: "Nuestros Productos" },
    { id: "quienes-somos", label: "Quiénes Somos" },
    { id: "contacto", label: "Contáctanos" },
  ] as const

  return (
    <header
      className={
        isHome
          ? "fixed top-0 left-0 z-50 w-full bg-transparent font-sans"
          : "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-sans"
      }
    >
      <div className="container flex h-28 items-center justify-between px-4 md:px-8">
        <button
          onClick={() => onNavigate("inicio")}
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <Image
            src="/images/logo-principal.PNG"
            alt="Auto Repuestos Carlos"
            width={700}
            height={220}
            priority
            className="h-[96px] md:h-[112px] w-auto object-contain"
          />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onNavigate(item.id)}
              className={[
                "font-sans font-semibold text-sm md:text-base tracking-tight",
                isHome
                  ? "text-white hover:text-white hover:bg-white/10"
                  : currentSection === item.id
                    ? "text-primary"
                    : "text-foreground",
              ].join(" ")}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <button
          className={`md:hidden ${isHome ? "text-white" : "text-foreground"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div
            className={`absolute left-0 right-0 top-28 border-b shadow-lg md:hidden ${
              isHome ? "bg-black/70 backdrop-blur" : "bg-background"
            }`}
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={[
                    "justify-start font-sans font-semibold text-base tracking-tight",
                    isHome ? "text-white hover:bg-white/10" : "text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
