import { prisma } from '@/libs/prisma'

import { TodoWithUser, Todo } from '@/types'

export const getTodosWithUser = async (): Promise<TodoWithUser[]> => {
  const todos = await prisma.todo.findMany({
    include: {
      user: true,
    },
  })
  return todos
}

export const createTodo = async (param: Omit<Todo, 'id'>): Promise<Todo> => {
  const todos = await prisma.todo.create({
    data: param,
  })
  return todos
}
