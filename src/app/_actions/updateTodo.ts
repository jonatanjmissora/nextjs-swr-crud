"use server"
import axios from "axios"
import { TodoType } from "../_lib/types"

export const updateTodo = async (
	url: string,
	{ updatedTodo }: { updatedTodo: TodoType }
) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await axios.patch(`${url}/${updatedTodo.id}`, updatedTodo)
	return response.data
}
