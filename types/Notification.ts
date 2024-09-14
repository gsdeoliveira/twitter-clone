import { User } from './User'

export type Notification = {
  id: string
  body: string
  createdAt: string
  user: User
}
