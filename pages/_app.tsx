import { Layout } from '@/components/layout'
import { EditModal } from '@/components/modals/edit-modal'
import { LoginModal } from '@/components/modals/login-modal'
import { RegisterModal } from '@/components/modals/register-modal'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
