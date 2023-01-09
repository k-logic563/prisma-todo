import { User, Todo } from '@prisma/client'

type TodoWithUser = Todo & {
  user: User
}

type Todo = Todo
