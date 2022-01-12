import { gql, request } from 'graphql-request'

import type { Issues, Post } from '../types'

export const searchIssues = async (): Promise<Post[]> => {
  const query = gql`
    query {
      search(first: 10, query: "repo:rfoel/rfoel.dev label:blog", type: ISSUE) {
        nodes {
          ... on Issue {
            bodyText
            createdAt
            title
          }
        }
      }
    }
  `

  const data = await request<Issues>(
    'https://api.github.com/graphql',
    query,
    {},
    { Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}` },
  )

  return data.search.nodes as unknown as Post[]
}

export const searchIssue = async (slug: string): Promise<Post> => {
  const query = `repo:rfoel/rfoel.dev label:blog "${slug}"`

  const data = await request<Issues>(
    'https://api.github.com/graphql',
    gql`
      query ($query: String!) {
        search(first: 1, query: $query, type: ISSUE) {
          nodes {
            ... on Issue {
              title
              body
              createdAt
              bodyText
              labels(first: 5) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `,
    { query },
    { Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}` },
  )

  const post = data.search.nodes[0] as unknown as Post
  post.labels = data.search.nodes[0].labels.nodes.filter(
    ({ name }) => name !== 'blog',
  )

  return post
}
