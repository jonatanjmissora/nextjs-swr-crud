"use server"

import { revalidatePath } from "next/cache"
import { TodoType } from "../_lib/types"
import axios from "axios"

// export const updateTodo2 = async (todo: TodoType) => {
// 	await new Promise(resolve => setTimeout(resolve, 2000))
// 	const response = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(todo),
// 	})
// 	if (response.ok) revalidatePath("/")
// 	return await response.json()
// }

export const updateTodo = async (todo: TodoType) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	try {
		await axios.patch(`http://localhost:3001/todos/${todo.id}`, {
			...todo,
			completed: !todo.completed,
		})
		revalidatePath("/")
		return { message: `actualiamos el todo ${todo.id}` }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, lanzamos el mensaje de error
			throw new Error(`Error al actualizar el todo ${todo.id}`)
		}
		// Para cualquier otro tipo de error
		throw new Error(`Error inesperado al actualizar el todo ${todo.id}`)
	}
}
