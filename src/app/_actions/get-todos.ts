"use server"

import axios from "axios"
// import { TodoType } from "../_lib/types"

// export const getTodos2 = async () => {
// 	try {
// 		await new Promise(resolve => setTimeout(resolve, 2000))
// 		const response = await fetch("http://localhost:3000/api/todos")

// 		if (!response.ok) {
// 			throw new Error("Failed to fetch todos")
// 		}

// 		const data = await response.json()
// 		return {success: true, data}
// 	} catch (error) {
// 		console.error("Error fetching todos:", error)
// 		return {success: false, data: []}
// 	}
// }

// export const getTodos = async (): Promise<{
// 	success: boolean
// 	data: TodoType[]
// }> => {
// 	try {
// 		const response = await axios.get("http://localhost:3001/todos")
// 		return { success: true, data: response.data }
// 	} catch (error) {
// 		if (axios.isAxiosError(error)) {
// 			return { success: false, data: [] }
// 		}
// 		throw new Error(`Error inesperado al obtener los todos`)
// 	}
// }

export const getTodos = async () => {
	try {
		const response = await axios.get("http://localhost:3001/todos")
		return response.data
	} catch (error) {
		console.error("Error fetching todos:", error)
	}
}
