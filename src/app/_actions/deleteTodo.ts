"use server"
import axios from "axios"

export const deleteTodo = async (url: string, { id }: { id: number }) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await axios.delete(`${url}/${id}`)
	return response.data
}
