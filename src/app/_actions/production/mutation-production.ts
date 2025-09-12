import useSWRMutation from "swr/mutation"
import { TodoType } from "@/app/_lib/types"
import { createTodoProduction } from "./create-todo-production"

export const useCreateTodoProduction = () => {
	return useSWRMutation(
		"json-todos",
		(_url, { arg }: { arg: TodoType }) => createTodoProduction(arg),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

// export const useUpdateTodo = () => {
// 	return useSWRMutation(
// 		API_URL!,
// 		(url, { arg }: { arg: TodoType }) => updateTodo(url, { updatedTodo: arg }),
// 		{
// 			rollbackOnError: true,
// 			revalidate: false,
// 		}
// 	)
// }

// export const useDeleteTodo = () => {
// 	return useSWRMutation(
// 		API_URL!,
// 		(url, { arg }: { arg: number }) => deleteTodo(url, { id: arg }),
// 		{
// 			rollbackOnError: true,
// 			revalidate: false,
// 		}
// 	)
// }
