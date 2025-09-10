"use client"

import { MongoNoteType } from "../_lib/types"
import { startTransition, useState } from "react"
import { toast } from "sonner"
import { useMongo } from "../_lib/mongo-query"
import { NoteItem } from "./MongoItem"
import { useCreateNote } from "../_actions/mongo/mutation"

export default function MongoList() {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const { data: notes, error, isLoading, isValidating } = useMongo()
	const { trigger: createNoteMutation, isMutating } = useCreateNote()

	const handleCreateTodo = async () => {
		const newNote: MongoNoteType = {
			title,
			content,
		}

		const options = {
			optimisticData: (data: MongoNoteType[] | undefined) => {
				console.log("DATA OPTIMISTIC", data)
				return [...(data || []), { ...newNote, title: `${newNote.title} *` }]
			},
		}
		startTransition(async () => {
			toast.promise(createNoteMutation(newNote, options), {
				loading: "creando note...",
				success: "note creado exitosamente",
				error: "error al crear note",
			})
			setTitle("")
			setContent("")
		})
	}

	return (
		<div className="w-full h-full flex flex-col justify-start items-center">
			<div className="w-[700px] mx-auto flex gap-4 items-center p-4">
				<input
					className="border border-slate-600 bg-slate-600/20 rounded px-2 py-1"
					placeholder="titulo"
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<input
					className="border border-slate-600 bg-slate-600/20 rounded px-2 py-1"
					placeholder="content"
					type="text"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<button
					onClick={handleCreateTodo}
					className={`bg-slate-600/20 px-2 py-1 rounded ${isMutating || title.trim() === "" || isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
					disabled={isMutating || title.trim() === "" || isLoading}
				>
					Enviar
				</button>
				{isMutating && <span>mutating...</span>}
				{isValidating && <span>validating...</span>}
			</div>

			{isLoading ? (
				<div className="mt-20 text-xl font-semibold">Loading...</div>
			) : error ? (
				<div>Error: {error.message}</div>
			) : (
				<ul className="mx-auto p-12 py-4 bg-slate-600/20 rounded-lg min-w-[700px] h-[700px] overflow-y-auto">
					{notes?.map((note: MongoNoteType) => (
						<NoteItem key={note._id} note={note} />
					))}
				</ul>
			)}
		</div>
	)
}
