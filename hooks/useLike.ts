import { useCallback, useMemo } from 'react'
import { useCurrentUser } from './useCurrentUser'
import { useLoginModal } from './useLoginModal'
import { usePost } from './usePost'
import { usePosts } from './usePosts'
import toast from 'react-hot-toast'
import axios from 'axios'

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedPost, mutate: mutatedFetchedPost } = usePost(postId)
  const { mutate: mutateFetchedPosts } = usePosts(userId)
  const loginModal = useLoginModal()

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || []
    return list.includes(currentUser?.id as string)
  }, [currentUser?.id, fetchedPost?.likedIds])

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { postId } })
      } else {
        request = () => axios.post('/api/like', { postId })
      }

      await request()
      mutatedFetchedPost()
      mutateFetchedPosts()

      toast.success('Success')
    } catch (error) {
      toast.error('Failed to like post')
    }
  }, [
    currentUser,
    hasLiked,
    loginModal,
    mutateFetchedPosts,
    mutatedFetchedPost,
    postId,
  ])

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike
