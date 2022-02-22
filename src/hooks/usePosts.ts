import useSWR, { SWRResponse } from 'swr'

import { SummaryIssuesData } from '../types'

const usePosts = (): SWRResponse<SummaryIssuesData> =>
  useSWR<SummaryIssuesData>('/api/blog')

export default usePosts
