import { MongoNoteType } from "../_lib/types"
import { useDeleteNote, useUpdateNote } from "../_actions/mongo/mutation"
import { startTransition } from "react"
import { toast } from "sonner"

export const NoteItem = ({ note }: { note: MongoNoteType }) => {
	const { trigger: updateNote, isMutating } = useUpdateNote()
	const { trigger: deleteNote, isMutating: isDeleting } = useDeleteNote()

	const handleCheck = () => {
		const options = {
			optimisticData: (current: MongoNoteType[] = []) =>
				current.map(item => (item._id === note._id ? { ...item, pinned: !item.pinned } : item)),
			rollbackOnError: true,
			revalidate: false,
		}
		startTransition(() => {
			toast.promise(updateNote(note, options), {
				loading: "actualizando nota...",
				success: "nota actualizada exitosamente",
				error: "error al actualizar nota",
			})
		})
	}

	const handleDelete = async () => {
		const options = {
			optimisticData: (current: MongoNoteType[] = []) =>
				current.filter(item => item._id !== note._id),
			rollbackOnError: true,
			revalidate: false,
		}
		startTransition(() => {
			toast.promise(deleteNote(note, options), {
				loading: "borrando nota...",
				success: "nota borrada exitosamente",
				error: "error al borrar nota",
			})
		})
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
