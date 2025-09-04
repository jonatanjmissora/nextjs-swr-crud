import axios from "axios"
import { TodoType } from "../_lib/types"

const todosApi = axios.create({
	baseURL: "http://localhost:3001",
})

export const todosUrlEndpoint = "/todos"

export const getTodos = async (): Promise<TodoType[]> => {
	const response = await todosApi.get(todosUrlEndpoint)
	return response.data
}

export const addTodo = async ({ userId, title, completed }: TodoType) => {
	const response = await todosApi.post(todosUrlEndpoint, {
		userId,
		title,
		completed,
	})
	return response.data
}

export const updateTodo = async (todo: TodoType) => {
	const response = await todosApi.patch(`${todosUrlEndpoint}/${todo.id}`, todo)
	return response.data
}

export const deleteTodo = async (id: number) => {
	try {
		const response = await todosApi.delete(`${todosUrlEndpoint}/${id}`)
		return {
			status: response.status,
			message: `Todo ${id} eliminado correctamente`,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, lanzamos el mensaje de error
			throw new Error(`Error al eliminar el todo ${id}`)
		}
		// Para cualquier otro tipo de error
		throw new Error(`Error inesperado al eliminar el todo ${id}`)
	}
}
