import useSWR, { SWRResponse } from 'swr'

import { Post } from '../types'

const usePosts = (): SWRResponse<Post[]> => useSWR<Post[]>('/api/blog')

export default usePosts
