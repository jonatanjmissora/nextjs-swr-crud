import { TodoType } from "../_lib/types"
import { addTodo } from "./add-todo"

export const addTodoMutation = async (newTodo: TodoType, todos: TodoType[]) => {
	await addTodo(newTodo)
	return [...todos, newTodo].sort((a: TodoType, b: TodoType) => b.id - a.id)
}

export const addTodoOptions = (newTodo: TodoType, todos: TodoType[]) => {
	return {
		optimisticData: [...todos, newTodo].sort(
			(a: TodoType, b: TodoType) => b.id - a.id
		),
		rollbackOnError: true,
		populateCache: true,
		revalidate: false,
	}
}
