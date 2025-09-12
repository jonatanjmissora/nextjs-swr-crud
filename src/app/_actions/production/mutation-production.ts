import useSWRMutation from "swr/mutation"
import { TodoType } from "@/app/_lib/types"
import { createTodoProduction } from "./create-todo-production"
import { updateTodoProduction } from "./update-todo-production"
import { deleteTodoProduction } from "./delete-todo-production"

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

export const useUpdateTodoProduction = () => {
	return useSWRMutation(
		"json-todos",
		(_url, { arg }: { arg: TodoType }) => updateTodoProduction(arg),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}

export const useDeleteTodoProduction = () => {
	return useSWRMutation(
		"http://localhost:3000/api/todos",
		(_url, { arg }: { arg: number }) => deleteTodoProduction(arg),
		{
			rollbackOnError: true,
			revalidate: false,
		}
	)
}
