import useSWR from 'swr'

const usePosts = () => useSWR('/api/blog')

export default usePosts
