import { NextResponse } from "next/server"

const WHATSAPP_PHONE = "18092401530" // Numero de Whatsapp

const CATEGORIES = [
  "Accesorios",
  "Baterías",
  "Cables",
  "Carrocería",
  "Correas",
  "Filtros",
  "Herramientas",
  "Juntas",
  "Lubricantes y químicos",
  "Mangueras",
  "Partes del motor",
  "Radiadores",
  "Rodamientos",
  "Partes del sistema de freno",
  "Partes del sistema eléctrico",
  "Partes de suspensiones",
  "Partes de transmisiones",
]

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .trim()
}

function buildCatalogText() {
  const list = CATEGORIES.map((c, i) => `${i + 1}. ${c}`).join("\n")
  return (
    `📌 *Catálogo de categorías disponibles*\n\n` +
    `${list}\n\n` +
    `Si me dices cuál necesitas, te ayudo a pedirlo por WhatsApp. ✅`
  )
}

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}

function detectCategory(userText: string) {
  const t = normalizeText(userText)
  // match por inclusión (con acentos removidos)
  for (const cat of CATEGORIES) {
    const key = normalizeText(cat)
    if (t.includes(key)) return cat
  }

  // aliases simples
  if (t.includes("bateria")) return "Baterías"
  if (t.includes("freno")) return "Partes del sistema de freno"
  if (t.includes("electrico") || t.includes("eléctrico")) return "Partes del sistema eléctrico"
  if (t.includes("motor")) return "Partes del motor"
  if (t.includes("lubricante") || t.includes("quimico") || t.includes("químico")) return "Lubricantes y químicos"
  if (t.includes("suspension") || t.includes("suspensión")) return "Partes de suspensiones"
  if (t.includes("transmision") || t.includes("transmisión")) return "Partes de transmisiones"

  return null
}

function buildReply(userText: string) {
  const t = normalizeText(userText)

  const isGreeting =
    t === "hola" ||
    t.startsWith("hola ") ||
    t.includes("buenas") ||
    t.includes("buenos dias") ||
    t.includes("buenas tardes") ||
    t.includes("buenas noches")

  const asksCatalog =
    t.includes("catalogo") ||
    t.includes("catálogo") ||
    t.includes("productos") ||
    t.includes("categorias") ||
    t.includes("categorías") ||
    t.includes("que venden") ||
    t.includes("qué venden")

  const cat = detectCategory(userText)

  if (asksCatalog) {
    const msg = "Hola, quiero el catálogo completo con disponibilidad. ¿Me ayudas?"
    return (
      `${buildCatalogText()}\n\n` +
      `📲 *Pedir por WhatsApp:* ${waLink(msg)}`
    )
  }

  if (cat) {
    const msg = `Hola, estoy interesado en: ${cat}. ¿Me ayudas con disponibilidad y precios?`
    return (
      `Perfecto \n\n` +
      `📦 *Categoría:* ${cat}\n` +
      `Para confirmar *disponibilidad y precios*, escríbenos por WhatsApp:\n\n` +
      `📲 ${waLink(msg)}\n\n` +
      `Si quieres, dime también *marca/modelo/año* del vehículo y te asesoramos más rápido.`
    )
  }

  if (t.includes("horario") || t.includes("hora") || t.includes("atienden") || t.includes("abren")) {
    const msg = "Hola, quiero confirmar el horario de atención."
    return (
      `🕒 *Horario de atención*\n` +
      `Lunes a Sábado:\n` +
      `• 8:00 A.M. a 12:30 P.M.\n` +
      `• 2:00 P.M. a 6:00 P.M.\n\n` +
      `📲 Si quieres confirmar hoy, escríbenos: ${waLink(msg)}`
    )
  }

  if (isGreeting) {
    const msg = "Hola, quiero información de repuestos y disponibilidad."
    return (
      `¡Hola! 👋 Soy el Asistente Virtual de Auto Repuestos Carlos.\n\n` +
      `Puedo ayudarte con:\n` +
      `• Ver el catálogo de categorías\n` +
      `• Recomendarte qué pedir según tu necesidad\n` +
      `• Redirigirte a WhatsApp para cotización \n\n` +
      `Escríbeme *“catálogo”* para ver la lista completa, o dime qué necesitas.\n\n` +
      `📲 WhatsApp directo: ${waLink(msg)}`
    )
  }

  // respuesta por defecto
  const msg = `Hola, necesito ayuda con repuestos. Mi consulta es: "${userText}"`
  return (
    `Te ayudo \n\n` +
    `Dime si buscas *una categoría* (por ejemplo: Baterías, Filtros, Frenos, etc.) o escribe *“catálogo”*.\n\n` +
    `📲 Para cotizar rápido por WhatsApp: ${waLink(msg)}`
  )
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any))

    // soporta varios formatos por si tu front manda diferente
    const text =
      typeof body?.text === "string"
        ? body.text
        : typeof body?.message === "string"
          ? body.message
          : Array.isArray(body?.messages)
            ? String(body.messages?.[body.messages.length - 1]?.content ?? "")
            : ""

    const userText = (text || "").trim() || "hola"
    const reply = buildReply(userText)

    return NextResponse.json({ reply })
  } catch (err) {
    const fallback = `Ocurrió un error. Escríbenos por WhatsApp: https://wa.me/${WHATSAPP_PHONE}`
    return NextResponse.json({ reply: fallback }, { status: 200 })
  }
}
