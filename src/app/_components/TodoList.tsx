"use client"

import { useTodosProduction } from "../_lib/todos-query-production"
import { TodoType } from "../_lib/types"
import { startTransition, useState } from "react"
import { toast } from "sonner"
import TodoItem from "./TodoItem"
import { useCreateTodoProduction } from "../_actions/production/mutation-production"

export default function TodosList() {
	const [title, setTitle] = useState("")
	// const { data: todos, error, isLoading, isValidating } = useTodos()
	// const { trigger: createTodoMutation, isMutating } = useCreateTodo()
	const { data: todos, error, isLoading, isValidating } = useTodosProduction()
	const { trigger: createTodoProduction, isMutating } =
		useCreateTodoProduction()

	const handleCreateTodo = async () => {
		const newTodo = {
			userId: 1,
			id: Date.now(),
			title,
			completed: false,
		}

		const options = {
			optimisticData: (data: TodoType[] | undefined) => [
				{ ...newTodo, title: `${newTodo.title} *` },
				...(data || []),
			],
		}

		startTransition(async () => {
			toast.promise(createTodoProduction(newTodo, options), {
				loading: "creando todo...",
				success: "todo creado exitosamente",
				error: "error al crear todo",
			})

			setTitle("")
		})

		// const sonnerLoading = toast.loading("creando todo...")

		// try {
		// 	await createTodoMutation(newTodo, {
		// 		optimisticData: data =>
		// 			data && [
		// 				{ ...newTodo, title: `${newTodo.title} (optimistic)` },
		// 				...data,
		// 			],
		// 	})
		// 	setTitle("")
		// 	toast.success("Todo creado exitosamente", { id: sonnerLoading })
		// } catch (error) {
		// 	console.error("Error creating todo:", error)
		// 	toast.error("Error creating todo", { id: sonnerLoading })
		// }
	}

	return (
		<div className="w-full h-full flex flex-col justify-start items-center">
			<div className="w-[700px] mx-auto flex gap-4 items-center p-4">
				<input
					className="border border-slate-600 bg-slate-600/20 rounded px-2 py-1"
					placeholder="Agregar todo"
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
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
					{todos?.map((todo: TodoType) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			)}
		</div>
	)
}
