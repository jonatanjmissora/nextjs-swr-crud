import { NextResponse } from "next/server"
import fs from "node:fs/promises"
import path from "node:path"

const dbPath = path.join(process.cwd(), "data", "db.json")

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface JSONType {
  todos: Todo[]
}

// Función auxiliar para leer el archivo JSON
async function readDb(): Promise<JSONType> {
	try {
		const data = await fs.readFile(dbPath, "utf-8")
		return JSON.parse(data)
	} catch (error) {
		console.error("Error reading db.json:", error)
		return { todos: [] }
	}
}

// Función auxiliar para escribir en el archivo JSON
async function writeDb(data: JSONType) {
	try {
		await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8")
		return true
	} catch (error) {
		console.error("Error writing to db.json:", error)
		return false
	}
}

// GET /api/todos - Obtener todos los TODOs
export async function GET() {
	const db = await readDb()
	return NextResponse.json(db)
}

// POST /api/todos - Crear un nuevo TODO
export async function POST(request: Request) {
	try {
		const newTodo = await request.json()
		const db = await readDb()

		db.todos.push(newTodo)

		const success = await writeDb(db)
		if (!success) {
			return NextResponse.json(
				{ error: "Error al guardar el TODO" },
				{ status: 500 }
			)
		}
		console.log("nuevo todo creado :", newTodo)
		return NextResponse.json(newTodo, { status: 201 })
	} catch (error) {
		console.error("Error creating TODO:", error)
		return NextResponse.json(
			{ error: "Error al procesar la solicitud" },
			{ status: 500 }
		)
	}
}
