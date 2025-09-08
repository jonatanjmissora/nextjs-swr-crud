"use server"

import axios from "axios"

// export const deleteTodo2 = async (id: number) => {
// 	await new Promise(resolve => setTimeout(resolve, 2000))
// 	const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
// 		method: "DELETE",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	})

// 	if (response.ok) revalidatePath("/")
// 	return await response.json()
// }

export const deleteTodo = async (id: number) => {
	await new Promise(resolve => setTimeout(resolve, 1000))

	// if (Math.random() < 0.25) {
	// 	throw new Error("Error del servidor: No se pudo eliminar la tarea")
	// }

	try {
		const response = await axios.delete(`http://localhost:3001/todos/${id}`)

		if (response.status === 200) {
			return { success: true, id }
		}

		throw new Error("Error al eliminar la tarea")
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorMessage = error.response?.data?.message || error.message
			throw new Error(`Error al eliminar la tarea: ${errorMessage}`)
		}
		throw error
	}
}
