import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'

import { Layout } from '@/components/Layouts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: () => ({
          a: {
            textDecoration: 'none',
          },
        }),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  )
}
