import { TodoType } from "@/app/_lib/types"

export const updateTodoStatus = async (todo: TodoType): Promise<TodoType> => {
  try {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed
      }),
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el estado del TODO')
    }

    return response.json()
  } catch (error) {
    console.error('Error en updateTodoStatus:', error)
    throw error
  }
}
