"use client"
import { startTransition } from "react"
import { TodoType } from "../_lib/types"
import { toast } from "sonner"
import { useUpdateTodo } from "./mutation"

export default function TestTodoItem({ todo }: { todo: TodoType }) {
	const { trigger: updateTodo } = useUpdateTodo()

	const handleCheck = async () => {
		const updatedTodo = { ...todo, completed: !todo.completed }

		const options = {
			optimisticData: (current: TodoType[] = []) =>
				current.map(item => (item.id === updatedTodo.id ? updatedTodo : item)),
			rollbackOnError: true,
			revalidate: false,
		}

		// startTransition(async () => {
		// 	try {
		// 		await updateTodo(updatedTodo, options)
		// 		toast.success("Todo actualizado exitosamente")
		// 	} catch (error) {
		// 		console.error("Error al actualizar el todo", error)
		// 		toast.error("Error al actualizar el todo")
		// 	}
		// })
		startTransition(() => {
			toast.promise(updateTodo(updatedTodo, options), {
				loading: "actualizando todo...",
				success: "todo actualizado exitosamente",
				error: "error al actualizar todo",
			})
		})
	}

	return (
		<li className="grid grid-cols-[0.2fr_1fr_0.25fr] items-center gap-4 py-2">
			<input type="checkbox" checked={todo.completed} onChange={handleCheck} />
			{todo.title}
			<button className="bg-red-500/20 text-white px-2 py-1 rounded">
				Delete
			</button>
		</li>
	)
}
