import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")

  try {
    const products = await getProducts(category || undefined)

    return NextResponse.json({
      success: true,
      products,
    })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Error al obtener productos" }, { status: 500 })
  }
}
