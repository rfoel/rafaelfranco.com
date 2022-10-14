import { Octokit } from '@octokit/core'
import type { Discussion, Query, Repository } from '@octokit/graphql-schema'

export const getDiscussions = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  })

  const query = `
    query {
      repository(name: "rfoel.dev", owner: "rfoel") {
        discussions(first: 10) {
          nodes {
            createdAt
            body
            bodyText
            title
          }
        }
      }
    }
  `
  const data = await octokit.graphql<{ repository: Repository }>(query)

  return data.repository.discussions.nodes as Discussion[]
}

export const searchDiscussion = async (slug: string) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  })

  const query = `
    query ($slug: String!) {
      search(first: 1, query: $slug, type: DISCUSSION) {
        nodes {
          ... on Discussion {
            createdAt
            body
            bodyText
            bodyHTML
            title
            labels(first:5) {
              nodes {
                color
                name
              }
            }
          }
        }
      }
    }
  `
  const data = await octokit.graphql<Query>(query, {
    slug: `repo:rfoel/rfoel.dev "${slug}"`,
  })

  return data.search.nodes?.[0] as Discussion
}
