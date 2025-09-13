const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  TODOS: `${API_URL}/api/todos`,
  TODO_BY_ID: (id: number) => `${API_URL}/api/todos/${id}`,
};
