"use server"

import { getCollection } from "@/app/_lib/mongo-connect"

export const getMongoNotes = async () => {
	await new Promise(resolve => setTimeout(resolve, 2000))
	console.log("GET new mongodb")
	const notesCollection = await getCollection("notes")
	const notes = await notesCollection.find().toArray()
	// Convert MongoDB documents to plain objects and ensure _id is a string
	const notesArray = notes.map(note => ({
		...note,
		_id: note._id.toString(),
	}))
	return notesArray
}
