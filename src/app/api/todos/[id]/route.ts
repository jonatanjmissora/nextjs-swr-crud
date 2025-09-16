import { NextResponse } from "next/server"
import { API_ENDPOINTS } from "@/app/_config/api"

interface TodoBody {
  id?: number;
  title?: string;
  completed?: boolean;
  userId?: number;
}

async function proxyRequest(
  method: string, 
  url: string, 
  body?: TodoBody
): Promise<NextResponse> {
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

export async function GET(
  request: Request,
  context: any
) {
  const id = context.params?.id;
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  return proxyRequest('GET', API_ENDPOINTS.TODO_BY_ID(Number(id)));
}

export async function PUT(
  request: Request,
  context: any
) {
  const id = context.params?.id;
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  const body = await request.json();
  return proxyRequest('PUT', API_ENDPOINTS.TODO_BY_ID(Number(id)), body);
}

export async function DELETE(
  request: Request,
  context: any
) {
  const id = context.params?.id;
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  return proxyRequest('DELETE', API_ENDPOINTS.TODO_BY_ID(Number(id)));
}
