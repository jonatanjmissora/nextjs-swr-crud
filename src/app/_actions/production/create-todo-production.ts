import { TodoType } from "@/app/_lib/types"
import axios from "axios"

export const createTodoProduction = async (newTodo: TodoType) => {
	try {
		const response = await axios.post(
			"http://localhost:3000/api/todos",
			newTodo,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return response.data
	} catch (error) {
		console.error("Error en createTodo:", error)
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, podemos acceder a más detalles
			console.error("Detalles del error:", error.response?.data)
			throw new Error(error.response?.data?.error || "Error al crear el TODO")
		}
		throw new Error("Error desconocido al crear el TODO")
	}
}
