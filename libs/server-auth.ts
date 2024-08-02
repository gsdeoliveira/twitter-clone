import { NextApiRequest, NextApiResponse } from 'next'

import prisma from './prismadb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    throw new Error('Not signed in')
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!currentUser) {
    throw new Error('User not found')
  }

  return { currentUser }
}
