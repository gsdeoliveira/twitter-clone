import { Layout } from '@/components/layout'
import { Modal } from '@/components/modal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal isOpen title="Test Modal" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
