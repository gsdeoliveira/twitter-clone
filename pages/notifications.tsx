import { Header } from '@/components/header'
import NotificationsFeed from '@/components/notifications-feed'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default function Notifications() {
  return (
    <>
    <Header label='Notifications' showBackArrow />
    <NotificationsFeed />
    </>
  )
}