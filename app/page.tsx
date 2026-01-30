"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { FloatingButtons } from "@/components/floating-buttons"
import { ChatbotModal } from "@/components/chatbot-modal"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<"inicio" | "productos" | "quienes-somos" | "contacto">("inicio")
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header currentSection={currentSection} onNavigate={setCurrentSection} />

      <main>
        {currentSection === "inicio" && <HeroSection onNavigate={setCurrentSection} />}
        {currentSection === "productos" && <ProductsSection />}
        {currentSection === "quienes-somos" && <AboutSection />}
        {currentSection === "contacto" && <ContactSection />}
      </main>

      <FloatingButtons onChatClick={() => setIsChatOpen(true)} />
      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
