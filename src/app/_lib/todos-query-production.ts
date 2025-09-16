import useSWR from "swr"
import { TodoType } from "./types"
import { getTodosApiRoute } from "../_actions/production/get-todos-api-route"

export const useTodosProduction = () => {
	const { data, error, isLoading, isValidating } = useSWR<TodoType[]>(
		"json-todos",
		getTodosApiRoute,
		{
			revalidateOnFocus: false,
			// revalidateOnMount: false,
			refreshInterval: 10000,
			onErrorRetry: (_error, _key, _config, revalidate, { retryCount }) => {
				// Only retry up to 3 times
				if (retryCount >= 3) return
				// Retry after 5 seconds
				setTimeout(() => revalidate({ retryCount }), 5000)
			},
		}
	)

	return {
		todos: data || [],
		isLoading,
		isValidating,
		error,
		isError: !!error,
	}
}
