import { usePosts } from '@/hooks/usePosts'
import { PostItem } from './post-item'
import { PostWithRelations } from '@/types'

interface PostFeedProps {
  userId?: string
}

export const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId)
  return (
    <>
      {posts.map((post: PostWithRelations) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
  )
}
