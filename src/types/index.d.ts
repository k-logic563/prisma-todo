import { User, Todo } from '@prisma/client'

type TodoWithUser = Todo & {
  user: User
}

type FormValues = {
  title: string
  isCompleted?: boolean
}

type Todo = Todo
