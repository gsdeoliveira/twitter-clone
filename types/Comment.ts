import { Post } from './Post'
import { User } from './User'

export type Comment = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  user: User
  post: Post
}
