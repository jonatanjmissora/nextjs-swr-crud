// import { SWRConfig } from "swr"
import TestTodosList from "./test-todo-list"
// import { getTodos } from "../_actions/get-todos"

export default function TestTodosPage() {
	return (
		// <SWRConfig
		// 	value={{
		// 		fallback: {
		// 			"http://localhost:3001/todos": getTodos(),
		// 		},
		// 	}}
		// >
		<TestTodosList />
		// </SWRConfig>
	)
}
