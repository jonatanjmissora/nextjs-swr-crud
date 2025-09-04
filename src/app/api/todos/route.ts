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

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const newTodo = {
			userId: 1,
			id: Date.now(),
			title: body.title,
			completed: false,
		}
		const response = await fetch("http://localhost:3001/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		console.log("Todo agregado :", newTodo)
		const serverResponse = {
			success: true,
			id: newTodo.id,
			message: `Todo ${newTodo.id} agregado correctamente`,
		}

		return new NextResponse(JSON.stringify(serverResponse), {
			status: 200,
		})
	} catch (error) {
		console.error("Error al agregar el todo:", error)
		const serverResponse = {
			success: false,
			id: null,
			message: `Error al agregar el todo`,
		}
		return new NextResponse(JSON.stringify(serverResponse), {
			status: 500,
		})
	}
}
