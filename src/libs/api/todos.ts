import { Todo } from '@/types'

export const createTodo = async (param: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(param),
  })
  return (await response.json()) as Todo
}

export const updateBook = async (param: Todo): Promise<Todo> => {
  try {
    const response = await fetch(`/api/todos/${param.id}`, {
      method: 'PATCH',
      body: JSON.stringify(param),
    })
    if (response.status !== 200) {
      throw new Error(response.statusText)
    }
    return (await response.json()) as Todo
  } catch (error) {
    throw error
  }
}
