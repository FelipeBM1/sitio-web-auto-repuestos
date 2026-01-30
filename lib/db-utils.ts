import clientPromise from "./mongodb"

export interface Product {
  _id?: string
  name: string
  category: string
  price: number
  description: string
  image: string
  stock: number
  createdAt: Date
}

export interface ChatMessage {
  _id?: string
  userId: string
  message: string
  response: string
  timestamp: Date
}

export async function getProducts(category?: string) {
  try {
    const client = await clientPromise
    const db = client.db("autorepuestos_carlos")

    const query = category ? { category } : {}
    const products = await db.collection<Product>("products").find(query).toArray()

    return products
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}

export async function saveChatMessage(userId: string, message: string, response: string) {
  try {
    const client = await clientPromise
    const db = client.db("autorepuestos_carlos")

    await db.collection<ChatMessage>("chat_messages").insertOne({
      userId,
      message,
      response,
      timestamp: new Date(),
    })

    return true
  } catch (error) {
    console.error("Error al guardar mensaje:", error)
    return false
  }
}
