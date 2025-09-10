"use server"

import axios from "axios"
import { TodoType } from "../_lib/types"

export const getTodos = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	try {
		const response = await axios.get("http://localhost:3001/todos")
		return response.data.sort((a: TodoType, b: TodoType) => b.id - a.id)
	} catch (error) {
		console.error("Error fetching todos:", error)
	}
}
