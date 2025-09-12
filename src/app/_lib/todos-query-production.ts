import useSWR from "swr"
import { TodoType } from "./types"
import { getTodosApiRoute } from "../_actions/production/get-todos-api-route"

export const useTodosProduction = () => {
	return useSWR<TodoType[]>("json-todos", getTodosApiRoute, {
		revalidateOnFocus: false,
		// revalidateOnMount: false,
		refreshInterval: 10000,
	})
}
