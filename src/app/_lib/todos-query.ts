import useSWR from "swr"
import { getTodos } from "../_actions/get-todos"
import { TodoType } from "../_lib/types"

const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL

export const useTodos = () => {
	return useSWR<TodoType[]>(API_URL, getTodos, {
		revalidateOnFocus: false,
		// revalidateOnMount: false,
		refreshInterval: 10000,
	})
}
