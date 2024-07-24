import { Layout } from '@/components/layout'
import { RegisterModal } from '@/components/modals/register-modal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
