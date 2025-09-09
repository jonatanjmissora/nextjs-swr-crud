import useSWRMutation from "swr/mutation"
import { createTodo } from "./createTodo"
import { TodoType } from "../../_lib/types"
import { updateTodo } from "./updateTodo"
import { deleteTodo } from "./deleteTodo"

export const useCreateTodo = () => {
	return useSWRMutation(
		"http://localhost:3001/todos",
		(url, { arg }: { arg: TodoType }) => createTodo(url, { newTodo: arg }),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

export const useUpdateTodo = () => {
	return useSWRMutation(
		"http://localhost:3001/todos",
		(url, { arg }: { arg: TodoType }) => updateTodo(url, { updatedTodo: arg }),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

export const useDeleteTodo = () => {
	return useSWRMutation(
		"http://localhost:3001/todos",
		(url, { arg }: { arg: number }) => deleteTodo(url, { id: arg }),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}
