import { Post } from './post'
import { User } from './User'

export type Comment = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  user: User
  post: Post
}
