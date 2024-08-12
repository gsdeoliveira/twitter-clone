import { serverAuth } from '@/libs/server-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  try {
    const { currentUser } = await serverAuth(req, res)
    const { body } = req.body
    const { postId } = req.query

    if (!postId || typeof postId !== 'string') {
      throw new Error('postId is required')
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    })

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        }
      })

      if(post?.userId) {
        await prisma.notification.create({
          data: {
            userId: post.userId,
            body: `${currentUser.name} replied your post`,
          }
        })

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true
          }
        })
      }
    } catch (error) {
      console.error(error)
      
    }

    return res.status(200).json(comment)
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}
