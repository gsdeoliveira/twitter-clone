import { usePosts } from '@/hooks/usePosts'
import { PostItem } from './post-item'
import { Post } from '@prisma/client';

interface PostFeedProps {
  userId?: string
}

export const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId)
  return (
    <>
      {posts.map((post: Post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  )
}
