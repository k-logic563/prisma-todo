import Link from 'next/link'
import { Table, ActionIcon, Flex, Text } from '@mantine/core'
import { IconPencil, IconTrashX } from '@tabler/icons'

import { useTodos } from '@/hooks/useTodos'

type Props = {
  openModal: (title: string, id: number) => void
}

export const TodoTable = ({ openModal }: Props) => {
  const { todos, error } = useTodos()

  if (error) throw new Error()

  return todos?.length !== 0 ? (
    <Table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>作成者</th>
          <th>ステータス</th>
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
                <ActionIcon
                  variant="filled"
                  color="red"
                  onClick={() => openModal(todo.title, todo.id)}
                >
                  <IconTrashX size={16} />
                </ActionIcon>
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <Text align="center">TODOがありません。</Text>
  )
}
