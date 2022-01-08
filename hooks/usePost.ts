import useSWR from 'swr'

const usePost = (slug: string) => useSWR(`/api/blog/${slug}`)

export default usePost
