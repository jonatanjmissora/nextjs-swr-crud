import AddTodoForm from "./AddTodoForm"
import { SWRConfig } from "swr"
import { getTodos } from "../_actions/get-todos"
import { TodoListSuspense } from "./TodoListSuspense"

export default function TodoList() {
	return (
		<section className="mx-auto p-12 bg-slate-600/20 rounded-lg min-w-[700px] h-[700px] overflow-y-auto">
			<div className="flex justify-between items-center mb-8">
				<span className="text-2xl font-bold">Todos :</span>
				<AddTodoForm />
			</div>

			<SWRConfig
				value={{
					fallback: {
						"http://localhost:3001/todos": getTodos(),
					},
				}}
			>
				<TodoListSuspense />
			</SWRConfig>
		</section>
	)
}
