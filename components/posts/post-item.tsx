import { useLoginModal } from '@/hooks/useLoginModal'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { Avatar } from '../avatar'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { PostWithRelations } from '@/types'

interface PostItemProps {
  post: PostWithRelations
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const goToUser = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      router.push(`/users/${post.user.id}`)
    },
    [router, post.user.id],
  )

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id}`)
  }, [router, post.id])

  const onLike = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      loginModal.onOpen()
    },
    [loginModal],
  )

  const createdAt = useMemo(() => {
    if (!post.createdAt) {
      return null
    }

    return formatDistanceToNowStrict(new Date(post.createdAt))
  }, [post.createdAt])

  console.log(post)

  return (
    <div
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
      onClick={goToPost}
    >
      <div className="flex items-start gap-3">
        <Avatar userId={post.userId} />
        <div>
          <div className="flex items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {post.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{post.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{post.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post.comments.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p>{post.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
