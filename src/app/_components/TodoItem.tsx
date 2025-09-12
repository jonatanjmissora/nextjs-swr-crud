"use client"
import { startTransition } from "react"
import { TodoType } from "../_lib/types"
import { toast } from "sonner"
import {
	useDeleteTodoProduction,
	useUpdateTodoProduction,
} from "../_actions/production/mutation-production"
// import { useDeleteTodo, useUpdateTodo } from "../_actions/mutation"

export default function TodoItem({ todo }: { todo: TodoType }) {
	// const { trigger: updateTodo, isMutating } = useUpdateTodo()
	// const { trigger: deleteTodo, isMutating: isDeleting } = useDeleteTodo()
	const { trigger: updateTodoProduction, isMutating } =
		useUpdateTodoProduction()
	const { trigger: deleteTodoProduction, isMutating: isDeleting } =
		useDeleteTodoProduction()

	const handleCheck = async () => {
		const updatedTodo = { ...todo, completed: !todo.completed }
		const options = {
			optimisticData: (data: TodoType[] | undefined) =>
				(data || []).map(item =>
					item.id === updatedTodo.id
						? { ...updatedTodo, title: `${updatedTodo.title} *` }
						: item
				),

			// optimisticData: (data: TodoType[] | undefined) => [
			// 	{ ...newTodo, title: `${newTodo.title} *` },
			// 	...(data || []),
			// ],
		}
		startTransition(() => {
			toast.promise(updateTodoProduction(updatedTodo, options), {
				loading: "actualizando todo...",
				success: "todo actualizado exitosamente",
				error: "error al actualizar todo",
			})
		})
	}

	const handleDelete = async () => {
		const options = {
			optimisticData: (data: TodoType[] = []) =>
				data.filter(item => item.id !== todo.id),
		}
		startTransition(() => {
			toast.promise(deleteTodoProduction(todo.id, options), {
				loading: "borrando todo...",
				success: "todo borrado exitosamente",
				error: "error al borrar todo",
			})
		})
	}

	return (
		<li className="grid grid-cols-[0.2fr_1fr_0.25fr] items-center gap-4 py-2">
			<input
				type="checkbox"
				className={`size-5 ${isMutating ? "cursor-not-allowed" : "cursor-pointer"}`}
				checked={todo.completed}
				onChange={handleCheck}
				// disabled={isMutating}
			/>
			{todo.title}
			<button
				className={`bg-red-500/20 text-white px-2 py-1 rounded ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
				// disabled={isDeleting}
				onClick={handleDelete}
			>
				Delete
			</button>
		</li>
	)
}
