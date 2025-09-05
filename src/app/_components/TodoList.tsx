"use client"
import { getTodos } from "../_actions/get-todos"
import { TodoType } from "../_lib/types"
import { TodoItem } from "./TodoItem"
import AddTodoForm from "./AddTodoForm"
import useSWR, { mutate } from "swr"

export default function TodoList() {
	return (
		<section className="mx-auto p-12 bg-slate-600/20 rounded-lg min-w-[700px] h-[700px] overflow-y-auto">
			<div className="flex justify-between items-center mb-8">
				<span className="text-2xl font-bold">Todos :</span>
				<AddTodoForm />
			</div>
			<button
				className="bg-slate-600/20 px-2 py-1 rounded"
				onClick={() => mutate("http://localhost:3001/todos")}
			>
				Refetch
			</button>
			<TodoListSuspense />
		</section>
	)
}

// const fetcher = (url: string) => fetch(url).then(res => res.json())

const TodoListSuspense = () => {
	const {
		data: todos,
		error,
		isLoading,
	} = useSWR("http://localhost:3001/todos", getTodos)

	if (isLoading) {
		return <div className="text-center pt-20">Cargando...</div>
	}

	if (error || !todos || todos.length === 0) {
		return (
			<div className="text-center pt-20">
				No se encontraron datos. Compruebe su conexion a la base de datos. Tiene
				corriendo el servidor en el puerto 3001?
			</div>
		)
	}

	return (
		<ul>
			{todos?.map((todo: TodoType) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	)
}
