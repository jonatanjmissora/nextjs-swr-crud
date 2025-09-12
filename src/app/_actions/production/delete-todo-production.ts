import axios from "axios"

export const deleteTodoProduction = async (id: number) => {
	try {
		const response = await axios.delete(
			`http://localhost:3000/api/todos/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return response.status === 204 // 204 No Content es el código de éxito para DELETE
	} catch (error) {
		console.error("Error en deleteTodo:", error)
		if (axios.isAxiosError(error)) {
			console.error("Detalles del error:", error.response?.data)
			throw new Error(
				error.response?.data?.error || "Error al eliminar el TODO"
			)
		}
		throw new Error("Error desconocido al eliminar el TODO")
	}
}
