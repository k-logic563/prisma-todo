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

export const getUniqueTodoWithUser = async (
  id: number
): Promise<TodoWithUser | null> => {
  const todos = await prisma.todo.findUnique({
    include: {
      user: true,
    },
    where: {
      id,
    },
  })
  return todos
}

export const createTodos = async (param: Omit<Todo, 'id'>): Promise<Todo> => {
  const todos = await prisma.todo.create({
    data: param,
  })
  return todos
}

export const updateTodos = async (
  param: Omit<Todo, 'userId'>
): Promise<Todo> => {
  const todos = await prisma.todo.update({
    where: {
      id: param.id,
    },
    data: param,
  })
  return todos
}

export const deleteTodos = async (param: Pick<Todo, 'id'>): Promise<Todo> => {
  const todos = await prisma.todo.delete({
    where: {
      id: param.id,
    },
  })
  return todos
}
