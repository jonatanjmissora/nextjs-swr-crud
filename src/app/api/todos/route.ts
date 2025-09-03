import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("http://localhost:3001/todos")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error("Error fetching todos:", error)
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch todos" }),
      { status: 500 }
    )
  }
}
