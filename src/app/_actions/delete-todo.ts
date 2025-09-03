"use server"

import { revalidatePath } from "next/cache"

export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Delete error:', errorText)
      return { 
        success: false, 
        message: 'An error occurred while deleting the todo'
      }
    }

    revalidatePath("/")
    return { success: true, message: `Todo ${id} deleted successfully` }
  } catch (error) {
    console.error('Delete error:', error)
    return { 
      success: false, 
      message: 'An error occurred while deleting the todo' 
    }
  }
}
