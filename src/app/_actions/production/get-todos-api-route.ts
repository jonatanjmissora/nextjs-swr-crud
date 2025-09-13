"use server"

import axios from "axios"
import { TodoType } from "@/app/_lib/types"
import { API_ENDPOINTS } from "@/app/_config/api"

export const getTodosApiRoute = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000))

	try {
		const response = await axios.get(API_ENDPOINTS.TODOS)
		return response.data.todos.sort((a: TodoType, b: TodoType) => b.id - a.id)
	} catch (error) {
		console.error("Error fetching todos:", error)
		throw error
	}
}
