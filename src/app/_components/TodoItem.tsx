"use client"
import { TodoType } from "../_lib/types"
import { startTransition } from "react"
import { toast } from "sonner"
import { deleteTodo } from "../_actions/delete-todo"
import { updateTodo } from "../_actions/update-todo"
import { mutate } from "swr"

export const TodoItem = ({ todo }: { todo: TodoType }) => {
	const handleDelete = async () => {
		startTransition(async () => {
			toast.promise(deleteTodo(todo.id), {
				loading: "borrando todo...",
				success: data => {
					mutate("http://localhost:3001/todos")
					return data.message
				},
				error: error => error.message,
			})
		})
	}

	const handleUpdate = async () => {
		startTransition(async () => {
			toast.promise(updateTodo(todo), {
				loading: "actualizando todo...",
				success: data => {
					mutate("http://localhost:3001/todos")
					return data.message
				},
				error: error => error.message,
			})
		})
	}

	return (
		<li
			key={todo.id}
			className="grid grid-cols-[0.3fr_0.1fr_1fr_0.25fr] items-center gap-4 py-2"
		>
			<span>id: ...{todo.id.toString().slice(7, 13)}</span>
			<input
				type="checkbox"
				checked={todo.completed}
				className="size-6"
				onChange={handleUpdate}
			/>
			<span className="truncate">{todo.title}</span>
			<button
				onClick={handleDelete}
				className="bg-red-500/20 text-white px-2 py-1 rounded"
			>
				Delete
			</button>
		</li>
	)
}
