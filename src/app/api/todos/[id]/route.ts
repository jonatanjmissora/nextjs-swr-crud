import { NextResponse } from "next/server"

export async function DELETE(
	_request: Request,
	{
		params,
	}: {
		params: { id: string }
	}
) {
	console.log("entro al delete", params)
	const { id } = await params
	console.log("entro al delete", id)
	try {
		const response = await fetch(`http://localhost:3001/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const serverResponse = {
			success: true,
			message: `Todo ${id} correctamente eliminado`,
		}

		console.log("Exito al eliminar en route : ", id)
		return new NextResponse(JSON.stringify(serverResponse), {
			status: 200,
		})
	} catch (error) {
		console.error("Error al borrar el todo en route:", error)
		const serverResponse = {
			success: false,
			message: `Error al borrar el todo ${id}`,
		}
		return new NextResponse(JSON.stringify(serverResponse), {
			status: 500,
		})
	}
}

export async function PUT(request: Request) {
	const body = await request.json()
	const newTodo = {
		userId: body.userId,
		id: body.id,
		title: body.title,
		completed: !body.completed,
	}
	try {
		const response = await fetch(`http://localhost:3001/todos/${body.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const serverResponse = {
			success: true,
			message: `Todo ${body.id} correctamente actualizado`,
		}

		console.log("Exito al actualizar en route : ", body.id)
		return new NextResponse(JSON.stringify(serverResponse), {
			status: 200,
		})
	} catch (error) {
		console.error("Error al actualizar el todo en route:", error)
		const serverResponse = {
			success: false,
			message: `Error al actualizar el todo ${body.id}`,
		}
		return new NextResponse(JSON.stringify(serverResponse), {
			status: 500,
		})
	}
}
