import { Form } from '@/components/form'
import { Header } from '@/components/header'
import { CommentFeed } from '@/components/posts/comment-feed'
import { PostItem } from '@/components/posts/post-item'
import { usePost } from '@/hooks/usePost'
import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'

export default function PostView() {
  const router = useRouter()
  const { postId } = router.query

  const { data: fetchedPost, isLoading } = usePost(postId as string)

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }
  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem post={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}
