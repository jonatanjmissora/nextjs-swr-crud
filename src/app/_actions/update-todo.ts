"use server"

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

	if (Math.random() < 0.25) {
		throw new Error("Fallo al actualizar todo!")
	}

	try {
		const response = await axios.patch(
			`http://localhost:3001/todos/${todo.id}`,
			{
				...todo,
				completed: !todo.completed,
			}
		)

		if (response.status === 200) {
			return { success: true, id: todo.id }
		}

		throw new Error("Error al actualizar la tarea")
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message
			throw new Error(`Error al actualizar la tarea: ${errorMessage}`)
		}
		throw error
	}
}
