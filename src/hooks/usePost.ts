import useSWR, { SWRResponse } from 'swr'

import { Post } from '../types'

const usePost = (slug: string): SWRResponse<Post> =>
  useSWR<Post>(`/api/blog/${slug}`)

export default usePost
