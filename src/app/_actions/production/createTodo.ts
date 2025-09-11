import { TodoType } from "@/app/_lib/types"
import axios from "axios"

export const createTodo = async (newTodo: Omit<TodoType, 'id'>) => {
  try {
    // Usamos axios en lugar de fetch
    const response = await axios.post('/api/todos', newTodo, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    return response.data
  } catch (error) {
    console.error('Error en createTodo:', error)
    if (axios.isAxiosError(error)) {
      // Si es un error de Axios, podemos acceder a más detalles
      console.error('Detalles del error:', error.response?.data)
      throw new Error(error.response?.data?.error || 'Error al crear el TODO')
    }
    throw new Error('Error desconocido al crear el TODO')
  }
}
