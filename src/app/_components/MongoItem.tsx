import { MongoNoteType } from "../_lib/types"
import { useDeleteNote } from "../_actions/mongo/mutation"
import { useUpdateNote } from "../_actions/mongo/mutation"

export const NoteItem = ({ note }: { note: MongoNoteType }) => {
	const { trigger: deleteNoteMutation, isMutating: isDeleting } =
		useDeleteNote()
	const { trigger: updateNoteMutation, isMutating } = useUpdateNote()
	const handleCheck = () => {
		// updateNoteMutation({ ...note, pinned: !note.pinned })
	}
	const handleDelete = () => {
		// deleteNoteMutation(note._id)
	}
	return (
		<li className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr] items-center py-2">
			<div className="flex items-center gap-2 ">
				<label htmlFor={note._id}>pin</label>
				<input
					name={note._id}
					type="checkbox"
					className={`size-5 ${isMutating ? "cursor-not-allowed" : "cursor-pointer"}`}
					checked={note.pinned}
					onChange={handleCheck}
					disabled={isMutating}
				/>
			</div>
			<span className=" ">{note.title}</span>
			<span className=" truncate ">{note.content}</span>
			<button
				className={` bg-red-500/20 text-white px-2 py-1 rounded  ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
				disabled={isDeleting}
				onClick={handleDelete}
			>
				Delete
			</button>
		</li>
	)
}
