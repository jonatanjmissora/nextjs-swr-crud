import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

// Función auxiliar para leer el archivo JSON
async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading db.json:', error)
    return { todos: [] }
  }
}

// Función auxiliar para escribir en el archivo JSON
async function writeDb(data: any) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing to db.json:', error)
    return false
  }
}

// GET /api/todos - Obtener todos los TODOs
export async function GET() {
  const db = await readDb()
  console.log("db", db)
  return NextResponse.json(db)
}

// POST /api/todos - Crear un nuevo TODO
export async function POST(request: Request) {
  try {
    const todo = await request.json()
    const db = await readDb()
    
    // Generar un nuevo ID
    const newId = db.todos.length > 0 
      ? Math.max(...db.todos.map((t: any) => t.id)) + 1 
      : 1
    
    const newTodo = {
      ...todo,
      id: newId,
      completed: todo.completed || false
    }
    
    db.todos.push(newTodo)
    
    const success = await writeDb(db)
    if (!success) {
      return NextResponse.json(
        { error: 'Error al guardar el TODO' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error('Error creating TODO:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
