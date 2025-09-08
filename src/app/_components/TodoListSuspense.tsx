"use client"
import { TodoItem } from "./TodoItem"
import { TodoType } from "../_lib/types"
import { useTodosQuery } from "../_lib/todos-query"
import { mutate } from "swr"

export const TodoListSuspense = () => {
	const { todos, error, isValidating } = useTodosQuery()

	// if (isLoading) {
	// 	return <div className="text-center pt-20">Cargando...</div>
	// }

	if (error) {
		return (
			<div className="text-center pt-20">
				No se encontraron datos. Compruebe su conexion a la base de datos. Tiene
				corriendo el servidor en el puerto 3001?
			</div>
		)
	}

	return (
		<section>
			<div className="flex gap-6 items-center">
				<button
					className="bg-slate-600/20 px-2 py-1 rounded"
					onClick={() => mutate("http://localhost:3001/todos")}
				>
					Refetch
				</button>
				{isValidating && (
					<div className="size-4 bg-slate-500 rounded-full animate-pulse">
						{""}
					</div>
				)}
			</div>
			<ul>
				{todos?.map((todo: TodoType) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>
		</section>
	)
}
