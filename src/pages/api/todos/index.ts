import type { NextApiRequest, NextApiResponse } from 'next'

import { createTodos, getTodosWithUser } from 'prisma/functions/todos'
import { TodoWithUser, Todo } from '@/types'

const allowMethods = ['GET', 'POST']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoWithUser[] | Todo>
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      const todos = await getTodosWithUser()
      res.status(200).json(todos)
      break

    case 'POST':
      if (!body) return res.status(400).end('No body')
      const params = JSON.parse(body) as Omit<Todo, 'id'>
      params.userId = Number(params.userId)
      const todo = await createTodos(params)
      res.status(200).json(todo)
      break

    default:
      res.setHeader('Allow', allowMethods)
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
