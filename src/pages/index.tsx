import { Suspense, useState } from 'react'
import Head from 'next/head'
import { Container, Loader, Modal, Text, Button, Flex } from '@mantine/core'

import { deleteTodo } from '@/libs/api/todos'

import { TodoTable } from '@/feature/home/TodoTable'
import { useTodos } from '@/hooks/useTodos'

export default function Home() {
  const [title, setTitle] = useState('')
  const [id, setId] = useState(0)
  const [opened, setOpened] = useState(false)
  const { refetch } = useTodos()

  const openModal = (title: string, id: number) => {
    setTitle(title)
    setId(id)
    setOpened(true)
  }

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo({ id })
      refetch()
    } catch (e) {
      throw e
    }
    setOpened(false)
  }

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo with Prisma and PlanetScale" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container size="md">
          <Suspense fallback={<Loader />}>
            <TodoTable openModal={openModal} />
          </Suspense>
        </Container>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="TODOの削除"
          centered
        >
          <Text mb={20} align="center">
            「{title}」を削除しますか？
          </Text>
          <Flex gap={4} justify="center">
            <Button
              variant="light"
              color="gray"
              onClick={() => setOpened(false)}
            >
              キャンセル
            </Button>
            <Button color="red" onClick={handleDeleteTodo}>
              削除
            </Button>
          </Flex>
        </Modal>
      </main>
    </>
  )
}
