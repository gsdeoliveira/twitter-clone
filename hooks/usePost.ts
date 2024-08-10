import useSWR from 'swr'

import { fetcher } from '@/libs/fetcher'
import { PostWithRelations } from '@/types'

export const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : null
  const { data, error, isLoading, mutate } = useSWR<PostWithRelations>(
    url,
    fetcher,
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
