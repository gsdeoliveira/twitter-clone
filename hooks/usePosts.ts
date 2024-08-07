import useSWR from 'swr'

import { fetcher } from '@/libs/fetcher'
import { PostWithRelations } from '@/types'

export const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
  const { data, error, isLoading, mutate } = useSWR<PostWithRelations[]>(
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
