import { NextResponse } from "next/server"

const API_BASE_URL = 'http://localhost:3001/todos'

interface TodoBody {
  id?: number;
  title?: string;
  completed?: boolean;
  userId?: number;
}

async function proxyRequest(
  method: string, 
  url: string, 
  id: string, 
  body?: TodoBody
) {
  try {
    const requestUrl = id ? `${url}/${id}` : url
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(requestUrl, options)
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

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return proxyRequest('GET', API_BASE_URL, id)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()
  return proxyRequest('PUT', API_BASE_URL, id, body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return proxyRequest('DELETE', API_BASE_URL, id)
}
