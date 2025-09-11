import useSWRMutation from "swr/mutation"
import { createTodo } from "./createTodo"
import { TodoType } from "../_lib/types"
import { updateTodo } from "./updateTodo"
import { deleteTodo } from "./deleteTodo"

const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL

export const useCreateTodo = () => {
	return useSWRMutation(
		API_URL!,
		(url, { arg }: { arg: TodoType }) => createTodo(url, { newTodo: arg }),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

export const useUpdateTodo = () => {
	return useSWRMutation(
		API_URL!,
		(url, { arg }: { arg: TodoType }) => updateTodo(url, { updatedTodo: arg }),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

export const useDeleteTodo = () => {
	return useSWRMutation(
		API_URL!,
		(url, { arg }: { arg: number }) => deleteTodo(url, { id: arg }),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}
