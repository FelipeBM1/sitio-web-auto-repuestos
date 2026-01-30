// Script para inicializar la base de datos de Auto Repuestos Carlos
// Ejecuta este script con: node scripts/init-database.js

import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "autorepuestos_carlos"

const sampleProducts = [
  // Accesorios
  {
    name: "Tapete Universal",
    category: "accesorios",
    price: 45000,
    description: "Tapete universal de alta calidad",
    image: "/car-floor-mat.jpg",
    stock: 15,
    createdAt: new Date(),
  },
  {
    name: "Organizador de Maletero",
    category: "accesorios",
    price: 35000,
    description: "Organizador plegable para maletero",
    image: "/car-trunk-organizer.jpg",
    stock: 20,
    createdAt: new Date(),
  },
  {
    name: "Cubre Volante Premium",
    category: "accesorios",
    price: 28000,
    description: "Forro de volante ergonómico",
    image: "/steering-wheel-cover.png",
    stock: 30,
    createdAt: new Date(),
  },
  {
    name: "Kit de Herramientas Básico",
    category: "accesorios",
    price: 120000,
    description: "Kit completo de herramientas",
    image: "/car-tool-kit.jpg",
    stock: 10,
    createdAt: new Date(),
  },
  {
    name: "Luces LED Interiores",
    category: "accesorios",
    price: 55000,
    description: "Set de luces LED para interior",
    image: "/led-car-interior-lights.jpg",
    stock: 25,
    createdAt: new Date(),
  },
  {
    name: "Porta Celular Magnético",
    category: "accesorios",
    price: 25000,
    description: "Soporte magnético universal",
    image: "/magnetic-phone-holder-car.jpg",
    stock: 40,
    createdAt: new Date(),
  },

  // Lubricantes
  {
    name: "Aceite Motor 5W-30",
    category: "lubricantes",
    price: 85000,
    description: "Aceite sintético premium",
    image: "/motor-oil-bottle.jpg",
    stock: 50,
    createdAt: new Date(),
  },
  {
    name: "Aceite Motor 10W-40",
    category: "lubricantes",
    price: 78000,
    description: "Aceite semi-sintético",
    image: "/engine-oil-synthetic.jpg",
    stock: 45,
    createdAt: new Date(),
  },
  {
    name: "Aceite Transmisión ATF",
    category: "lubricantes",
    price: 92000,
    description: "Fluido para transmisión automática",
    image: "/placeholder.svg",
    stock: 30,
    createdAt: new Date(),
  },
  {
    name: "Grasa Multiusos",
    category: "lubricantes",
    price: 42000,
    description: "Grasa para múltiples aplicaciones",
    image: "/placeholder.svg",
    stock: 35,
    createdAt: new Date(),
  },

  // Baterías
  {
    name: "Batería 45 AH",
    category: "baterias",
    price: 380000,
    description: "Batería libre de mantenimiento",
    image: "/placeholder.svg",
    stock: 12,
    createdAt: new Date(),
  },
  {
    name: "Batería 65 AH",
    category: "baterias",
    price: 450000,
    description: "Batería de alto rendimiento",
    image: "/placeholder.svg",
    stock: 8,
    createdAt: new Date(),
  },
  {
    name: "Batería 75 AH",
    category: "baterias",
    price: 520000,
    description: "Batería premium",
    image: "/placeholder.svg",
    stock: 6,
    createdAt: new Date(),
  },

  // Frenos
  {
    name: "Pastillas Freno Delanteras",
    category: "frenos",
    price: 125000,
    description: "Pastillas de alto desempeño",
    image: "/placeholder.svg",
    stock: 20,
    createdAt: new Date(),
  },
  {
    name: "Pastillas Freno Traseras",
    category: "frenos",
    price: 105000,
    description: "Pastillas cerámicas",
    image: "/placeholder.svg",
    stock: 22,
    createdAt: new Date(),
  },
  {
    name: "Discos de Freno",
    category: "frenos",
    price: 280000,
    description: "Discos ventilados",
    image: "/placeholder.svg",
    stock: 10,
    createdAt: new Date(),
  },
  {
    name: "Líquido de Frenos DOT 4",
    category: "frenos",
    price: 28000,
    description: "Fluido de frenos profesional",
    image: "/placeholder.svg",
    stock: 40,
    createdAt: new Date(),
  },

  // Herramientas
  {
    name: "Juego de Llaves",
    category: "herramientas",
    price: 145000,
    description: "Set completo de llaves métricas",
    image: "/placeholder.svg",
    stock: 15,
    createdAt: new Date(),
  },
  {
    name: "Gato Hidráulico 2T",
    category: "herramientas",
    price: 220000,
    description: "Gato hidráulico profesional",
    image: "/placeholder.svg",
    stock: 8,
    createdAt: new Date(),
  },
  {
    name: "Compresor de Aire",
    category: "herramientas",
    price: 185000,
    description: "Compresor portátil",
    image: "/placeholder.svg",
    stock: 10,
    createdAt: new Date(),
  },

  // Acabado y brillo
  {
    name: "Cera Premium",
    category: "acabado",
    price: 48000,
    description: "Cera protectora de larga duración",
    image: "/placeholder.svg",
    stock: 25,
    createdAt: new Date(),
  },
  {
    name: "Polish Profesional",
    category: "acabado",
    price: 65000,
    description: "Pulidor de alta calidad",
    image: "/placeholder.svg",
    stock: 20,
    createdAt: new Date(),
  },
  {
    name: "Shampoo pH Neutro",
    category: "acabado",
    price: 32000,
    description: "Shampoo para auto",
    image: "/placeholder.svg",
    stock: 30,
    createdAt: new Date(),
  },

  // Aditivos y tratamientos
  {
    name: "Aditivo Gasolina",
    category: "aditivos",
    price: 42000,
    description: "Mejora el rendimiento",
    image: "/placeholder.svg",
    stock: 35,
    createdAt: new Date(),
  },
  {
    name: "Limpia Inyectores",
    category: "aditivos",
    price: 55000,
    description: "Limpiador de sistema de inyección",
    image: "/placeholder.svg",
    stock: 28,
    createdAt: new Date(),
  },
  {
    name: "Stop Leak Radiador",
    category: "aditivos",
    price: 38000,
    description: "Sella fugas del radiador",
    image: "/placeholder.svg",
    stock: 30,
    createdAt: new Date(),
  },

  // Coolants
  {
    name: "Refrigerante Verde",
    category: "coolants",
    price: 45000,
    description: "Anticongelante verde estándar",
    image: "/placeholder.svg",
    stock: 40,
    createdAt: new Date(),
  },
  {
    name: "Refrigerante Rojo",
    category: "coolants",
    price: 48000,
    description: "Refrigerante de larga vida",
    image: "/placeholder.svg",
    stock: 35,
    createdAt: new Date(),
  },
  {
    name: "Anticongelante",
    category: "coolants",
    price: 52000,
    description: "Protección extrema",
    image: "/placeholder.svg",
    stock: 30,
    createdAt: new Date(),
  },
]

