import { TodoType } from "../_lib/types"
import { addTodo } from "./add-todo"
import { deleteTodo } from "./delete-todo"

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
	// No manejamos el error aquí, lo dejamos que se propague para que SWR lo maneje
	// y pueda hacer el rollback automático
	await deleteTodo(id)
	// Si llegamos aquí, la eliminación fue exitosa
	return todos
		.filter((todo: TodoType) => todo.id !== id)
		.sort((a: TodoType, b: TodoType) => b.id - a.id)
}

export const deleteTodoOptions = (id: number) => {
  return {
    optimisticData: (currentData: TodoType[] = []) => {
      // Solo eliminamos el todo específico
      return currentData.filter(todo => todo.id !== id);
    },
    rollbackOnError: true,
    revalidate: false,
    // No necesitamos populateCache personalizado, SWR manejará el rollback automáticamente
  };
};
