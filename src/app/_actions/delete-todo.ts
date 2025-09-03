"use server"

export const deleteTodo = async (id: number) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await fetch(`http://localhost:3001/todos/${id}`, {
		method: "DELETE",
	})
	const data = await response.json()
	return data
}
