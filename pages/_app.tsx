import { Layout } from '@/components/layout'
import { LoginModal } from '@/components/modals/login-modal'
import { RegisterModal } from '@/components/modals/register-modal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <RegisterModal />
    <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
