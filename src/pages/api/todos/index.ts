import type { NextApiRequest, NextApiResponse } from 'next'

import { createTodo, getBooksWithUser } from 'prisma/functions/todos'
import { TodoWithUser, Todo } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoWithUser[] | Todo>
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      const books = await getBooksWithUser()
      res.status(200).json(books)
      break

    case 'POST':
      if (!body) return res.status(400).end('No body')
      const params = JSON.parse(body) as Omit<Todo, 'id'>
      params.userId = Number(params.userId)
      const book = await createTodo(params)
      res.status(200).json(book)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
