import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return resp.status(405).end()
  }

  try {
    const { userId } = req.query

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user id')
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    })

    return resp.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    return resp.status(400).end()
  }
}
