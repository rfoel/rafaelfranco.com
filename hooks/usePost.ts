import useSWR from 'swr'

import { Post } from '../types'

const usePost = (slug: string) => useSWR<Post>(`/api/blog/${slug}`)

export default usePost
