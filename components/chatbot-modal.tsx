"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Send, Bot, User, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
}

type ActionBtn = {
  label: string
  href: string
  variant?: "whatsapp" | "default"
}

type ChatMsg = {
  id: string
  role: "user" | "assistant"
  text: string
  actions?: ActionBtn[]
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/** ✅ WhatsApp oficial */
const WA_NUMBER = "18092401530" // +1 809 240 1530
const WA_BASE = `https://wa.me/${WA_NUMBER}`

function waUrl(message: string) {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`
}

function normalizeText(s: string) {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  )
}

/** ✅ Catálogo real (17 categorías) */
const CATEGORIES = [
  { id: "accesorios", name: "Accesorios" },
  { id: "baterias", name: "Baterías" },
  { id: "cables", name: "Cables" },
  { id: "carroceria", name: "Carrocería" },
  { id: "correas", name: "Correas" },
  { id: "filtros", name: "Filtros" },
  { id: "herramientas", name: "Herramientas" },
  { id: "juntas", name: "Juntas" },
  { id: "lubricantes-quimicos", name: "Lubricantes y químicos" },
  { id: "mangueras", name: "Mangueras" },
  { id: "partes-motor", name: "Partes del motor" },
  { id: "radiadores", name: "Radiadores" },
  { id: "rodamientos", name: "Rodamientos" },
  { id: "sistema-freno", name: "Partes del sistema de freno" },
  { id: "sistema-electrico", name: "Partes del sistema eléctrico" },
  { id: "suspensiones", name: "Partes de suspensiones" },
  { id: "transmisiones", name: "Partes de transmisiones" },
] as const

type CategoryName = (typeof CATEGORIES)[number]["name"]

/** ✅ Keywords (para detectar categorías incluso con errores comunes / frases) */
const CATEGORY_KEYWORDS: Array<{ category: CategoryName; keys: string[] }> = [
  { category: "Accesorios", keys: ["accesorio", "accesorios", "tapete", "organizador", "porta celular", "cubre volante"] },
  { category: "Baterías", keys: ["bateria", "baterias", "pila", "acumulador"] },
  { category: "Cables", keys: ["cable", "cables", "cableado", "cables de bujia", "bujia", "encendido"] },
  { category: "Carrocería", keys: ["carroceria", "bumper", "parachoques", "guardabarros", "capo", "puerta", "retrovisor"] },
  { category: "Correas", keys: ["correa", "correas", "banda", "bandas", "serpentina", "alternador"] },
  { category: "Filtros", keys: ["filtro", "filtros", "aire", "aceite", "gasolina", "combustible"] },
  { category: "Herramientas", keys: ["herramienta", "herramientas", "llave", "juego de llaves", "gato", "compresor", "taladro"] },
  { category: "Juntas", keys: ["junta", "juntas", "empaque", "empaques", "sello", "sellos"] },
  { category: "Lubricantes y químicos", keys: ["lubricante", "lubricantes", "aceite", "aceites", "grasa", "aditivo", "quimico", "quimicos", "coolant", "refrigerante"] },
  { category: "Mangueras", keys: ["manguera", "mangueras", "manguito", "tubo", "tuberia"] },
  { category: "Partes del motor", keys: ["motor", "culata", "piston", "pistones", "biela", "anillos", "valvulas", "empaque de culata"] },
  { category: "Radiadores", keys: ["radiador", "radiadores", "enfriador", "cooler", "refrigeracion"] },
  { category: "Rodamientos", keys: ["rodamiento", "rodamientos", "balinera", "balineras", "ruleman", "rulemanes"] },
  { category: "Partes del sistema de freno", keys: ["freno", "frenos", "pastilla", "pastillas", "disco", "discos", "caliper", "liquido de frenos", "balatas"] },
  { category: "Partes del sistema eléctrico", keys: ["electrico", "electrica", "fusible", "fusibles", "relay", "rele", "alternador", "arranque", "luces", "bombillo"] },
  { category: "Partes de suspensiones", keys: ["suspension", "suspensiones", "amortiguador", "amortiguadores", "rotula", "rotulas", "buje", "bujes", "resorte"] },
  { category: "Partes de transmisiones", keys: ["transmision", "transmisiones", "caja", "embrague", "clutch", "cardan", "homocinetica"] },
]

function findCategoryFromText(raw: string): CategoryName | null {
  const t = normalizeText(raw)

  // 1) match directo por nombre
  for (const c of CATEGORIES) {
    const nameNorm = normalizeText(c.name)
    if (t === nameNorm || t.includes(` ${nameNorm} `) || t.startsWith(`${nameNorm} `) || t.endsWith(` ${nameNorm}`)) {
      return c.name
    }
  }

  // 2) keywords / frases
  for (const item of CATEGORY_KEYWORDS) {
    for (const k of item.keys) {
      const kn = normalizeText(k)
      if (t.includes(kn)) return item.category
    }
  }

  return null
}

/** ✅ Relevancia: si no contiene nada relacionado al negocio, lo tratamos como "fuera de tema" */
const BASE_RELEVANT_KEYWORDS = [
  "repuesto",
  "repuestos",
  "pieza",
  "piezas",
  "auto",
  "carro",
  "vehiculo",
  "vehiculos",
  "motor",
  "freno",
  "frenos",
  "bateria",
  "baterias",
  "aceite",
  "lubricante",
  "filtro",
  "correa",
  "radiador",
  "rodamiento",
  "suspension",
  "transmision",
  "electrico",
  "herramienta",
  "cable",
  "manguera",
  "junta",
  "carroceria",
  "catalogo",
  "productos",
  "producto",
  "cotizar",
  "precio",
  "disponibilidad",
  "envio",
  "envios",
  "horario",
  "direccion",
  "ubicacion",
]

function isRelevantToStore(t: string) {
  const s = normalizeText(t)
  // keyword base
  if (BASE_RELEVANT_KEYWORDS.some((k) => s.includes(k))) return true
  // nombres de categorías
  if (CATEGORIES.some((c) => s.includes(normalizeText(c.name)))) return true
  // keywords de categorías
  for (const item of CATEGORY_KEYWORDS) {
    for (const k of item.keys) {
      if (s.includes(normalizeText(k))) return true
    }
  }
  return false
}

function isGreeting(t: string) {
  const s = normalizeText(t)
  return ["hola", "buenas", "buenos dias", "buen dia", "buenas tardes", "buenas noches", "hey", "que tal"].some(
    (x) => s === x || s.startsWith(x + " ") || s.includes(" " + x + " ")
  )
}

function isThanks(t: string) {
  const s = normalizeText(t)
  return ["gracias", "muchas gracias", "mil gracias", "graciass", "thank you", "thx"].some((x) => s === x || s.includes(x))
}

function isHours(t: string) {
  const s = normalizeText(t)
  return ["horario", "horarios", "a que hora abren", "a que hora cierran", "hora de abrir", "hora de cerrar", "abren", "cierran"].some(
    (x) => s.includes(x)
  )
}

function isShipping(t: string) {
  const s = normalizeText(t)
  return ["envio", "envios", "envian", "hacen envios", "hacen envio", "delivery", "domicilio", "mensajeria"].some((x) =>
    s.includes(normalizeText(x))
  )
}

function isCatalog(t: string) {
  const s = normalizeText(t)
  return ["catalogo", "catálogo", "productos", "nuestros productos", "que venden", "que tienes", "que tienen"].some((x) =>
    s.includes(normalizeText(x))
  )
}

function isQuote(t: string) {
  const s = normalizeText(t)
  return ["cotizar", "cotizacion", "cotización", "quiero cotizar", "hacer una cotizacion", "hacer una cotización", "me cotizas"].some((x) =>
    s.includes(normalizeText(x))
  )
}

function isPriceOrAvailability(t: string) {
  const s = normalizeText(t)
  return ["precio", "precios", "cuanto vale", "cuanto cuesta", "disponibilidad", "hay disponible", "tienen disponible"].some((x) =>
    s.includes(normalizeText(x))
  )
}

function isLocationOrAddress(t: string) {
  const s = normalizeText(t)
  return ["direccion", "dirección", "ubicacion", "ubicación", "donde quedan", "donde estan", "como llegar", "mapa"].some((x) =>
    s.includes(normalizeText(x))
  )
}

function buildCatalogText() {
  const lines = CATEGORIES.map((c, i) => `${i + 1}. ${c.name}`).join("\n")
  return "Estos son nuestros productos:\n\n" + lines + "\n\nDime cuál categoría te interesa (por ejemplo: “Baterías”, “Filtros” o “Frenos”)."
}

function makeWhatsAppButton(message: string): ActionBtn {
  return { label: "WhatsApp", href: waUrl(message), variant: "whatsapp" }
}

/** ✅ Respuesta rule-based PRO */
function getBotReply(userText: string): { text: string; actions?: ActionBtn[] } {
  const original = userText.trim()

  // Gracias
  if (isThanks(original)) {
    return { text: "¡Con gusto! 🙌 Si necesitas algo más, estoy aquí para ayudarte." }
  }

  // Saludos
  if (isGreeting(original)) {
    return {
      text:
        "¡Hola! 👋 Soy Carlos, el Asistente Virtual de Auto Repuestos Carlos.\n\n" +
        'Puedes escribir: "catálogo", "envíos", "horario" o el nombre de un producto (ej: “Baterías”, “Filtros”, “Frenos”).',
    }
  }

  // Horarios (fijo)
  if (isHours(original)) {
    return {
      text: "Nuestro horario es:\n• Lunes a Sábado: 8:00 A.M. a 12:30 P.M. y 2:00 P.M. a 6:00 P.M.",
      actions: [makeWhatsAppButton("Hola, quiero confirmar el horario de atención.")],
    }
  }

  // Envíos
  if (isShipping(original)) {
    return {
      text: "Sí, claro que sí ✅ Para saber sobre nuestros envíos (costos y tiempos), comunícate con nosotros por WhatsApp.",
      actions: [makeWhatsAppButton("Hola, quiero información sobre envíos (costos y tiempos).")],
    }
  }

  // Ubicación / Dirección (mandar a WhatsApp)
  if (isLocationOrAddress(original)) {
    return {
      text: "Para ubicación y cómo llegar, por favor escríbenos por WhatsApp y un asesor te ayuda de inmediato.",
      actions: [makeWhatsAppButton("Hola, necesito la ubicación / dirección de Auto Repuestos Carlos.")],
    }
  }

  // Cotizar
  if (isQuote(original)) {
    return {
      text: "Perfecto ✅ Para cotizar rápido, escríbenos por WhatsApp y un asesor te atiende.",
      actions: [makeWhatsAppButton("Hola, quiero cotizar un repuesto. ¿Me puedes ayudar?")],
    }
  }

  // Precios / disponibilidad
  if (isPriceOrAvailability(original)) {
    return {
      text: "Para precios y disponibilidad, escríbenos por WhatsApp y te confirmamos al momento.",
      actions: [makeWhatsAppButton("Hola, quiero saber precio y disponibilidad de un repuesto.")],
    }
  }

  // Catálogo / productos
  if (isCatalog(original)) {
    return {
      text: buildCatalogText(),
      actions: [makeWhatsAppButton("Hola, quiero información del catálogo de productos.")],
    }
  }

  // Detectar categoría por texto / frases
  const cat = findCategoryFromText(original)
  if (cat) {
    return {
      text: `Perfecto ✅ ¿Qué necesitas de ${cat}? Para más información, escríbenos por WhatsApp.`,
      actions: [makeWhatsAppButton(`Hola, necesito información sobre ${cat}. ¿Me puedes ayudar con disponibilidad y precios?`)],
    }
  }

  // ✅ Fuera de tema: NO relacionado a la página
  if (!isRelevantToStore(original)) {
    return {
      text:
        "Lo siento, no te puedo ayudar con eso.\n\n" +
        'Te ayudo ✅\nPuedes escribir "catálogo" para ver nuestros productos, o dime qué estás buscando (ej: “batería”, “aceite”, “pastillas de freno”).\n\n' +
        "Si prefieres atención inmediata, contáctanos por WhatsApp",
      actions: [makeWhatsAppButton(`Hola, necesito ayuda con repuestos. Mi consulta es: ${original}`)],
    }
  }

  // Fallback (relevante pero no específico)
  return {
    text:
      "Te ayudo ✅\n" +
      'Puedes escribir "catálogo" para ver nuestros productos, o dime qué estás buscando (ej: “batería”, “aceite”, “pastillas de freno”).\n\n' +
      "Si prefieres atención inmediata, contáctanos por WhatsApp.",
    actions: [makeWhatsAppButton(`Hola, necesito ayuda con repuestos. Mi consulta es: ${original}`)],
  }
}

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement | null>(null)

  // ✅ Chat vacío al abrir
  useEffect(() => {
    if (isOpen) {
      setMessages([])
      setInput("")
      setLoading(false)
    }
  }, [isOpen])

  // Scroll abajo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  if (!isOpen) return null

  const simulateReply = async (text: string) => {
    const userMsg: ChatMsg = { id: makeId(), role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    // ✅ Typing indicator visible un momento
    await new Promise((r) => setTimeout(r, 650))

    const reply = getBotReply(text)
    const botMsg: ChatMsg = { id: makeId(), role: "assistant", text: reply.text, actions: reply.actions }
    setMessages((prev) => [...prev, botMsg])
    setLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    void simulateReply(input.trim())
    setInput("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot size={24} />
            <h2 className="text-xl font-bold">Asistente Virtual Carlos</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X size={20} />
          </Button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-lg p-3 ${m.role === "user" ? "bg-primary text-white" : "bg-muted"}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* ✅ Botón WhatsApp */}
                {m.role === "assistant" && m.actions?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.actions.map((a, idx) => (
                      <a key={`${m.id}-a-${idx}`} href={a.href} target="_blank" rel="noreferrer">
                        <Button
                          type="button"
                          className={`rounded-full ${
                            a.variant === "whatsapp"
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-primary hover:bg-primary/90 text-white"
                          }`}
                        >
                          {a.variant === "whatsapp" ? <MessageCircle className="mr-2 h-4 w-4" /> : null}
                          {a.label}
                        </Button>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              {m.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {/* ✅ "Escribiendo..." con animación */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-2">Escribiendo…</p>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Escribe: "catálogo", "envíos", "horario" o una categoría (ej: "Baterías")…'
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || loading} className="bg-primary hover:bg-primary/90">
              <Send size={18} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
