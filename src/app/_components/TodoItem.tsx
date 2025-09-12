"use client"
import { startTransition } from "react"
import { TodoType } from "../_lib/types"
import { toast } from "sonner"
import { useDeleteTodo, useUpdateTodo } from "../_actions/mutation"

export default function TodoItem({ todo }: { todo: TodoType }) {
	const { trigger: updateTodo, isMutating } = useUpdateTodo()
	const { trigger: deleteTodo, isMutating: isDeleting } = useDeleteTodo()

	const handleCheck = async () => {
		const updatedTodo = { ...todo, completed: !todo.completed }
		const options = {
			optimisticData: (current: TodoType[] = []) =>
				current.map(item => (item.id === updatedTodo.id ? updatedTodo : item)),
			rollbackOnError: true,
			revalidate: false,
		}
		startTransition(() => {
			toast.promise(updateTodo(updatedTodo, options), {
				loading: "actualizando todo...",
				success: "todo actualizado exitosamente",
				error: "error al actualizar todo",
			})
		})
	}

	const handleDelete = async () => {
		const options = {
			optimisticData: (current: TodoType[] = []) =>
				current.filter(item => item.id !== todo.id),
			rollbackOnError: true,
			revalidate: false,
		}
		startTransition(() => {
			toast.promise(deleteTodo(todo.id, options), {
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
				disabled={isMutating}
			/>
			{todo.title}
			<button
				className={`bg-red-500/20 text-white px-2 py-1 rounded ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`}
				disabled={isDeleting}
				onClick={handleDelete}
			>
				Delete
			</button>
		</li>
	)
}
