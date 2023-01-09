import { useCallback } from 'react'
import useSWR from 'swr'
import { TodoWithUser } from '@/types'
import { fetcher } from './fetcher'

export const useBooks = () => {
  const { data, error, mutate } = useSWR<TodoWithUser[]>('/api/todos', fetcher)

  const refetch = useCallback(() => mutate(), [mutate])

  return {
    books: data,
    isLoading: !error && !data,
    error,
    refetch,
  }
}
