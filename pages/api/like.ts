import { serverAuth } from '@/libs/server-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end()
  }

  try {
    const { postId } = req.body
    const { currentUser } = await serverAuth(req, res)

    if (!postId || typeof postId !== 'string') {
      throw new Error('postId is required')
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    let updatedLikedIds = [...(post.likedIds || [])]

    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id)

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        })

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              userId: post.userId,
              body: `${currentUser.name} liked your post`,
            },
          })

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter((id) => id !== currentUser.id)
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    })

    res.status(200).json(updatedPost)
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}
