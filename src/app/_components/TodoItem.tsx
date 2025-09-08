"use client"
import { TodoType } from "../_lib/types"
import { toast } from "sonner"
import { updateTodo } from "../_actions/update-todo"
import { mutate } from "swr"
import {
	deleteTodoMutation,
	deleteTodoOptions,
	updateTodoMutation,
	updateTodoOptions,
} from "../_actions/todos-mutations"
import { useTodosQuery } from "../_lib/todos-query"

export const TodoItem = ({ todo }: { todo: TodoType }) => {
	const { todos } = useTodosQuery()
	const handleDelete = async () => {
		try {
			const options = deleteTodoOptions(todo.id)

			// Primero mostramos un toast de carga
			const loadingToast = toast.loading("eliminando tarea...")

			await mutate(
				"http://localhost:3001/todos",
				async () => {
					try {
						const result = await deleteTodoMutation(todo.id, todos || [])
						toast.success(`tarea eliminada correctamente`, { id: loadingToast })
						return result
					} catch (error) {
						toast.error(`error al eliminar la tarea`, { id: loadingToast })
						throw error // Importante: relanzar el error para que SWR haga el rollback
					}
				},
				options
			)
		} catch (error) {
			// Este bloque solo se ejecutará si hay un error en el proceso de mutación
			console.error("Error inesperado:", error)
		}
		// startTransition(async () => {
		// 	toast.promise(deleteTodo(todo.id), {
		// 		loading: "borrando todo...",
		// 		success: data => {
		// 			mutate("http://localhost:3001/todos")
		// 			return data.message
		// 		},
		// 		error: error => error.message,
		// 	})
		// })
	}

	const handleUpdate = async () => {
		try {
			const options = updateTodoOptions(todo)

			// Primero mostramos un toast de carga
			const loadingToast = toast.loading("actualizando tarea...")

			await mutate(
				"http://localhost:3001/todos",
				async () => {
					try {
						const result = await updateTodoMutation(todo, todos || [])
						toast.success(`tarea actualizada correctamente`, {
							id: loadingToast,
						})
						return result
					} catch (error) {
						toast.error(`error al actualizar la tarea`, { id: loadingToast })
						throw error // Importante: relanzar el error para que SWR haga el rollback
					}
				},
				options
			)
		} catch (error) {
			// Este bloque solo se ejecutará si hay un error en el proceso de mutación
			console.error("Error inesperado:", error)
		}
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
