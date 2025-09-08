"use server"

import axios from "axios"
import { TodoType } from "../_lib/types"

// si lo hago con una API/route
// export const addTodo = async (title: string) => {
// 	await new Promise(resolve => setTimeout(resolve, 2000))
// 	const response = await fetch("http://localhost:3000/api/todos/", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({ title }),
// 	})
// 	if (response.ok) revalidatePath("/")
// 	return await response.json()
// }

//Si lo hago con axios directo al json-server
export const addTodo = async (newTodo: TodoType) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	try {
		if (Math.random() < 0.5) throw new Error("Fallo al agregar todo!")
		await axios.post("http://localhost:3001/todos", newTodo)
		// revalidatePath("/")
		return { message: `agregamos el todo ${newTodo.id}` }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Si es un error de Axios, lanzamos el mensaje de error
			throw new Error(`Error al agregar el todo ${newTodo.id}`)
		}
		// Para cualquier otro tipo de error
		throw new Error(`Error inesperado al agregar el todo ${newTodo.id}`)
	}
}
