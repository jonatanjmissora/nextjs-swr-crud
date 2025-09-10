import axios from "axios"
import { MongoNoteType } from "@/app/_lib/types"

export const updateNote = async (
	url: string,
	{ updatedNote }: { updatedNote: MongoNoteType }
) => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	const response = await axios.patch(`${url}/${updatedNote._id}`, updatedNote)
	return response.data
}
