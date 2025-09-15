import { NextResponse } from "next/server"

const API_BASE_URL = 'http://localhost:3001/todos'

interface TodoBody {
  title: string;
  completed?: boolean;
  userId?: number;
}

async function proxyRequest(method: string, url: string, body?: TodoBody) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error)
    return NextResponse.json(
      { error: `Error al procesar la solicitud: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  return proxyRequest('GET', API_BASE_URL)
}

export async function POST(request: Request) {
  const body = await request.json()
  return proxyRequest('POST', API_BASE_URL, body)
}
