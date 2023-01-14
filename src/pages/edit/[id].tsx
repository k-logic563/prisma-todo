import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { TextInput, Group, Button, Container, Switch } from '@mantine/core'
import { useForm } from '@mantine/form'

import { updateTodo } from '@/libs/api/todos'

import { FormValues, Todo } from '@/types'

export default function Edit() {
  const { push, query } = useRouter()
  const form = useForm({
    initialValues: {
      title: '',
      isCompleted: false,
    },
    validate: {
      title: (val) => (val.trim() ? null : 'Required'),
    },
  })

  const handleSubmit = async (values: Required<FormValues>) => {
    try {
      const payloads = {
        ...values,
        id: Number(query.id),
      }
      await updateTodo(payloads)
      await push('/')
    } catch (e) {
      alert(e)
    }
  }

  const fetchData = async () => {
    if (!query.id) return

    try {
      const response = await fetch(`/api/todos/${query.id}`)

      if (response.status !== 200) {
        throw new Error(response.statusText)
      }

      const data = (await response.json()) as Todo
      form.setFieldValue('title', data.title)
      form.setFieldValue('isCompleted', data.isCompleted)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchData()
  }, [query])

  return (
    <>
      <Head>
        <title>Edit | Todo App</title>
        <meta name="description" content="Todo edit page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container size="sm">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="タイトル"
              {...form.getInputProps('title')}
            />
            <Switch
              mt="md"
              size="lg"
              offLabel="未完了"
              onLabel="完了"
              checked={form.values.isCompleted}
              {...form.getInputProps('isCompleted')}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Container>
      </main>
    </>
  )
}
