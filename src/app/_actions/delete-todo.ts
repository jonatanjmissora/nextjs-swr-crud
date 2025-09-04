"use server"

import { revalidatePath } from "next/cache"

export const deleteTodo = async (id: number) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})

	if (response.ok) revalidatePath("/")
	return await response.json()
}
