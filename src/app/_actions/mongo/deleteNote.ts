import axios from "axios"

export const deleteNote = async (url: string, { id }: { id: string }) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await axios.delete(`${url}/${id}`)
	return response.data
}
