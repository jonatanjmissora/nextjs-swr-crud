import useSWR from "swr"
import { TodoType } from "../_lib/types"
import { getTodos } from "../_actions/get-todos"

const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL

export const useTodos = () => {
	return useSWR<TodoType[]>(API_URL, getTodos, {
		revalidateOnFocus: false,
		// revalidateOnMount: false,
		refreshInterval: 10000,
	})
}
