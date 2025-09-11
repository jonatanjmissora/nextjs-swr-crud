import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading db.json:', error)
    return { todos: [] }
  }
}

async function writeDb(data: any) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing to db.json:', error)
    return false
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await readDb()
    const todo = db.todos.find((t: any) => t.id === Number(params.id))
    
    if (!todo) {
      return NextResponse.json(
        { error: 'TODO no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(todo)
  } catch (error) {
    console.error('Error getting TODO:', error)
    return NextResponse.json(
      { error: 'Error al obtener el TODO' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    const db = await readDb()
    const index = db.todos.findIndex((t: any) => t.id === Number(params.id))
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'TODO no encontrado' },
        { status: 404 }
      )
    }
    
    const updatedTodo = { ...db.todos[index], ...updates }
    db.todos[index] = updatedTodo
    
    const success = await writeDb(db)
    if (!success) {
      return NextResponse.json(
        { error: 'Error al actualizar el TODO' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error('Error updating TODO:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el TODO' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await readDb()
    const initialLength = db.todos.length
    
    db.todos = db.todos.filter((t: any) => t.id !== Number(params.id))
    
    if (db.todos.length === initialLength) {
      return NextResponse.json(
        { error: 'TODO no encontrado' },
        { status: 404 }
      )
    }
    
    const success = await writeDb(db)
    if (!success) {
      return NextResponse.json(
        { error: 'Error al eliminar el TODO' },
        { status: 500 }
      )
    }
    
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting TODO:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el TODO' },
      { status: 500 }
    )
  }
}
