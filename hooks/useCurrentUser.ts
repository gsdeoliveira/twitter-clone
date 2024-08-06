import useSWR from 'swr'

import { fetcher } from '@/libs/fetcher'
import { User } from '@prisma/client'

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User>('/api/current', fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
