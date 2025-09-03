"use server"

export const getTodos = async () => {
	try {
		await new Promise(resolve => setTimeout(resolve, 2000))
		const response = await fetch("http://localhost:3000/api/todos")

		if (!response.ok) {
			throw new Error("Failed to fetch todos")
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Error fetching todos:", error)
		throw error
	}
}
