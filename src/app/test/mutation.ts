import useSWRMutation from "swr/mutation"
import { createTodo } from "./createTodo"
import { TodoType } from "../_lib/types"

export const useCreateTodo = () => {
	return useSWRMutation(
		"http://localhost:3001/todos",
		(url, { arg }: { arg: TodoType }) => createTodo(url, { newTodo: arg }),
		{
			onError: () => {
				console.log("error")
			},
			rollbackOnError: true,
			revalidate: false,
		}
	)
}
