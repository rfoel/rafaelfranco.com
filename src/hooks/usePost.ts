import useSWR, { SWRResponse } from 'swr'

import { IssuesData } from '../types'

const usePost = (slug: string): SWRResponse<IssuesData> =>
  useSWR<IssuesData>(`/api/blog/${slug}`)

export default usePost
