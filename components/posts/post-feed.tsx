import { usePosts } from '@/hooks/usePosts'
import { PostItem } from './post-item'

interface PostFeedProps {
  userId?: string
}

export const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId)
  return (
    <>
      {posts.map((post: Record<string, string>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  )
}
