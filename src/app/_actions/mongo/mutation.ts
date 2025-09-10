import { MongoNoteType } from "@/app/_lib/types"
import useSWRMutation from "swr/mutation"
import { createNote } from "./createNote"
import { deleteNote } from "./deleteNote"
import { updateNote } from "./updateNote"

export const useCreateNote = () => {
	return useSWRMutation(
		"mongo-notes",
		(_url, { arg }: { arg: MongoNoteType }) => createNote(arg),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

export const useUpdateNote = () => {
	// return useSWRMutation(
	// 	"mongo-notes",
	// 	(url, { arg }: { arg: MongoNoteType }) =>
	// 		updateNote(url, { updatedNote: arg }),
	// 	{
	// 		rollbackOnError: true,
	// 		revalidate: false,
	// 	}
	// )
}

export const useDeleteNote = () => {
	// return useSWRMutation(
	// 	"mongo-notes",
	// 	(url, { arg }: { arg: string }) => deleteNote(url, { id: arg }),
	// 	{
	// 		rollbackOnError: true,
	// 		revalidate: false,
	// 	}
	// )
}
