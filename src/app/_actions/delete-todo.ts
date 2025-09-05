"use server"

import axios from "axios"
import { revalidatePath } from "next/cache"

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
	await new Promise(resolve => setTimeout(resolve, 2000))
	try {
		await axios.delete(`http://localhost:3001/todos/${id}`)
		revalidatePath("/")
		return { message: `Todo ${id} eliminado correctamente` }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, lanzamos el mensaje de error
			throw new Error(`Error al eliminar el todo ${id}`)
		}
		// Para cualquier otro tipo de error
		throw new Error(`Error inesperado al eliminar el todo ${id}`)
	}
}
