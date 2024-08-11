import { Comment, Post, User } from '@prisma/client'

export type CommentWithRelations = Comment & {
  user: User
}

export type PostWithRelations = Post & {
  user: User
  comments: CommentWithRelations[]
}
