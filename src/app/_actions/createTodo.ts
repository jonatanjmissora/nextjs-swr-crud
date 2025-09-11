"use server"
import axios from "axios"
import { TodoType } from "../_lib/types"

export const createTodo = async (
	url: string,
	{ newTodo }: { newTodo: TodoType }
) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await axios.post(url, newTodo)
	return response.data
}
