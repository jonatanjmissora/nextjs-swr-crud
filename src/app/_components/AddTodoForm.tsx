"use client"

import { startTransition, useState } from "react"
import { toast } from "sonner"
import { useTodosQuery } from "../_lib/todos-query"
import { SubmitBtn } from "./SubmitBtn"
import { addTodoMutation, addTodoOptions } from "../_actions/todos-mutations"
import { TodoType } from "../_lib/types"

export default function AddTodoForm() {
	const [title, setTitle] = useState("")
	const { todos, isValidating, mutate } = useTodosQuery()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const newTodo: TodoType = {
			userId: 1,
			id: Date.now(),
			title,
			completed: false,
		}
		try {
			await mutate(
				addTodoMutation(newTodo, todos),
				addTodoOptions(newTodo, todos)
			)
			toast.success(`agregamos el todo ${newTodo.id}`)
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message)
			}
		}
		// startTransition(async () => {
		// 	toast.promise(
		// 		mutate(addTodoMutation(newTodo, todos), addTodoOptions(newTodo, todos)),
		// 		{
		// 			loading: "creando todo...",
		// 			success: `todo ${newTodo.id} creado exitosamente`,
		// 			error: `error al crear todo ${newTodo.id}`,
		// 		}
		// 	)
		// })
		setTitle("")
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<input
				type="text"
				value={title}
				className="border border-slate-600 bg-slate-600/20 rounded px-2 py-1"
				onChange={e => setTitle(e.target.value)}
			/>
			<SubmitBtn disabled={title.trim() === "" || isValidating} />
		</form>
	)
}
