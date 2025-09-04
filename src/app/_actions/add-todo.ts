"use server"

import { revalidatePath } from "next/cache"

export const addTodo = async (title: string) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await fetch("http://localhost:3000/api/todos/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	})
	if (response.ok) revalidatePath("/")
	return await response.json()
}
