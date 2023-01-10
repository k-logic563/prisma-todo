import { Suspense } from 'react'
import Head from 'next/head'
import { Container, Loader } from '@mantine/core'

import { TodoTable } from '@/feature/home/TodoTable'

export default function Home() {
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
            <TodoTable />
          </Suspense>
        </Container>
      </main>
    </>
  )
}
