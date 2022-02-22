import useSWR, { SWRResponse } from 'swr'

import { User } from '../types'

const useUser = (): SWRResponse<User> => useSWR<User>('/api/blog/user')

export default useUser
