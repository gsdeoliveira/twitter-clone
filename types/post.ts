import { User } from './User'

export type Post = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  user: User
  likedIds: string[]
  comments: Record<string, string>[]
}
