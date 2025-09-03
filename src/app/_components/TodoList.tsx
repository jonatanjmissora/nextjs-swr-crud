import { Suspense } from "react"
import { getTodos } from "../_actions/get-todos"
import { TodoType } from "../_lib/types"
import { TodoItem } from "./TodoItem"

export default function TodoList() {
	return (
		<section className="mx-auto p-12 bg-slate-600/20 rounded-lg w-[700px] h-[700px] overflow-y-scroll">
			<h1 className="text-2xl font-bold mb-4">Todos :</h1>
			<Suspense
				fallback={
					<div className="text-2xl font-bold w-full h-full flex pt-20 justify-center">
						Loading...
					</div>
				}
			>
				<TodoListSuspense />
			</Suspense>
		</section>
	)
}

const TodoListSuspense = async () => {
	const {success, data: todos} = (await getTodos()) as {success: boolean, data: TodoType[]}

	if (!success) {
		return <div>No se encontraron datos. Compruebe su conexion a la base de datos. Tiene corriendo el servidor en el puerto 3001?</div>
	}

	return (
		<ul>
			{todos.map(todo => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	)
}
