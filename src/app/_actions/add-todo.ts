"use server"

import axios from "axios"
import { revalidatePath } from "next/cache"

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
export const addTodo = async (title: string) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const id = Date.now()
	const newTodo = { userId: 1, id, title, completed: false }
	try {
		await axios.post("http://localhost:3001/todos", newTodo)
		revalidatePath("/")
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
