import { Todo } from '@prisma/client'

export const createTodo = async (param: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(param),
  })
  return (await response.json()) as Todo
}
