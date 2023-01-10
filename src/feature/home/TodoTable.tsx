import Link from 'next/link'
import { Table, ActionIcon, Flex } from '@mantine/core'
import { IconPencil, IconTrashX } from '@tabler/icons'

import { useTodos } from '@/hooks/useTodos'

export const TodoTable = () => {
  const { todos, error } = useTodos()

  if (error) throw new Error()

  return (
    <Table>
      <thead>
        <tr>
          <th>title</th>
          <th>creator</th>
          <th>status</th>
          <th style={{ width: '6em' }}>&ensp;</th>
        </tr>
      </thead>
      <tbody>
        {todos?.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.user.name}</td>
            <td>{todo.isCompleted ? '完了' : '未着手'}</td>
            <td>
              <Flex gap="sm">
                <Link href={`/edit/${todo.id}`}>
                  <ActionIcon variant="filled" color="blue">
                    <IconPencil size={16} />
                  </ActionIcon>
                </Link>
                <ActionIcon variant="filled" color="red">
                  <IconTrashX size={16} />
                </ActionIcon>
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
