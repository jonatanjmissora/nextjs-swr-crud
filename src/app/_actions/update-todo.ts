"use server"

import { revalidatePath } from "next/cache"
import { TodoType } from "../_lib/types"

export const updateTodo = async (todo: TodoType) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todo),
	})
	if (response.ok) revalidatePath("/")
	return await response.json()
}