async function initDatabase() {
  console.log("🚀 Iniciando configuración de base de datos...")

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("✅ Conectado a MongoDB")

    const db = client.db(DB_NAME)

    // Crear colección de productos
    const productsCollection = db.collection("products")

    // Eliminar productos existentes (opcional)
    await productsCollection.deleteMany({})
    console.log("🗑️  Productos anteriores eliminados")

    // Insertar productos de ejemplo
    const result = await productsCollection.insertMany(sampleProducts)
    console.log(`✅ ${result.insertedCount} productos insertados`)

    // Crear índices para mejor rendimiento
    await productsCollection.createIndex({ category: 1 })
    await productsCollection.createIndex({ name: "text", description: "text" })
    console.log("✅ Índices creados")

    // Crear colección de mensajes de chat
    const chatCollection = db.collection("chat_messages")
    await chatCollection.createIndex({ timestamp: -1 })
    await chatCollection.createIndex({ userId: 1 })
    console.log("✅ Colección de chat configurada")

    console.log("\n🎉 Base de datos inicializada correctamente!")
    console.log(`📊 Total de productos: ${sampleProducts.length}`)
    console.log("🗄️  Colecciones: products, chat_messages")
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error)
  } finally {
    await client.close()
    console.log("👋 Conexión cerrada")
  }
}

initDatabase()
