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
	const { todos, isLoading, isValidating, error, isError } =
		useTodosProduction()
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
			) : isError ? (
				<ErrorElement error={error} />
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

const ErrorElement = ({ error }: { error: Error }) => {
	return (
		<div className="w-[700px] mx-auto p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
			<div className="flex items-center">
				<svg
					className="w-6 h-6 mr-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Error de conexión</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<div>
					<p className="font-bold">Error de conexión</p>
					<p>
						No se pudo conectar con el servidor. Por favor, verifica que la API
						esté en ejecución.
					</p>
					{error?.message && (
						<p className="text-sm mt-1">Detalles: {error.message}</p>
					)}
				</div>
			</div>
		</div>
	)
}
