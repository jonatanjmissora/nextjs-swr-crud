"use server"

import axios from "axios"
import { TodoType } from "../../_lib/types"

export const getTodosApiRoute = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	try {
		const response2 = await axios.get("http://localhost:3000/api/todos")
		return response2.data.todos.sort((a: TodoType, b: TodoType) => b.id - a.id)
	} catch (error) {
		console.error("Error fetching todos:", error)
	}
}
