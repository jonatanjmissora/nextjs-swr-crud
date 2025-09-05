import axios from "axios"
import { TodoType } from "../_lib/types"

const todosApi = axios.create({
	baseURL: "http://localhost:3001",
})

export const todosUrlEndpoint = "/todos"

export const getTodos = async (): Promise<TodoType[]> => {
	try {
		const response = await todosApi.get(todosUrlEndpoint)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, lanzamos el mensaje de error
			throw new Error(`Error al obtener los todos`)
		}
		// Para cualquier otro tipo de error
		throw new Error(`Error inesperado al obtener los todos`)
	}
}

export const addTodo = async (title: string) => {
	const id = Date.now()
	try {
		await todosApi.post(todosUrlEndpoint, {
			userId: 1,
			id,
			title,
			completed: false,
		})
		return { message: `agregamos el todo ${id}` }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, lanzamos el mensaje de error
			throw new Error(`Error al agregar el todo ${id}`)
		}
		// Para cualquier otro tipo de error
		throw new Error(`Error inesperado al agregar el todo ${id}`)
	}
}

export const updateTodo = async (todo: TodoType) => {
	try {
		await todosApi.patch(`${todosUrlEndpoint}/${todo.id}`, {
			...todo,
			completed: !todo.completed,
		})
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

export const deleteTodo = async (id: number) => {
	try {
		await todosApi.delete(`${todosUrlEndpoint}/${id}`)
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
