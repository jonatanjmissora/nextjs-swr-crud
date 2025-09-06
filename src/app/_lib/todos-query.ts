import useSWR from "swr"
import { TodoType } from "./types"
import { getTodos } from "../_actions/get-todos"

export const useTodosQuery = () => {
	const {
		data: todos,
		error,
		isValidating,
		mutate,
	} = useSWR("http://localhost:3001/todos", getTodos, {
		onSuccess: (data: TodoType[]) =>
			data.sort((a: TodoType, b: TodoType) => b.id - a.id),
		refreshInterval: 15000,
		revalidateOnMount: false,
		revalidateOnFocus: false,
	})

	return {
		todos,
		error,
		isValidating,
		mutate,
	}
}
