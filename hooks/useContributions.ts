import useSWR from 'swr'

const useContributions = (from: string, to: string) =>
  useSWR<string[]>(`/api/contributions?from=${from}&to=${to}`)

export default useContributions
