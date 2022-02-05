import useSWR from 'swr'

import { Post } from '../types'

const usePosts = () => useSWR<Post[]>('/api/blog')

export default usePosts
