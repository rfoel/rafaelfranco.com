import useSWR, { SWRResponse } from 'swr'

import { User } from '../types'

const usePost = (): SWRResponse<User> => useSWR<User>('/api/blog/user')

export default usePost
