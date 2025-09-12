import { TodoType } from "@/app/_lib/types"
import axios from "axios"

export const updateTodo = async (updatedTodo: TodoType) => {
	try {
		const response = await axios.put(
			`/api/todos/${updatedTodo.id}`,
			updatedTodo,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return response.data
	} catch (error) {
		console.error("Error en updateTodo:", error)
		if (axios.isAxiosError(error)) {
			console.error("Detalles del error:", error.response?.data)
			throw new Error(
				error.response?.data?.error || "Error al actualizar el TODO"
			)
		}
		throw new Error("Error desconocido al actualizar el TODO")
	}
}
