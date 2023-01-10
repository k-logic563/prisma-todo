import { useCallback } from 'react'
import useSWR from 'swr'
import { TodoWithUser } from '@/types'
import { fetcher } from './fetcher'

export const useTodos = () => {
  const { data, error, mutate } = useSWR<TodoWithUser[]>('/api/todos', fetcher)

  const refetch = useCallback(() => mutate(), [mutate])

  return {
    todos: data,
    isLoading: !error && !data,
    error,
    refetch,
  }
}
