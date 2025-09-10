import useSWR from "swr"
import { MongoNoteType } from "../_lib/types"
import { getMongoNotes } from "../_actions/mongo/get-notes"

export const useMongo = () => {
	return useSWR<MongoNoteType[]>("mongo-notes", getMongoNotes, {
		revalidateOnFocus: false,
		// revalidateOnMount: false,
		refreshInterval: 10000,
	})
}
