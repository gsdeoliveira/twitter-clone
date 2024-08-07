import { Comment, Post, User } from '@prisma/client'

export type PostWithRelations = Post & {
  user: User
  comments: Comment[]
}
