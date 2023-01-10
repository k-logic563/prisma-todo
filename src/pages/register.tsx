import Head from 'next/head'
import { TextInput, Group, Button, Container } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Register() {
  // userIdは一旦固定で
  const form = useForm({
    initialValues: {
      title: '',
    },
    validate: {
      title: (val) => (val.trim() ? null : 'Required'),
    },
  })

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
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Todo"
              {...form.getInputProps('title')}
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
