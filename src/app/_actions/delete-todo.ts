"use server"

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
        message: errorText || 'Failed to delete todo' 
      }
    }

    return await response.json()
  } catch (error) {
    console.error('Delete error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An error occurred while deleting the todo' 
    }
  }
}
