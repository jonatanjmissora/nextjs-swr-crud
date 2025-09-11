import useSWR from "swr"
import { getTodos } from "../_actions/get-todos"
import { TodoType } from "../_lib/types"
import { getTodosApiRoute } from "../_actions/get-todos-api-route"

const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL

const getTodosFn = getTodosApiRoute

export const useTodos = () => {
	return useSWR<TodoType[]>(API_URL, getTodosFn, {
		revalidateOnFocus: false,
		// revalidateOnMount: false,
		refreshInterval: 10000,
	})
}
