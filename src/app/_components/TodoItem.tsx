"use client"
import { deleteTodo } from "../_actions/delete-todo"
import { TodoType } from "../_lib/types"
import { startTransition, useState } from "react"
import { toast } from "sonner"

export const TodoItem = ({ todo }: { todo: TodoType }) => {
	const [completed, setCompleted] = useState(todo.completed)

	const handleDelete = async () => {
		startTransition(async () => {
			toast.promise(deleteTodo(todo.id), {
				loading: "borrando todo...",
				success: "todo borrado exitosamente",
				error: "Error al borrar todo",
			})
		})
	}

	return (
		<li
			key={todo.id}
			className="grid grid-cols-[0.2fr_0.1fr_1fr_0.25fr] gap-4 py-2"
		>
			<span>id: {todo.id}</span>
			<input
				type="checkbox"
				defaultChecked={todo.completed}
				onChange={() => setCompleted(!completed)}
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
