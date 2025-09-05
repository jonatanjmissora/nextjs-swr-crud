"use client"

import { startTransition, useState } from "react"
import { toast } from "sonner"
import { addTodo } from "../_actions/add-todo"
import { mutate } from "swr"

export default function AddTodoForm() {
	const [title, setTitle] = useState("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			toast.promise(addTodo(title), {
				loading: "creando todo...",
				success: data => {
					setTitle("")
					mutate("http://localhost:3001/todos")
					return data.message
				},
				error: error => error.message,
			})
		})
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<input
				type="text"
				value={title}
				className="border border-slate-600 bg-slate-600/20 rounded px-2 py-1"
				onChange={e => setTitle(e.target.value)}
			/>
			<button type="submit" className="bg-slate-600/20 px-2 py-1 rounded">
				Add
			</button>
		</form>
	)
}
