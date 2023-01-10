import React from 'react'
import { Title } from '@mantine/core'
import { AppShell, Navbar, Header, NavLink } from '@mantine/core'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      padding="md"
      navbar={
        <Navbar width={{ base: 240 }} p="md">
          <Navbar.Section>
            <Link href="/">
              <NavLink label="Home" />
            </Link>
            <Link href="/register">
              <NavLink label="Register" />
            </Link>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Title order={1}>Prisma Todo</Title>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}
