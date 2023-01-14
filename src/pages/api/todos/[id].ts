import type { NextApiRequest, NextApiResponse } from 'next'

import {
  updateTodos,
  getUniqueTodoWithUser,
  deleteTodos,
} from 'prisma/functions/todos'
import { Todo, TodoWithUser } from '@/types'

const allowMethods = ['GET', 'PATCH', 'DELETE']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoWithUser[] | Todo | null>
) {
  const {
    method = '',
    query: { id },
    body,
  } = req

  switch (method) {
    case 'GET':
      const uniqueTodo = await getUniqueTodoWithUser(Number(id))
      res.status(200).json(uniqueTodo)
      break

    case 'PATCH':
      if (!body) return res.status(400).end('No body')
      const params = JSON.parse(body) as Omit<Todo, 'userId'>
      const updateTodo = await updateTodos(params)
      res.status(200).json(updateTodo)
      break

    case 'DELETE':
      const deleteTodo = await deleteTodos({
        id: Number(id),
      })
      res.status(200).json(deleteTodo)
      break

    default:
      res.setHeader('Allow', allowMethods)
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
