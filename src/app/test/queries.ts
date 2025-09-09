import useSWR from "swr"
import { getTodos } from "../_actions/get-todos"
import { TodoType } from "../_lib/types"

export const useTodos = () => {
	return useSWR<TodoType[]>("http://localhost:3001/todos", getTodos, {
		revalidateOnFocus: false,
		revalidateOnMount: false,
		refreshInterval: 60000,
	})
}
