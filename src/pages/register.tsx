import Head from 'next/head'
import { useRouter } from 'next/router'
import { TextInput, Group, Button, Container } from '@mantine/core'
import { useForm } from '@mantine/form'

import { createTodo } from '@/libs/api/todos'

import { FormValues } from '@/types'

export default function Register() {
  const { push } = useRouter()
  const form = useForm({
    initialValues: {
      title: '',
    },
    validate: {
      title: (val) => (val.trim() ? null : 'Required'),
    },
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      const payloads = {
        ...values,
        isCompleted: false,
        userId: 1,
      }
      await createTodo(payloads)
      await push('/')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <Head>
        <title>Register | Todo App</title>
        <meta name="description" content="Todo register page." />
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
            <Group position="right" mt="md">
              <Button type="submit">登録</Button>
            </Group>
          </form>
        </Container>
      </main>
    </>
  )
}
