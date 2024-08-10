import useSWR from 'swr'

import { fetcher } from '@/libs/fetcher'
import { User } from '@prisma/client'

export const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<
    User & { followersCount: string }
  >(userId ? `/api/users/${userId}` : null, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
