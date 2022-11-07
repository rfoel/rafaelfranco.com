import type { Label } from '@octokit/graphql-schema'

export type SummaryPost = {
  createdAt: string
  readingTime: number
  slug: string
  thumbnail?: string
  title: string
}

export type Post = {
  createdAt: string
  html: string
  readingTime: number
  slug: string
  thumbnail?: string
  title: string
  labels: Label[]
  url: string
}
