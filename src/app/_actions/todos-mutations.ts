import { TodoType } from "../_lib/types"
import { addTodo } from "./add-todo"
import { deleteTodo } from "./delete-todo"
import { updateTodo } from "./update-todo"

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

export const deleteTodoMutation = async (id: number, todos: TodoType[]) => {
	await deleteTodo(id)
	return todos
		.filter((todo: TodoType) => todo.id !== id)
		.sort((a: TodoType, b: TodoType) => b.id - a.id)
}

export const deleteTodoOptions = (id: number) => {
	return {
		optimisticData: (currentData: TodoType[] = []) => {
			return currentData.filter(todo => todo.id !== id)
		},
		rollbackOnError: true,
		revalidate: false,
	}
}

export const updateTodoMutation = async (todo: TodoType, todos: TodoType[]) => {
	await updateTodo(todo)
	return todos.map((t: TodoType) =>
		t.id === todo.id ? { ...todo, completed: !todo.completed } : t
	)
}

export const updateTodoOptions = (todo: TodoType) => {
	return {
		optimisticData: (currentData: TodoType[] = []) => {
			return currentData.map(t =>
				t.id === todo.id ? { ...todo, completed: !todo.completed } : t
			)
		},
		rollbackOnError: true,
		revalidate: false,
	}
}
