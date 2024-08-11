import { CommentItem } from './comment-item'
import { CommentWithRelations } from '@/types'

interface CommentFeedProps {
  comments?: CommentWithRelations[]
}

export const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  )
}
