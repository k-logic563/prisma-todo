import type { NextApiRequest, NextApiResponse } from 'next'

import { updateTodo, getUniqueTodoWithUser } from 'prisma/functions/todos'
import { Todo, TodoWithUser } from '@/types'

const allowMethods = ['PATCH', 'DELETE']

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
      const params = JSON.parse(body) as Todo
      const updatedBook = await updateTodo(params)
      res.status(200).json(updatedBook)
      break

    default:
      res.setHeader('Allow', allowMethods)
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
