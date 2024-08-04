export type post = {
  body: string
  comments: Record<string, string>[]
  createdAt: string
  id: string
  likedIds: string[]
  updatedAt: string
  user: string
}
